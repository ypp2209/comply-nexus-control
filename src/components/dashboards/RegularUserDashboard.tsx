import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Monitor, ClipboardList, Upload, CheckCircle, AlertTriangle, Clock, Calendar } from 'lucide-react';

export const RegularUserDashboard: React.FC = () => {
  const userStats = [
    {
      title: 'My Devices',
      value: '3',
      description: '2 compliant, 1 needs attention',
      icon: Monitor,
      color: 'text-primary'
    },
    {
      title: 'Pending Tasks',
      value: '5',
      description: '2 due this week',
      icon: ClipboardList,
      color: 'text-warning'
    },
    {
      title: 'Completed Tasks',
      value: '28',
      description: 'This quarter',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Evidence Uploaded',
      value: '12',
      description: '8 approved, 4 pending',
      icon: Upload,
      color: 'text-info'
    },
  ];

  const myDevices = [
    { name: 'DESK-001', type: 'Workstation', status: 'Compliant', lastScan: '2h ago', nextScan: '2024-02-15', compliance: 98 },
    { name: 'LAP-005', type: 'Laptop', status: 'Needs Attention', lastScan: '1d ago', nextScan: '2024-02-12', compliance: 75 },
    { name: 'PHN-012', type: 'Mobile Device', status: 'Compliant', lastScan: '4h ago', nextScan: '2024-02-18', compliance: 94 },
  ];

  const complianceTasks = [
    { 
      id: 1, 
      title: 'Security Awareness Training', 
      description: 'Complete mandatory security training module',
      priority: 'High', 
      dueDate: '2024-02-10', 
      progress: 75,
      type: 'Training'
    },
    { 
      id: 2, 
      title: 'Software License Verification', 
      description: 'Verify installed software licenses on workstation',
      priority: 'Medium', 
      dueDate: '2024-02-15', 
      progress: 30,
      type: 'Compliance'
    },
    { 
      id: 3, 
      title: 'Data Backup Confirmation', 
      description: 'Confirm recent data backup completion',
      priority: 'Low', 
      dueDate: '2024-02-20', 
      progress: 0,
      type: 'Operational'
    },
    { 
      id: 4, 
      title: 'Access Review Attestation', 
      description: 'Review and attest to system access requirements',
      priority: 'High', 
      dueDate: '2024-02-08', 
      progress: 90,
      type: 'Security'
    },
  ];

  const recentActivity = [
    { action: 'Uploaded evidence for SOC 2 audit', time: '2h ago', status: 'success' },
    { action: 'Completed security training module', time: '1d ago', status: 'success' },
    { action: 'Device scan failed - LAP-005', time: '1d ago', status: 'warning' },
    { action: 'Submitted access review form', time: '2d ago', status: 'success' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'text-success';
      case 'Needs Attention': return 'text-warning';
      case 'Non-Compliant': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground">Track your devices, tasks, and compliance status</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/90 w-full sm:w-auto">
          <Upload className="h-4 w-4 mr-2" />
          Upload Evidence
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* My Devices */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>My Devices</CardTitle>
            <CardDescription>Monitor your assigned devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {myDevices.map((device, index) => (
                <div key={index} className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.type}</p>
                    </div>
                    <Badge 
                      variant={device.status === 'Compliant' ? 'default' : 'secondary'}
                      className={`text-xs ${getStatusColor(device.status)}`}
                    >
                      {device.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Compliance</span>
                      <span>{device.compliance}%</span>
                    </div>
                    <Progress value={device.compliance} className="h-2" />
                    <p className="text-xs text-muted-foreground">Next scan: {device.nextScan}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Compliance Tasks */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Pending compliance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {complianceTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{task.type}</span>
                      <span className="text-muted-foreground">Due: {task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest compliance actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50">
                  {activity.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                  ) : activity.status === 'warning' ? (
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  ) : (
                    <Clock className="h-4 w-4 text-info mt-0.5" />
                  )}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
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