import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Users, Shield, TrendingUp, Plus, AlertTriangle } from 'lucide-react';

export const SuperAdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Organizations',
      value: '24',
      description: '3 new this month',
      icon: Building2,
      trend: '+12%',
      color: 'text-primary'
    },
    {
      title: 'Active Administrators',
      value: '156',
      description: '8 pending approvals',
      icon: Users,
      trend: '+8%',
      color: 'text-success'
    },
    {
      title: 'System Health',
      value: '99.9%',
      description: 'Uptime this month',
      icon: Shield,
      trend: '+0.1%',
      color: 'text-info'
    },
    {
      title: 'Compliance Score',
      value: '92%',
      description: 'Platform average',
      icon: TrendingUp,
      trend: '+5%',
      color: 'text-warning'
    },
  ];

  const recentOrganizations = [
    { name: 'TechCorp Inc.', admin: 'John Smith', status: 'Active', devices: 145, compliance: 94 },
    { name: 'HealthSystem LLC', admin: 'Sarah Johnson', status: 'Active', devices: 89, compliance: 87 },
    { name: 'FinanceGroup', admin: 'Mike Brown', status: 'Pending', devices: 67, compliance: 91 },
    { name: 'RetailChain Co.', admin: 'Lisa Davis', status: 'Active', devices: 203, compliance: 89 },
  ];

  const systemAlerts = [
    { type: 'warning', message: 'Organization "TechCorp" approaching device limit', time: '2h ago' },
    { type: 'info', message: 'New compliance framework update available', time: '4h ago' },
    { type: 'success', message: 'Backup completed successfully', time: '6h ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage organizations and system-wide settings</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          New Organization
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="flex items-center mt-2">
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Organizations */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Organizations</CardTitle>
            <CardDescription>Latest organization registrations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrganizations.map((org, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="space-y-1">
                    <p className="font-medium">{org.name}</p>
                    <p className="text-sm text-muted-foreground">Admin: {org.admin}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={org.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                        {org.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{org.devices} devices</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{org.compliance}%</p>
                    <p className="text-xs text-muted-foreground">Compliance</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important system notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    alert.type === 'warning' ? 'text-warning' :
                    alert.type === 'success' ? 'text-success' : 'text-info'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};