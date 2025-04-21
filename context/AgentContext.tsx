import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define interfaces for Settings and Agent.
export interface Settings {
  name?: string;
  first_message?: string;
  languages?: string[];
  tone?: string;
  knowledge_base?: { [key: string]: any };
  tools?: Array<{ [key: string]: any }>;
}

export interface Agent {
  id: string;
  type: string;
  settings?: Settings;
}

// Define the context type to store both the list of agents and the selected agent.
interface AgentContextType {
  agents: Agent[];
  selectedAgent: Agent | null;
  setAgents: React.Dispatch<React.SetStateAction<Agent[]>>;
  setSelectedAgent: React.Dispatch<React.SetStateAction<Agent | null>>;
}

// Create the context.
const AgentContext = createContext<AgentContextType | undefined>(undefined);

// Provider component.
export const AgentProvider = ({ children }: { children: ReactNode }) => {
  // Initialize the list of agents from localStorage (empty array if not found).
  const [agents, setAgents] = useState<Agent[]>(() => {
    if (typeof window !== "undefined") {
      const storedAgents = localStorage.getItem("agents");
      return storedAgents ? JSON.parse(storedAgents) : [];
    }
    return [];
  });

  // Initialize the selected agent from localStorage (null if not found).
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(() => {
    if (typeof window !== "undefined") {
      const storedAgent = localStorage.getItem("selectedAgent");
      return storedAgent ? JSON.parse(storedAgent) : null;
    }
    return null;
  });

  // Update localStorage whenever the agents array changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("agents", JSON.stringify(agents));
    }
  }, [agents]);

  // Update localStorage whenever the selected agent changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (selectedAgent) {
        localStorage.setItem("selectedAgent", JSON.stringify(selectedAgent));
      } else {
        localStorage.removeItem("selectedAgent");
      }
    }
  }, [selectedAgent]);

  return (
    <AgentContext.Provider
      value={{ agents, selectedAgent, setAgents, setSelectedAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
};

// Custom hook for consuming the context.
export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (context === undefined) {
    throw new Error("useAgentContext must be used within an AgentProvider");
  }
  return context;
};
