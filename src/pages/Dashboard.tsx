import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { SuperAdminDashboard } from '@/components/dashboards/SuperAdminDashboard';
import { OrgAdminDashboard } from '@/components/dashboards/OrgAdminDashboard';
import { RegularUserDashboard } from '@/components/dashboards/RegularUserDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'super_admin':
      return <SuperAdminDashboard />;
    case 'org_admin':
      return <OrgAdminDashboard />;
    case 'regular_user':
      return <RegularUserDashboard />;
    default:
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the compliance management system.</p>
        </div>
      );
  }
};

export default Dashboard;