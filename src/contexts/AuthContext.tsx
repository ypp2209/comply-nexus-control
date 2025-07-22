import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export type UserRole = 'super_admin' | 'org_admin' | 'regular_user';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const savedToken = Cookies.get('auth_token');
    const savedUser = Cookies.get('user_data');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        Cookies.remove('auth_token');
        Cookies.remove('user_data');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      if (email === 'superadmin@compliance.com') {
        mockUser = {
          id: '1',
          email,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'super_admin'
        };
      } else if (email === 'orgadmin@techcorp.com') {
        mockUser = {
          id: '2',
          email,
          firstName: 'Organization',
          lastName: 'Admin',
          role: 'org_admin',
          organizationId: 'org_1',
          organizationName: 'TechCorp Inc.'
        };
      } else {
        mockUser = {
          id: '3',
          email,
          firstName: 'Regular',
          lastName: 'User',
          role: 'regular_user',
          organizationId: 'org_1',
          organizationName: 'TechCorp Inc.'
        };
      }

      const mockToken = 'mock_jwt_token_' + Date.now();
      
      // Save to cookies
      Cookies.set('auth_token', mockToken, { expires: 7 });
      Cookies.set('user_data', JSON.stringify(mockUser), { expires: 7 });
      
      setToken(mockToken);
      setUser(mockUser);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};