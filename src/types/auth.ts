
export type UserRole = 
  | 'system_admin'       // Gestor do sistema (acesso total)
  | 'collection_agent'   // Agente de cobrança
  | 'collection_manager' // Gestor do time de cobrança
  | 'company_admin';     // Gestor da empresa

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RolePermissions {
  role: UserRole;
  displayName: string;
  description: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  active?: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  password?: string;
}
