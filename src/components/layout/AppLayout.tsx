import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Button } from '@/components/ui/button';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="flex items-center justify-between h-full px-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                
                {/* Search */}
                <div className="relative w-48 sm:w-64 hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10 bg-secondary/50 border-secondary text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* Theme Toggle */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                >
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative h-8 w-8 sm:h-9 sm:w-9">
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-xs flex items-center justify-center text-primary-foreground">
                    3
                  </span>
                </Button>
                
                {/* Mobile Search Button */}
                <Button variant="ghost" size="sm" className="sm:hidden h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};