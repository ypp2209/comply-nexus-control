import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export type UserRole = 'super_admin' | 'org_admin' | 'regular_user';

export interface Organization {
  id: string;
  name: string;
  whitelistedDomain: string;
}

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

  // Mock organizations with whitelisted domains
  const mockOrganizations: Organization[] = [
    { id: 'org_1', name: 'TechCorp Inc.', whitelistedDomain: 'techcorp.com' },
    { id: 'org_2', name: 'HealthSystem LLC', whitelistedDomain: 'healthsystem.com' },
    { id: 'org_3', name: 'FinanceGroup', whitelistedDomain: 'financegroup.com' }
  ];

  const validateEmailDomain = (email: string, organizationId?: string): boolean => {
    if (!organizationId) return true; // Super admin has no org restrictions
    
    const emailDomain = email.split('@')[1];
    const organization = mockOrganizations.find(org => org.id === organizationId);
    
    return organization ? emailDomain === organization.whitelistedDomain : false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Extract email domain for validation
      const emailDomain = email.split('@')[1];
      
      // Mock user data based on email with domain validation
      let mockUser: User;
      if (email === 'superadmin@compliance.com') {
        mockUser = {
          id: '1',
          email,
          firstName: 'Super',
          lastName: 'Admin',
          role: 'super_admin'
        };
      } else if (emailDomain === 'techcorp.com') {
        // Find organization by domain
        const organization = mockOrganizations.find(org => org.whitelistedDomain === emailDomain);
        if (!organization) {
          throw new Error('Domain not whitelisted for any organization');
        }

        if (email === 'orgadmin@techcorp.com') {
          mockUser = {
            id: '2',
            email,
            firstName: 'Organization',
            lastName: 'Admin',
            role: 'org_admin',
            organizationId: organization.id,
            organizationName: organization.name
          };
        } else {
          mockUser = {
            id: '3',
            email,
            firstName: 'Regular',
            lastName: 'User',
            role: 'regular_user',
            organizationId: organization.id,
            organizationName: organization.name
          };
        }
      } else if (emailDomain === 'healthsystem.com') {
        const organization = mockOrganizations.find(org => org.whitelistedDomain === emailDomain);
        mockUser = {
          id: '4',
          email,
          firstName: 'Health',
          lastName: 'User',
          role: 'regular_user',
          organizationId: organization!.id,
          organizationName: organization!.name
        };
      } else if (emailDomain === 'financegroup.com') {
        const organization = mockOrganizations.find(org => org.whitelistedDomain === emailDomain);
        mockUser = {
          id: '5',
          email,
          firstName: 'Finance',
          lastName: 'User',
          role: 'regular_user',
          organizationId: organization!.id,
          organizationName: organization!.name
        };
      } else {
        throw new Error('Email domain not whitelisted for any organization');
      }

      // Validate domain for organization users
      if (mockUser.organizationId && !validateEmailDomain(email, mockUser.organizationId)) {
        throw new Error('Email domain does not match organization whitelist');
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