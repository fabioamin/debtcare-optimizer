
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <PaymentProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Dashboard routes with DashboardLayout */}
                <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
                <Route path="/dashboard/portfolio" element={<DashboardLayout><Portfolio /></DashboardLayout>} />
                <Route path="/dashboard/strategy" element={<DashboardLayout><Strategy /></DashboardLayout>} />
                <Route path="/dashboard/communication" element={<DashboardLayout><Communication /></DashboardLayout>} />
                <Route path="/dashboard/payments" element={<DashboardLayout><Payments /></DashboardLayout>} />
                <Route path="/dashboard/insights" element={<DashboardLayout><Insights /></DashboardLayout>} />
                <Route path="/dashboard/workflows" element={<DashboardLayout><Workflows /></DashboardLayout>} />
                <Route path="/dashboard/apis" element={<DashboardLayout><Api /></DashboardLayout>} />
                <Route path="/dashboard/compliance" element={<DashboardLayout><Compliance /></DashboardLayout>} />
                <Route path="/dashboard/international" element={<DashboardLayout><International /></DashboardLayout>} />
                <Route path="/dashboard/customers" element={<DashboardLayout><Customers /></DashboardLayout>} />
                
                {/* Nested routes for white-label */}
                <Route path="/dashboard/white-label" element={<DashboardLayout><WhiteLabel /></DashboardLayout>}>
                  <Route index element={<Portal />} />
                  <Route path="portal" element={<Portal />} />
                  <Route path="self-service" element={<SelfService />} />
                </Route>
                
                <Route path="/dashboard/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
                
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
