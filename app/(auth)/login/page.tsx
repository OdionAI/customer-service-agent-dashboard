"use client";

import AuthLayout from "@/components/AuthLayout";
import { LoginForm } from "@/components/LoginForm";
import React from "react";

function Login() {
  return (
    <AuthLayout title="Your Copilot for work">
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
