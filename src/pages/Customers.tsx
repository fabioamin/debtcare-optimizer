
import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CustomersPanel from "@/components/dashboard/CustomersPanel";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { useAuth } from "@/contexts/AuthContext";

const Customers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onMenuClick={handleMenuClick} />
      <div className="flex">
        <DashboardSidebar open={sidebarOpen} />
        <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} p-6 transition-all duration-300`}>
          <PermissionGuard 
            permission="customers.view"
            fallback={
              <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-800 mb-2">Acesso Restrito</h2>
                <p className="text-yellow-700">
                  Você não tem permissão para acessar o módulo de clientes.
                  Entre em contato com um administrador para solicitar acesso.
                </p>
              </div>
            }
          >
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700">
                Usuário conectado: <strong>{user?.name}</strong> | 
                Perfil: <strong>{user?.role}</strong>
              </p>
            </div>
            <CustomersPanel />
          </PermissionGuard>
        </main>
      </div>
    </div>
  );
};

export default Customers;
