import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/api";

interface AgentCreate {
  // For creation, only the agent type is required.
  type: string;
}

// Model for updating an agent’s configuration.
// All fields are optional so you can update only the ones you need.
interface AgentSettings {
  name?: string;
  first_message?: string;
  languages?: string[];
  tone?: string;
  knowledge_base?: { [key: string]: any };
  tools?: Array<{ [key: string]: any }>;
}

// Full agent model returned by your endpoints.
interface Agent {
  id: string;
  type: string;
  name?: string;
  first_message?: string;
  languages?: string[];
  tone?: string;
  knowledge_base?: { [key: string]: any };
  tools?: Array<{ [key: string]: any }>;
}

interface UploadResponse {
  file_url: string;
}

// Hook to fetch all agents for a company.
export function useFetchAgents(company_id: string) {
  return useQuery<Agent[], Error>({
    queryKey: ["agents", company_id],
    queryFn: async () => {
      const response = await api.get<Agent[]>(
        `/companies/${company_id}/agents`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false,
  });
}

// Hook to create a new agent for a company.
export function useCreateAgent() {
  const queryClient = useQueryClient();
  return useMutation<Agent, Error, { company_id: string; data: AgentCreate }>({
    mutationFn: ({ company_id, data }) =>
      api
        .post<Agent>(`/companies/${company_id}/agents`, data)
        .then((res) => res.data),
    onSuccess: (_data, variables) => {
      // Invalidate the agent list for this company so the UI refreshes.
      queryClient.invalidateQueries({
        queryKey: ["agents", variables.company_id],
      });
    },
  });
}

// Hook to update an existing agent's settings.
export function useUpdateAgent() {
  const queryClient = useQueryClient();
  return useMutation<
    Agent,
    Error,
    { company_id: string; agent_id: string; data: AgentSettings }
  >({
    mutationFn: ({ company_id, agent_id, data }) =>
      api
        .put<Agent>(`/companies/${company_id}/agents/${agent_id}`, data)
        .then((res) => res.data),
    onSuccess: (_data, variables) => {
      // Invalidate the agent list for this company so that updated information is retrieved.
      queryClient.invalidateQueries({
        queryKey: ["agents", variables.company_id],
      });
    },
  });
}

// Hook to fetch a single agent for a company.
export function useFetchAgent(company_id: string, agent_id: string) {
  return useQuery<Agent, Error>({
    queryKey: ["agent", company_id, agent_id],
    queryFn: async () => {
      const response = await api.get<Agent>(
        `/companies/${company_id}/agents/${agent_id}`
      );
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

// Hook to upload a file.
export function useUploadFile() {
  return useMutation<string, Error, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post<UploadResponse>(
        "/companies/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.file_url;
    },
  });
}
