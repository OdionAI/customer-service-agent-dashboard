"use client";

import AuthLayout from "@/components/AuthLayout";
import { LoginForm } from "@/components/LoginForm";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Login() {
  const bg = useColorModeValue("#FFFFFF", "#333333");
  return (
    <AuthLayout title="Your Copilot for work">
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
