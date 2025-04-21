"use client";

import {
  Box,
  Button,
  defineStyle,
  Fieldset,
  Input,
  Field,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddUser } from "@/hooks/useCompanyUsers"; // Ensure this hook is implemented
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useUserContext } from "@/context/UserContext";
import { AxiosError } from "axios";

interface FormData {
  email: string;
  role: string;
}

const AddUserModal = () => {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const addUserMutation = useAddUser();
  const router = useRouter();
  const { user } = useUserContext();
  const companyId = user?.company?.id as string;

  // Floating label styling, same as in your LoginForm.
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
    try {
      await addUserMutation.mutateAsync({
        email: values.email,
        role: values.role,
        company_id: companyId,
      });
      toaster.create({
        title: "User Added",
        description: "User has been added successfully.",
        duration: 5000,
      });
      reset();
      // Optionally refresh or close the modal here.
      router.refresh();
    } catch (error: unknown) {
      let description = "Failed to add user.";

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

  const isLoading = addUserMutation.isPending;
  const loadingText = isLoading ? "Adding user..." : "Add User";

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Fieldset.Root>
        <Fieldset.Content>
          {/* User Email Input */}
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
                  required: "User email is required",
                })}
                border="1px solid #007AFF"
                _placeholder={{ fontSize: "14px" }}
              />
              <Field.Label css={floatingStyles}>User Email</Field.Label>
            </Box>
            {errors.email && (
              <Text color="red.500" fontSize="sm">
                {errors.email.message?.toString()}
              </Text>
            )}
          </Field.Root>

          {/* Role Input */}

          <Field.Root>
            <Box pos="relative" w="full">
              <select
                style={{
                  padding: "20px 10px",
                  borderRadius: "20px",
                  border: "1px solid #007AFF",
                  color: textColor,
                  background: bg,
                  width: "100%",
                }}
                {...register("role", {
                  required: "Role is required",
                })}
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="engineer">Engineer</option>
              </select>
              <Field.Label css={floatingStyles}>Role</Field.Label>
            </Box>
            {errors.role && (
              <Text color="red.500" fontSize="sm">
                {errors.role.message?.toString()}
              </Text>
            )}
          </Field.Root>
        </Fieldset.Content>

        <Button
          w="100%"
          mt="30px"
          borderRadius="15px"
          fontSize="18px"
          fontWeight="semibold"
          type="submit"
          alignSelf="flex-start"
          loading={isLoading}
          loadingText={loadingText}
          spinner={<Spinner size="sm" />}
        >
          Invite
        </Button>
      </Fieldset.Root>
    </Box>
  );
};

export default AddUserModal;
