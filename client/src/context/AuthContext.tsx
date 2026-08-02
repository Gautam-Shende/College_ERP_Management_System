import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, setToken as saveToken, removeToken } from "../utils/auth";
import api from "../api/axios";

// User state shape matched to backend user model
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "principal" | "hod" | "teacher" | "admission_staff";
  department_id?: number | null;
  designation?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  hasRole: (...roles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the application and exposes current user state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(getToken());
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch current user details on initial application mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getToken();
      if (storedToken) {
        try {
          const response = await api.get("/users/me");
          if (response.data?.success) {
            setUser(response.data.data);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Failed to restore auth session:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Save auth credentials upon successful login
  const login = (newToken: string, newUser: AuthUser) => {
    saveToken(newToken);
    setTokenState(newToken);
    setUser(newUser);
  };

  // Clear auth credentials upon logout
  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  // Helper method to verify role permissions
  const hasRole = (...allowedRoles: string[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext throughout the component tree
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
