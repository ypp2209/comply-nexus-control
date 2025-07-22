import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RequireAuth } from "./components/auth/RequireAuth";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/organizations" element={
              <RequireAuth allowedRoles={['super_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Organizations</h1>
                    <p className="text-muted-foreground">Manage all organizations in the system.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/administrators" element={
              <RequireAuth allowedRoles={['super_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Administrators</h1>
                    <p className="text-muted-foreground">Manage organization administrators.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/system-settings" element={
              <RequireAuth allowedRoles={['super_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">System Settings</h1>
                    <p className="text-muted-foreground">Configure system-wide settings and preferences.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/analytics" element={
              <RequireAuth allowedRoles={['super_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Analytics</h1>
                    <p className="text-muted-foreground">View system-wide analytics and reports.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/users" element={
              <RequireAuth allowedRoles={['org_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Users</h1>
                    <p className="text-muted-foreground">Manage organization users and permissions.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/teams" element={
              <RequireAuth allowedRoles={['org_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">GRC Teams</h1>
                    <p className="text-muted-foreground">Manage governance, risk, and compliance teams.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/devices" element={
              <RequireAuth allowedRoles={['org_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Devices</h1>
                    <p className="text-muted-foreground">Manage and monitor all organizational devices.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/reports" element={
              <RequireAuth allowedRoles={['org_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Reports</h1>
                    <p className="text-muted-foreground">Generate and view compliance reports.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/my-devices" element={
              <RequireAuth allowedRoles={['regular_user']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">My Devices</h1>
                    <p className="text-muted-foreground">View and manage your assigned devices.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/compliance-tasks" element={
              <RequireAuth allowedRoles={['regular_user']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Compliance Tasks</h1>
                    <p className="text-muted-foreground">View and complete your assigned compliance tasks.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/evidence-upload" element={
              <RequireAuth allowedRoles={['regular_user']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Evidence Upload</h1>
                    <p className="text-muted-foreground">Upload compliance evidence and documentation.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/compliance" element={
              <RequireAuth allowedRoles={['org_admin']}>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Compliance</h1>
                    <p className="text-muted-foreground">Monitor organizational compliance status.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/settings" element={
              <RequireAuth>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and preferences.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="/profile" element={
              <RequireAuth>
                <AppLayout>
                  <div className="p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
                    <p className="text-muted-foreground">Manage your profile information.</p>
                  </div>
                </AppLayout>
              </RequireAuth>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
