
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Strategy from "./pages/Strategy";
import Communication from "./pages/Communication";
import Payments from "./pages/Payments";
import Insights from "./pages/Insights";
import Workflows from "./pages/Workflows";
import WhiteLabel from "./pages/WhiteLabel";
import Portal from "./pages/Portal";
import SelfService from "./pages/SelfService";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import Api from "./pages/Api";
import Compliance from "./pages/Compliance";
import International from "./pages/International";
import Customers from "./pages/Customers";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import DashboardLayout from "./components/layouts/DashboardLayout";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <PaymentProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                
                {/* Dashboard routes with DashboardLayout */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <DashboardLayout><Dashboard /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/portfolio" element={
                  <PrivateRoute>
                    <DashboardLayout><Portfolio /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/strategy" element={
                  <PrivateRoute>
                    <DashboardLayout><Strategy /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/communication" element={
                  <PrivateRoute>
                    <DashboardLayout><Communication /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/payments" element={
                  <PrivateRoute>
                    <DashboardLayout><Payments /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/insights" element={
                  <PrivateRoute>
                    <DashboardLayout><Insights /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/workflows" element={
                  <PrivateRoute>
                    <DashboardLayout><Workflows /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/apis" element={
                  <PrivateRoute>
                    <DashboardLayout><Api /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/compliance" element={
                  <PrivateRoute>
                    <DashboardLayout><Compliance /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/international" element={
                  <PrivateRoute>
                    <DashboardLayout><International /></DashboardLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/customers" element={
                  <PrivateRoute>
                    <DashboardLayout><Customers /></DashboardLayout>
                  </PrivateRoute>
                } />
                
                {/* Nested routes for white-label */}
                <Route path="/dashboard/white-label" element={
                  <PrivateRoute>
                    <DashboardLayout><WhiteLabel /></DashboardLayout>
                  </PrivateRoute>
                }>
                  <Route index element={<Portal />} />
                  <Route path="portal" element={<Portal />} />
                  <Route path="self-service" element={<SelfService />} />
                </Route>
                
                <Route path="/dashboard/settings" element={
                  <PrivateRoute>
                    <DashboardLayout><Settings /></DashboardLayout>
                  </PrivateRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </BrowserRouter>
          </NotificationProvider>
        </PaymentProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
