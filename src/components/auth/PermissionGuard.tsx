
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";

interface PermissionGuardProps {
  permission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that conditionally renders its children based on whether
 * the current user has the specified permission.
 */
const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permission, 
  children, 
  fallback 
}) => {
  const { hasPermission, isAuthenticated } = useAuth();
  
  // If no permission is required, or the user has the permission
  if (!permission || (isAuthenticated && hasPermission(permission))) {
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
      <p className="text-center">Você não tem permissão para acessar este recurso.</p>
    </div>
  );
};

export default PermissionGuard;
