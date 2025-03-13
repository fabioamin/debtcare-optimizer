
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

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <PaymentProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/portfolio" element={<Portfolio />} />
                <Route path="/dashboard/strategy" element={<Strategy />} />
                <Route path="/dashboard/communication" element={<Communication />} />
                <Route path="/dashboard/payments" element={<Payments />} />
                <Route path="/dashboard/insights" element={<Insights />} />
                <Route path="/dashboard/workflows" element={<Workflows />} />
                <Route path="/dashboard/apis" element={<Api />} />
                <Route path="/dashboard/compliance" element={<Compliance />} />
                <Route path="/dashboard/international" element={<International />} />
                <Route path="/dashboard/customers" element={<Customers />} />
                <Route path="/dashboard/white-label" element={<WhiteLabel />}>
                  <Route index element={<Portal />} />
                  <Route path="portal" element={<Portal />} />
                  <Route path="self-service" element={<SelfService />} />
                </Route>
                <Route path="/dashboard/settings" element={<Settings />} />
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
