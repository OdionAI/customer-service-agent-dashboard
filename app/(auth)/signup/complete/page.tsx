"use client";

import AuthLayout from "@/components/AuthLayout";
import { SignupForm } from "@/components/SignupForm";
import React from "react";

function Signup() {
  return (
    <AuthLayout title="Your Copilot for work">
      <SignupForm />
    </AuthLayout>
  );
}

export default Signup;
