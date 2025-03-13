
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { PaymentProvider } from "./contexts/PaymentContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Strategy from "./pages/Strategy";
import Insights from "./pages/Insights";
import Communication from "./pages/Communication";
import Payments from "./pages/Payments";
import SelfService from "./pages/SelfService";
import Portal from "./pages/Portal";
import NotFound from "./pages/NotFound";

import './i18n';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <PaymentProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/portfolio" element={<Portfolio />} />
              <Route path="/dashboard/strategy" element={<Strategy />} />
              <Route path="/dashboard/insights" element={<Insights />} />
              <Route path="/dashboard/communication" element={<Communication />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/self-service" element={<SelfService />} />
              <Route path="/dashboard/portal" element={<Portal />} />
              <Route path="/dashboard/compliance" element={<Dashboard />} />
              <Route path="/dashboard/international" element={<Dashboard />} />
              <Route path="/dashboard/customers" element={<Dashboard />} />
              <Route path="/dashboard/settings" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PaymentProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
