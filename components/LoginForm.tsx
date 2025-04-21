"use client";

import {
  Box,
  Button,
  defineStyle,
  Fieldset,
  Input,
  Field,
  Text,
  Container,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  usePreLoginCheck,
  useVerifyOtp,
  useLogin,
  useCompanyLogin,
  useCompleteUserRegistration,
} from "@/hooks/useAuthMutations";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useColorModeValue } from "./ui/color-mode";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAgentContext } from "@/context/AgentContext";
import { AxiosError } from "axios";

interface FormData {
  company_code: string;
  email: string;
  otp?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  role?: string;
}

export const LoginForm = () => {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");

  // State variables to control phases
  const [showOTP, setShowOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [isCompanyLogin, setIsCompanyLogin] = useState(true);

  // Mutations and router
  const preLoginMutation = usePreLoginCheck();
  const verifyOtpMutation = useVerifyOtp();
  const loginMutation = useLogin();
  const companyLoginMutation = useCompanyLogin();
  const completeUserRegistrationMutation = useCompleteUserRegistration();
  const router = useRouter();
  const { setUser } = useUserContext();
  const { setAgents } = useAgentContext();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Floating label styling.
  const floatingStyles = defineStyle({
    pos: "absolute",
    bg,
    px: "0.5",
    height: "15px",
    top: "-2",
    insetStart: "2",
    borderRadius: "20px",
    fontSize: "11px",
    color: textColor,
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    _peerPlaceholderShown: {
      color: textColor,
      top: "6",
      fontSize: "14px",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: textColor,
      top: "-2",
      fontSize: "11px",
      insetStart: "2",
    },
  });

  // Pre-login: Check invitation and OTP status.
  const onPreLoginSubmit = async (values: FormData) => {
    try {
      const response = await preLoginMutation.mutateAsync({
        company_code: values.company_code,
        email: values.email,
      });
      setCurrentEmail(values.email);
      // Assume response includes: otp_verified and is_registered.
      if (response.otp_verified) {
        setOtpVerified(true);
        if (response.is_registered) {
          // User is registered: only password is needed.
          setIsRegistered(true);
          setShowUserDetails(false);
        } else {
          // User not registered: show full registration fields.
          setIsRegistered(false);
          setShowUserDetails(true);
        }
        toaster.create({
          description:
            "OTP verified. Please complete your registration details.",
          duration: 5000,
        });
      } else {
        // OTP not verified: prompt user to enter OTP.
        setOtpVerified(false);
        setShowOTP(true);
        toaster.create({
          description: response.message,
          duration: 5000,
        });
      }
    } catch (error: unknown) {
      let description = "Something went wrong.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }

      toaster.create({
        description,
        duration: 5000,
      });
    }
  };

  // Verify OTP function.
  const onVerifyOtpSubmit = async (values: FormData) => {
    try {
      await verifyOtpMutation.mutateAsync({
        company_code: values.company_code,
        email: currentEmail,
        otp: values.otp as string,
      });
      setOtpVerified(true);
      // If not registered, show full registration details.
      if (!isRegistered) {
        setShowUserDetails(true);
      }
      toaster.create({
        title: "OTP Verified",
        description:
          "OTP verification successful. Please complete your registration details.",
        duration: 5000,
      });
    } catch (error: unknown) {
      let description = "Failed to add URL to knowledge base.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }
      toaster.create({
        title: "Error",
        description,
        duration: 5000,
      });
    }
  };

  // Complete registration for new users.
  const onCompleteUserRegistration = async (values: FormData) => {
    if (values.password !== values.confirmPassword) {
      toaster.create({
        title: "Error",
        description: "Passwords do not match.",
        duration: 5000,
      });
      return;
    }
    try {
      const userResponse = await completeUserRegistrationMutation.mutateAsync({
        company_code: values.company_code,
        email: values.email,
        first_name: values.firstName as string,
        last_name: values.lastName as string,
        password: values.password as string,
        role: values.role as string,
      });
      setUser({ ...userResponse, userType: "individual" });
      toaster.create({
        title: "Registration Complete",
        description: "User registration complete.",
        duration: 5000,
      });
      router.push("/");
    } catch (error: unknown) {
      let description = "Failed to add URL to knowledge base.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }
      toaster.create({
        title: "Error",
        description,
        duration: 5000,
      });
    }
  };

  // Company login flow.
  const onCompanyLoginSubmit = async (values: FormData) => {
    try {
      const companyResponse = await companyLoginMutation.mutateAsync({
        email: values.email,
        password: values.password as string,
      });

      setUser({
        id: companyResponse.company_id,
        email: companyResponse.email,
        firstName: companyResponse.first_name,
        lastName: companyResponse.last_name,
        role: companyResponse.role,
        userType: "company",
        company: {
          id: companyResponse.company_id,
          name: companyResponse.company_name, // You can adjust as needed.
          company_code: companyResponse.company_code, // Not provided in response; set a default or update your endpoint.
          logo_url: companyResponse.logo_url,
          industry: companyResponse.industry,
          number_of_employees: companyResponse.number_of_employees,
        },
      });
      setAgents(
        companyResponse.agents ? Object.values(companyResponse.agents) : []
      );

      toaster.create({
        description: "Login Successful",
        duration: 5000,
      });
      router.push("/");
    } catch (error: unknown) {
      let description = "Login failed.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }
      toaster.create({
        description,
        duration: 5000,
      });
    }
  };

  // Standard login flow.
  const onLoginSubmit = async (values: FormData) => {
    try {
      const userResponse = await loginMutation.mutateAsync({
        company_code: values.company_code,
        email: currentEmail,
        password: values.password as string,
      });

      setUser({ ...userResponse, userType: "individual" });
      toaster.create({
        title: "Login Successful",
        description: "Login Successful",
        duration: 5000,
      });
      router.push("/");
    } catch (error: unknown) {
      let description = "Login failed.";

      if (error instanceof AxiosError && error.response?.data?.detail) {
        description = String(error.response.data.detail);
      }
      toaster.create({
        description,
        duration: 5000,
      });
    }
  };

  // Main submit handler: Route based on phase and registration status.
  const onSubmit: SubmitHandler<FormData> = async (values) => {
    if (isCompanyLogin) {
      await onCompanyLoginSubmit(values);
      return;
    }
    // If OTP not yet verified, handle OTP generation/verification.
    if (!otpVerified) {
      if (!values.otp) {
        await onPreLoginSubmit(values);
        return;
      } else {
        await onVerifyOtpSubmit(values);
        return;
      }
    }
    // If OTP verified:
    if (otpVerified) {
      if (isRegistered) {
        // For already registered users, perform login.
        await onLoginSubmit(values);
        return;
      } else if (showUserDetails) {
        // For new users, complete registration.
        await onCompleteUserRegistration(values);
        return;
      }
    }
  };

  // Toggle between individual (user registration) and company login.
  const toggleLoginMode = () => {
    setIsCompanyLogin(!isCompanyLogin);
    reset();
    setShowOTP(false);
    setOtpVerified(false);
    setShowUserDetails(false);
    setCurrentEmail("");
    setIsRegistered(false);
  };

  // Determine loading state and button text.
  let isLoading = false;
  let loadingText = "";
  if (isCompanyLogin) {
    isLoading = companyLoginMutation.isPending;
    loadingText = companyLoginMutation.isPending ? "Logging in..." : "Login";
  } else if (!otpVerified) {
    isLoading = preLoginMutation.isPending || verifyOtpMutation.isPending;
    loadingText = preLoginMutation.isPending
      ? "Checking Invitation..."
      : verifyOtpMutation.isPending
      ? "Verifying OTP..."
      : !showOTP
      ? "Submit"
      : "Verify OTP";
  } else {
    // For registration phase.
    isLoading = completeUserRegistrationMutation.isPending;
    loadingText = completeUserRegistrationMutation.isPending
      ? "Submitting..."
      : "Complete Registration";
  }

  return (
    <Container onSubmit={handleSubmit(onSubmit)} as="form">
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          {/* Company Code Field (for individual user registration) */}
          {!isCompanyLogin && (
            <Field.Root>
              <Box pos="relative" w="full">
                <Input
                  outline="none"
                  paddingY="30px"
                  paddingX="10px"
                  borderRadius="20px"
                  color={textColor}
                  className="peer"
                  placeholder=""
                  {...register("company_code", {
                    required: "Company code is required",
                  })}
                  border="1px solid #007AFF"
                  _placeholder={{ fontSize: "14px" }}
                />
                <Field.Label css={floatingStyles}>Company Code</Field.Label>
              </Box>
              {errors.company_code && (
                <Text color="red.500" fontSize="sm">
                  {errors.company_code.message?.toString()}
                </Text>
              )}
            </Field.Root>
          )}

          {/* Email Field (always shown) */}
          <Field.Root>
            <Box pos="relative" w="full">
              <Input
                outline="none"
                paddingY="30px"
                paddingX="10px"
                borderRadius="20px"
                color={textColor}
                className="peer"
                placeholder=""
                {...register("email", {
                  required: "Work mail is required",
                })}
                border="1px solid #007AFF"
                _placeholder={{ fontSize: "14px" }}
                readOnly={!isCompanyLogin && showOTP}
              />
              <Field.Label css={floatingStyles}>Work Email</Field.Label>
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message?.toString()}
                </Text>
              )}
            </Box>
          </Field.Root>

          {/* For company login: Always show password input */}
          {(isCompanyLogin || isRegistered) && (
            <Field.Root>
              <Box pos="relative" w="full">
                <Input
                  type="password"
                  outline="none"
                  paddingY="30px"
                  paddingX="10px"
                  borderRadius="20px"
                  color={textColor}
                  className="peer"
                  placeholder=""
                  {...register("password", {
                    required: "Password is required",
                  })}
                  border="1px solid #007AFF"
                  _placeholder={{ fontSize: "14px" }}
                />
                <Field.Label css={floatingStyles}>Password</Field.Label>
              </Box>
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password.message?.toString()}
                </Text>
              )}
            </Field.Root>
          )}

          {/* For individual registration: OTP field */}
          {!isCompanyLogin && showOTP && !otpVerified && (
            <Field.Root>
              <Box pos="relative" w="full">
                <Input
                  outline="none"
                  paddingY="30px"
                  paddingX="10px"
                  borderRadius="20px"
                  color={textColor}
                  className="peer"
                  placeholder=""
                  {...register("otp", {
                    required: "Type in OTP",
                  })}
                  border="1px solid #007AFF"
                  _placeholder={{ fontSize: "14px" }}
                />
                <Field.Label css={floatingStyles}>OTP</Field.Label>
              </Box>
              {errors.otp && (
                <Text color="red.500" fontSize="sm">
                  {errors.otp.message?.toString()}
                </Text>
              )}
            </Field.Root>
          )}

          {/* Additional registration fields for individual users (only when OTP is verified and user is not registered) */}
          {otpVerified &&
            !isCompanyLogin &&
            !isRegistered &&
            showUserDetails && (
              <>
                {/* First Name */}
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input
                      outline="none"
                      paddingY="30px"
                      paddingX="10px"
                      borderRadius="20px"
                      color={textColor}
                      className="peer"
                      placeholder=""
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      border="1px solid #007AFF"
                      _placeholder={{ fontSize: "14px" }}
                    />
                    <Field.Label css={floatingStyles}>First Name</Field.Label>
                  </Box>
                  {errors.firstName && (
                    <Text color="red.500" fontSize="sm">
                      {errors.firstName.message?.toString()}
                    </Text>
                  )}
                </Field.Root>

                {/* Last Name */}
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input
                      outline="none"
                      paddingY="30px"
                      paddingX="10px"
                      borderRadius="20px"
                      color={textColor}
                      className="peer"
                      placeholder=""
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      border="1px solid #007AFF"
                      _placeholder={{ fontSize: "14px" }}
                    />
                    <Field.Label css={floatingStyles}>Last Name</Field.Label>
                  </Box>
                  {errors.lastName && (
                    <Text color="red.500" fontSize="sm">
                      {errors.lastName.message?.toString()}
                    </Text>
                  )}
                </Field.Root>

                {/* Role */}
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input
                      outline="none"
                      paddingY="30px"
                      paddingX="10px"
                      borderRadius="20px"
                      color={textColor}
                      className="peer"
                      placeholder=""
                      {...register("role", {
                        required: "Role is required",
                      })}
                      border="1px solid #007AFF"
                      _placeholder={{ fontSize: "14px" }}
                    />
                    <Field.Label css={floatingStyles}>Role</Field.Label>
                  </Box>
                  {errors.role && (
                    <Text color="red.500" fontSize="sm">
                      {errors.role.message?.toString()}
                    </Text>
                  )}
                </Field.Root>

                {/* Password */}
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input
                      type="password"
                      outline="none"
                      paddingY="30px"
                      paddingX="10px"
                      borderRadius="20px"
                      color={textColor}
                      className="peer"
                      placeholder=""
                      {...register("password", {
                        required: "Password is required",
                      })}
                      border="1px solid #007AFF"
                      _placeholder={{ fontSize: "14px" }}
                    />
                    <Field.Label css={floatingStyles}>Password</Field.Label>
                  </Box>
                  {errors.password && (
                    <Text color="red.500" fontSize="sm">
                      {errors.password.message?.toString()}
                    </Text>
                  )}
                </Field.Root>

                {/* Confirm Password */}
                <Field.Root>
                  <Box pos="relative" w="full">
                    <Input
                      type="password"
                      outline="none"
                      paddingY="30px"
                      paddingX="10px"
                      borderRadius="20px"
                      color={textColor}
                      className="peer"
                      placeholder=""
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === getValues("password") ||
                          "Passwords do not match",
                      })}
                      border="1px solid #007AFF"
                      _placeholder={{ fontSize: "14px" }}
                    />
                    <Field.Label css={floatingStyles}>
                      Confirm Password
                    </Field.Label>
                  </Box>
                  {errors.confirmPassword && (
                    <Text color="red.500" fontSize="sm">
                      {errors.confirmPassword.message?.toString()}
                    </Text>
                  )}
                </Field.Root>
              </>
            )}
        </Fieldset.Content>

        <Button
          w="100%"
          marginTop="30px"
          borderRadius="15px"
          fontSize="18px"
          fontWeight="semibold"
          type="submit"
          alignSelf="flex-start"
          loading={isLoading}
          loadingText={loadingText}
          spinner={<Spinner size="sm" />}
        >
          {isCompanyLogin
            ? "Login"
            : !otpVerified
            ? showOTP
              ? "Verify OTP"
              : "Login"
            : isRegistered
            ? "Login"
            : "Complete Registration"}
        </Button>
      </Fieldset.Root>
      <Flex justifyContent={"space-between"}>
        <Text
          mt={4}
          textAlign="left"
          cursor="pointer"
          color="blue.500"
          onClick={toggleLoginMode}
        >
          {isCompanyLogin ? "Login as Individual" : "Login as Company"}
        </Text>
        <Text
          mt={4}
          textAlign="left"
          cursor="pointer"
          color="blue.500"
          onClick={() => router.push("/signup")}
        >
          Create account
        </Text>
      </Flex>
    </Container>
  );
};
