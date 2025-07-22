import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Users, Monitor, Shield, FileCheck, Plus, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const OrgAdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Team Members',
      value: '42',
      description: '4 new this week',
      icon: Users,
      trend: '+9.5%',
      color: 'text-primary'
    },
    {
      title: 'Active Devices',
      value: '187',
      description: '12 pending setup',
      icon: Monitor,
      trend: '+15%',
      color: 'text-success'
    },
    {
      title: 'GRC Teams',
      value: '8',
      description: '3 compliance-ready',
      icon: Shield,
      trend: '+33%',
      color: 'text-info'
    },
    {
      title: 'Compliance Rate',
      value: '94%',
      description: 'This quarter',
      icon: FileCheck,
      trend: '+6%',
      color: 'text-warning'
    },
  ];

  const complianceTasks = [
    { id: 1, title: 'SOC 2 Type II Documentation', assignee: 'Security Team', status: 'in_progress', progress: 75, dueDate: '2024-02-15' },
    { id: 2, title: 'GDPR Data Mapping Review', assignee: 'Privacy Team', status: 'completed', progress: 100, dueDate: '2024-01-30' },
    { id: 3, title: 'ISO 27001 Risk Assessment', assignee: 'Risk Team', status: 'pending', progress: 25, dueDate: '2024-02-28' },
    { id: 4, title: 'PCI DSS Network Scan', assignee: 'IT Team', status: 'overdue', progress: 10, dueDate: '2024-01-20' },
  ];

  const recentDevices = [
    { name: 'HR-WS-001', type: 'Workstation', status: 'Compliant', lastScan: '2h ago', user: 'John Doe' },
    { name: 'FIN-SRV-003', type: 'Server', status: 'Attention', lastScan: '1d ago', user: 'System' },
    { name: 'MKT-LAP-015', type: 'Laptop', status: 'Compliant', lastScan: '4h ago', user: 'Sarah Wilson' },
    { name: 'DEV-WS-028', type: 'Workstation', status: 'Non-Compliant', lastScan: '6h ago', user: 'Mike Johnson' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-info" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'text-success';
      case 'Attention': return 'text-warning';
      case 'Non-Compliant': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Organization Dashboard</h1>
          <p className="text-muted-foreground">Manage your teams, devices, and compliance programs</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/90 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Team
          </Button>
        </div>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Compliance Tasks */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Active Compliance Tasks</CardTitle>
            <CardDescription>Track ongoing compliance initiatives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {complianceTasks.map((task) => (
                <div key={task.id} className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">Assigned to {task.assignee}</p>
                    </div>
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Device Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Device Activity</CardTitle>
            <CardDescription>Latest device compliance scans and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentDevices.map((device, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50 gap-3 sm:gap-0">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{device.name}</p>
                    <p className="text-xs text-muted-foreground">{device.type} • {device.user}</p>
                    <p className="text-xs text-muted-foreground">Last scan: {device.lastScan}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={device.status === 'Compliant' ? 'default' : 'secondary'}
                      className={`text-xs ${getStatusColor(device.status)}`}
                    >
                      {device.status}
                    </Badge>
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