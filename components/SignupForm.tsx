"use client";

import {
  Box,
  Button,
  defineStyle,
  Fieldset,
  Input,
  Field,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SignupForm = () => {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  const textColor = useColorModeValue("#333333", "#FFFFFF");
  const router = useRouter();

  // State to track whether the OTP input should be visible
  const [showOTP, setShowOTP] = useState(false);
  // Handle click on "Verify Email" button
  const handleVerifyEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could call an API to send the OTP email.
    // After a successful call, show the OTP input:
    if (showOTP) {
      router.push("/companyinfo");
    } else {
      setShowOTP(true);
    }
  };

  // Floating label styles
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

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Fieldset.Content>
        {/* Email Input Field */}
        <Field.Root>
          <Box pos="relative" w="full">
            <Input
              outline="none"
              py="30px"
              px="10px"
              borderRadius="20px"
              color={textColor}
              className="peer"
              placeholder=""
              name="company_email"
              border="1px solid #007AFF"
              _placeholder={{ fontSize: "14px" }}
            />
            <Field.Label css={floatingStyles}>Company Email</Field.Label>
          </Box>
        </Field.Root>

        {showOTP && (
          <Field.Root mt={4}>
            <Box pos="relative" w="full">
              <Input
                outline="none"
                py="30px"
                px="10px"
                borderRadius="20px"
                color={textColor}
                className="peer"
                placeholder=""
                name="otp"
                border="1px solid #007AFF"
                _placeholder={{ fontSize: "14px" }}
              />
              <Field.Label css={floatingStyles}>
                Type in OTP sent to your email
              </Field.Label>
            </Box>
          </Field.Root>
        )}
      </Fieldset.Content>

      {/* Verify Email Button */}
      <Button
        w="100%"
        mt="30px"
        borderRadius="15px"
        fontSize="18px"
        fontWeight="semibold"
        onClick={handleVerifyEmail}
      >
        Verify Email
      </Button>
    </Fieldset.Root>
  );
};
