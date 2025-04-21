import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface AddUserData {
  email: string;
  role: string;
  company_id: string;
}

export const useFetchCompanyUsers = (companyId: string) => {
  return useQuery<User[], Error>({
    queryKey: ["companyUsers", companyId],
    queryFn: async () => {
      const response = await api.get<User[]>(`/companies/${companyId}/users`);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // data is fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
};

export function useAddUser() {
  const queryClient = useQueryClient();
  return useMutation<User, Error, AddUserData>({
    mutationFn: (data: AddUserData) =>
      api
        .post(`/companies/${data.company_id}/users`, {
          email: data.email,
          role: data.role,
        })
        .then((res) => res.data),
    onSuccess: (data, variables) => {
      // Pass an object with queryKey to invalidateQueries
      queryClient.invalidateQueries({
        queryKey: ["companyUsers", variables.company_id],
      });
    },
  });
}
