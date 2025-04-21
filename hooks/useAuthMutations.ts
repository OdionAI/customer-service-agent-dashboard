// hooks/useAuthMutations.ts
import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";

interface PreLoginData {
  company_code: string;
  email: string;
}

interface VerifyOtpData {
  company_code: string;
  email: string;
  otp: string;
}

interface LoginData {
  company_code: string;
  email: string;
  password: string;
}
interface CompanyLoginData {
  email: string;
  password: string;
}
interface GenerateOtpData {
  email: string;
}
interface CompanyVerifyOtpData {
  email: string;
  otp: string;
}
interface CompleteSignupData {
  email: string;
  otp: string;
}

export interface CompanyCreate {
  email: string;
  password: string;
  company_name: string;
  first_name: string;
  last_name: string;
  role: string;
  logo_url?: string;
  industry?: string;
  number_of_employees?: number;
}
export interface CompleteUserRegistrationData {
  company_code: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}
export interface AddUserData {
  email: string;
  role: string;
}

export function usePreLoginCheck() {
  return useMutation({
    mutationFn: (data: PreLoginData) =>
      api.post("/auth/user/prelogin-check", data).then((res) => res.data),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (data: VerifyOtpData) =>
      api.post("/auth/user/verify-otp", data).then((res) => res.data),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) =>
      api.post("/auth/user/login", data).then((res) => res.data),
  });
}
export function useCompanyLogin() {
  return useMutation({
    mutationFn: (data: CompanyLoginData) =>
      api.post("/auth/company/login", data).then((res) => res.data),
  });
}
export function useGenerateOtp() {
  return useMutation({
    mutationFn: (data: GenerateOtpData) =>
      api.post("/auth/generate_otp", data).then((res) => res.data),
  });
}
export function useCompanyVerifyOtp() {
  return useMutation({
    mutationFn: (data: CompanyVerifyOtpData) =>
      api.post("/auth/verify-otp", data).then((res) => res.data),
  });
}
export function useCompleteSignup() {
  return useMutation({
    mutationFn: (data: CompleteSignupData) =>
      api.post("/auth/user/register-details", data).then((res) => res.data),
  });
}
export function useCreateCompany() {
  return useMutation({
    mutationFn: (data: CompanyCreate) =>
      api.post("/companies", data).then((res) => res.data),
  });
}
export function useCompleteUserRegistration() {
  return useMutation({
    mutationFn: (data: CompleteUserRegistrationData) =>
      api.post("/auth/user/register-details", data).then((res) => res.data),
  });
}
export function useAddUser() {
  return useMutation({
    mutationFn: (data: AddUserData) =>
      api.post("/auth/user/register-details", data).then((res) => res.data),
  });
}
