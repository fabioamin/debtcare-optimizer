
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { AlertCircle } from "lucide-react";

interface RoleGuardProps {
  roles: UserRole | UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that conditionally renders its children based on whether
 * the current user has one of the specified roles.
 */
const RoleGuard: React.FC<RoleGuardProps> = ({ 
  roles, 
  children, 
  fallback 
}) => {
  const { hasRole, isAuthenticated } = useAuth();
  
  // If user has the required role
  if (isAuthenticated && hasRole(roles)) {
    return <>{children}</>;
  }
  
  // Render the fallback or a default unauthorized message
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-red-50 text-red-800">
      <AlertCircle className="mb-2 h-10 w-10" />
      <h3 className="text-lg font-semibold mb-1">Acesso Restrito</h3>
      <p className="text-center">Você não tem o perfil necessário para acessar este recurso.</p>
    </div>
  );
};

export default RoleGuard;
