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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useGenerateOtp,
  useCompanyVerifyOtp,
  useCreateCompany,
} from "@/hooks/useAuthMutations"; // Ensure these hooks are implemented
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useColorModeValue } from "./ui/color-mode";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useAgentContext } from "@/context/AgentContext";
import { AxiosError } from "axios";

interface FormData {
  email: string;
  otp?: string;
  companyName: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  industry?: string;
  password?: string;
  confirmPassword?: string;
  numberOfEmployees?: number;
  logo?: FileList;
}

export const SignupForm = () => {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const router = useRouter();

  // Phases: 1 = Generate OTP, 2 = Verify OTP, 3 = Complete Signup
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const generateOtpMutation = useGenerateOtp();
  const verifyOtpMutation = useCompanyVerifyOtp();
  const createCompanyMutation = useCreateCompany();
  const { setUser } = useUserContext();
  const { setAgents } = useAgentContext();

  const {
    register,
    handleSubmit,
    getValues,
    // reset,
    formState: { errors },
  } = useForm<FormData>();

  // Floating label styles (consistent with your login pattern)
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

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    // Phase 1: Generate OTP if not yet shown.
    if (!showOtpInput) {
      try {
        await generateOtpMutation.mutateAsync({ email: values.email });
        setShowOtpInput(true);
        toaster.create({
          title: "OTP Generated",
          description: "OTP generated successfully. Please check your email.",
          duration: 5000,
        });
      } catch (error: unknown) {
        let description = "Failed to generate OTP.";

        if (error instanceof AxiosError && error.response?.data?.detail) {
          description = String(error.response.data.detail);
        }
        toaster.create({
          title: "Error",
          description,
          duration: 5000,
        });
      }
      return;
    }

    // Phase 2: Verify OTP if not yet verified.
    if (showOtpInput && !otpVerified) {
      if (values.otp && values.otp.trim() !== "") {
        try {
          await verifyOtpMutation.mutateAsync({
            email: values.email,
            otp: values.otp,
          });
          setOtpVerified(true);
          toaster.create({
            title: "OTP Verified",
            description:
              "OTP verified successfully. Please complete your registration.",
            duration: 5000,
          });
        } catch (error: unknown) {
          let description = "OTP verification failed.";

          if (error instanceof AxiosError && error.response?.data?.detail) {
            description = String(error.response.data.detail);
          }
          toaster.create({
            title: "Error",
            description,
            duration: 5000,
          });
        }
      } else {
        toaster.create({
          title: "Error",
          description: "Please enter the OTP.",
          duration: 5000,
        });
      }
      return;
    }

    // Phase 3: Complete Signup
    if (otpVerified) {
      // Validate password matching (in addition to field-level validation)
      if (values.password !== values.confirmPassword) {
        toaster.create({
          title: "Error",
          description: "Passwords do not match.",
          duration: 5000,
        });
        return;
      }

      // Handle file upload for logo if provided (placeholder logic)
      let logo_url: string | undefined = undefined;
      if (values.logo && values.logo.length > 0) {
        // TODO: Replace with actual file upload logic
        logo_url = `uploaded/${values.logo[0].name}`;
      }

      const companyData = {
        email: values.email as string,
        password: values.password as string,
        company_name: values.companyName as string,
        first_name: values.firstName as string,
        last_name: values.lastName as string,
        role: values.role as string,
        industry: values.industry as string,
        number_of_employees: values.numberOfEmployees
          ? Number(values.numberOfEmployees)
          : undefined,
        logo_url,
      };

      try {
        const companyResponse = await createCompanyMutation.mutateAsync(
          companyData
        );

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
          title: "Signup Complete",
          description: "Company registered successfully.",
          duration: 5000,
        });
        router.push("/");
      } catch (error: unknown) {
        // console.log(err, "this is error");
        let description = "Failed to register company.";

        if (error instanceof AxiosError && error.response?.data?.detail) {
          description = String(error.response.data.detail);
        }
        toaster.create({
          title: "Error",
          description,
          duration: 5000,
        });
      }
    }
  };

  // Determine loading states based on phase.
  let isLoading = false;
  let loadingText = "";
  if (!showOtpInput) {
    isLoading = generateOtpMutation.isPending;
    loadingText = generateOtpMutation.isPending
      ? "Generating OTP..."
      : "Register";
  } else if (showOtpInput && !otpVerified) {
    isLoading = verifyOtpMutation.isPending;
    loadingText = verifyOtpMutation.isPending
      ? "Verifying OTP..."
      : "Verify OTP";
  } else if (otpVerified) {
    isLoading = createCompanyMutation.isPending;
    loadingText = createCompanyMutation.isPending
      ? "Submitting..."
      : "Complete Signup";
  }

  return (
    <Container as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          {/* Email Field (always visible, readOnly after OTP generated) */}
          <Field.Root>
            <Box pos="relative" w="full">
              <Input
                readOnly={showOtpInput}
                outline="none"
                paddingY="30px"
                paddingX="10px"
                borderRadius="20px"
                color={textColor}
                className="peer"
                placeholder=""
                border="1px solid #007AFF"
                {...register("email", { required: "Email is required" })}
                _placeholder={{ fontSize: "14px" }}
              />
              <Field.Label css={floatingStyles}>Email</Field.Label>
            </Box>
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message?.toString()}
              </Text>
            )}
          </Field.Root>

          {/* OTP Field (only shown if OTP has been generated and not yet verified) */}
          {showOtpInput && !otpVerified && (
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
                  {...register("otp", { required: "OTP is required" })}
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

          {/* Additional Company Details (shown only after OTP is verified) */}
          {otpVerified && (
            <>
              {/* Company name */}
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
                    {...register("companyName", {
                      required: "Company Name is required",
                    })}
                    border="1px solid #007AFF"
                    _placeholder={{ fontSize: "14px" }}
                  />
                  <Field.Label css={floatingStyles}>Company Name</Field.Label>
                </Box>
                {errors.companyName && (
                  <Text color="red.500" fontSize="sm">
                    {errors.companyName.message?.toString()}
                  </Text>
                )}
              </Field.Root>
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
                    {...register("role", { required: "Role is required" })}
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

              {/* Industry (Select) */}
              <Field.Root>
                <Box pos="relative" w="full">
                  <select
                    style={{
                      padding: "30px 10px",
                      borderRadius: "20px",
                      border: "1px solid #007AFF",
                      color: textColor,
                      background: bg,
                      width: "100%",
                    }}
                    {...register("industry")}
                  >
                    <option value="">Select Industry</option>
                    <option value="financial">Financial</option>
                    <option value="tech">Tech</option>
                    <option value="healthcare">Healthcare</option>
                  </select>
                  <Field.Label css={floatingStyles}>Industry</Field.Label>
                </Box>
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

              {/* Company Logo (Optional) */}
              <Field.Root>
                <Box pos="relative" w="full">
                  <Input
                    type="file"
                    outline="none"
                    paddingY="30px"
                    paddingX="10px"
                    borderRadius="20px"
                    color={textColor}
                    className="peer"
                    placeholder=""
                    {...register("logo")}
                    border="1px solid #007AFF"
                    _placeholder={{ fontSize: "14px" }}
                  />
                  <Field.Label css={floatingStyles}>
                    Company Logo (Optional)
                  </Field.Label>
                </Box>
              </Field.Root>

              {/* Number of Employees (Optional) */}
              <Field.Root>
                <Box pos="relative" w="full">
                  <Input
                    type="number"
                    outline="none"
                    paddingY="30px"
                    paddingX="10px"
                    borderRadius="20px"
                    color={textColor}
                    className="peer"
                    placeholder=""
                    {...register("numberOfEmployees")}
                    border="1px solid #007AFF"
                    _placeholder={{ fontSize: "14px" }}
                  />
                  <Field.Label css={floatingStyles}>
                    Number of Employees (Optional)
                  </Field.Label>
                </Box>
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
          {!showOtpInput
            ? "Generate OTP"
            : showOtpInput && !otpVerified
            ? "Verify OTP"
            : "Complete Signup"}
        </Button>

        <Text
          mt={4}
          textAlign="left"
          cursor="pointer"
          color="blue.500"
          onClick={() => router.push("/login")}
        >
          Already have an account? Sign in
        </Text>
      </Fieldset.Root>
    </Container>
  );
};
