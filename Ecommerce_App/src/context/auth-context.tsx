import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  id: string | null;
  firstName: string | null;
  address: string | null;
  email: string | null;
  setAuthInfo: (
    id: string,
    name: string,
    email: string,
    address: string
  ) => void;
  clearAuthInfo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const setAuthInfo = (
    id: string,
    firstName: string,
    email: string,
    address: string
  ) => {
    setId(id);
    setFirstName(firstName);
    setAddress(address);
    setEmail(email);
  };

  const clearAuthInfo = () => {
    setId(null);
    setFirstName(null);
    setAddress(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ id, firstName, email, address, setAuthInfo, clearAuthInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
