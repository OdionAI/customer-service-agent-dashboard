import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define interfaces for Company and User.
interface Company {
  id: string;
  name: string;
  company_code: string;
  logo_url?: string;
  industry?: string;
  number_of_employees?: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userType: "company" | "individual";
  company: Company;
}

// Define the context type.
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  clearUser: () => void;
}

// Create the context.
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component.
export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state by reading from localStorage only if window exists.
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  // Update localStorage whenever user state changes.
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  }, [user]);

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for consuming the context.
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
