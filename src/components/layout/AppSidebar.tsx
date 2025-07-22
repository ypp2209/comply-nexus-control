import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Building2,
  Users,
  Shield,
  Monitor,
  FileCheck,
  Settings,
  BarChart3,
  UserCheck,
  ClipboardList,
  Upload,
  Home,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navigationItems = {
  super_admin: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Organizations', url: '/organizations', icon: Building2 },
    { title: 'Administrators', url: '/administrators', icon: UserCheck },
    { title: 'System Settings', url: '/system-settings', icon: Settings },
    { title: 'Analytics', url: '/analytics', icon: BarChart3 },
  ],
  org_admin: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'Users', url: '/users', icon: Users },
    { title: 'Teams', url: '/teams', icon: Shield },
    { title: 'Devices', url: '/devices', icon: Monitor },
    { title: 'Compliance', url: '/compliance', icon: FileCheck },
    { title: 'Reports', url: '/reports', icon: BarChart3 },
    { title: 'Settings', url: '/settings', icon: Settings },
  ],
  regular_user: [
    { title: 'Dashboard', url: '/dashboard', icon: Home },
    { title: 'My Devices', url: '/my-devices', icon: Monitor },
    { title: 'Compliance Tasks', url: '/compliance-tasks', icon: ClipboardList },
    { title: 'Evidence Upload', url: '/evidence-upload', icon: Upload },
    { title: 'Profile', url: '/profile', icon: Settings },
  ],
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  if (!user) return null;

  const currentPath = location.pathname;
  const items = navigationItems[user.role] || [];
  
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" 
      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50";

  const getUserInitials = () => {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="border-b border-border/50">
        <div className="flex items-center gap-3 p-4">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-sm">Compliance Nexus</h2>
              <p className="text-xs text-muted-foreground">Control Center</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 py-2">
            {!collapsed ? 'Navigation' : ''}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
                {user.organizationName && (
                  <p className="text-xs text-muted-foreground truncate">
                    {user.organizationName}
                  </p>
                )}
              </div>
            )}
          </div>
          
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}