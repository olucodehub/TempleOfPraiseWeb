import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Member, AuthState } from '../types';
import { getMemberByEmail } from '../services/azureStorage';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'temple_of_praise_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      const storedEmail = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedEmail) {
        try {
          const memberData = await getMemberByEmail(storedEmail);
          if (memberData && memberData.isApproved) {
            setMember(memberData);
            setIsAuthenticated(true);
          } else {
            // Member no longer exists or is not approved, clear session
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        } catch (error) {
          console.error('Error checking auth:', error);
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    try {
      const memberData = await getMemberByEmail(email.toLowerCase());

      if (!memberData) {
        setIsLoading(false);
        return {
          success: false,
          message: 'No account found with this email address. Please register first.',
        };
      }

      if (!memberData.isApproved) {
        setIsLoading(false);
        return {
          success: false,
          message: 'Your account is pending approval. Please wait for an administrator to approve your registration.',
        };
      }

      // Successful login
      localStorage.setItem(AUTH_STORAGE_KEY, email.toLowerCase());
      setMember(memberData);
      setIsAuthenticated(true);
      setIsLoading(false);

      return {
        success: true,
        message: 'Login successful!',
      };
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return {
        success: false,
        message: 'An error occurred during login. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setMember(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        member,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
