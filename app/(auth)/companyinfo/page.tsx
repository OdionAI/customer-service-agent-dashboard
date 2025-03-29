"use client";

import AuthLayout from "@/components/AuthLayout";
import { Companyinfo } from "@/components/CompanyInfo";
import React from "react";

function Login() {
  return (
    <AuthLayout title="Your Copilot for work">
      <Companyinfo />
    </AuthLayout>
  );
}

export default Login;
