
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, RolePermissions, UserFormData } from "@/types/auth";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
  getUsers: () => User[];
  addUser: (userData: UserFormData) => Promise<User>;
  updateUser: (userId: string, userData: Partial<UserFormData>) => Promise<User>;
  deleteUser: (userId: string) => Promise<void>;
}

export const ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: 'system_admin',
    displayName: 'Gestor do Sistema',
    description: 'Acesso completo ao sistema com todas as permissões',
    permissions: [
      'users.view', 'users.create', 'users.edit', 'users.delete',
      'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
      'customers.view', 'customers.create', 'customers.edit', 'customers.delete',
      'payments.view', 'payments.process', 'payments.refund',
      'reports.view', 'reports.export',
      'settings.view', 'settings.edit',
      'workflows.view', 'workflows.create', 'workflows.edit', 'workflows.delete'
    ]
  },
  {
    role: 'collection_agent',
    displayName: 'Agente de Cobrança',
    description: 'Responsável por contatar clientes e processar pagamentos',
    permissions: [
      'customers.view',
      'payments.view', 'payments.process',
      'reports.view'
    ]
  },
  {
    role: 'collection_manager',
    displayName: 'Gestor do Time de Cobrança',
    description: 'Gerencia o time de cobrança e monitora o desempenho',
    permissions: [
      'users.view',
      'customers.view', 'customers.edit',
      'payments.view', 'payments.process', 'payments.refund',
      'reports.view', 'reports.export',
      'workflows.view', 'workflows.edit'
    ]
  },
  {
    role: 'company_admin',
    displayName: 'Gestor da Empresa',
    description: 'Responsável por gerenciar a empresa e seus funcionários',
    permissions: [
      'users.view', 'users.create', 'users.edit',
      'customers.view', 'customers.create', 'customers.edit',
      'payments.view',
      'reports.view', 'reports.export',
      'settings.view', 'settings.edit'
    ]
  }
];

const INITIAL_MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'system_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    active: true
  },
  {
    id: '2',
    name: 'João Agente',
    email: 'joao@example.com',
    role: 'collection_agent',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao',
    active: true
  },
  {
    id: '3',
    name: 'Maria Gestora',
    email: 'maria@example.com',
    role: 'collection_manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    active: true
  },
  {
    id: '4',
    name: 'Carlos Empresa',
    email: 'carlos@example.com',
    role: 'company_admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    active: true
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_MOCK_USERS);
  
  // Initialize user state when component mounts
  useEffect(() => {
    // Set the first user as the current user initially
    setUser(users[0]);
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const foundUser = users.find(u => u.email === credentials.email && u.active !== false);
      
      if (foundUser) {
        setUser(foundUser);
        toast.success(`Bem-vindo, ${foundUser.name}!`);
      } else {
        toast.error("Credenciais inválidas");
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Erro ao fazer login");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Desconectado com sucesso");
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions = ROLE_PERMISSIONS.find(rp => rp.role === user.role);
    return rolePermissions?.permissions.includes(permission) || false;
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    );
    
    setUsers(updatedUsers);
    
    if (user && user.id === userId) {
      setUser({ ...user, role: newRole });
    }
    
    toast.success("Perfil de acesso atualizado com sucesso");
  };

  const getUsers = (): User[] => {
    return users;
  };

  const addUser = async (userData: UserFormData): Promise<User> => {
    const newUser: User = {
      id: `${users.length + 1}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name.toLowerCase().replace(/\s/g, '')}`,
      active: true
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    toast.success(`Usuário ${newUser.name} adicionado com sucesso`);
    return newUser;
  };

  const updateUser = async (userId: string, userData: Partial<UserFormData>): Promise<User> => {
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      toast.error("Usuário não encontrado");
      throw new Error("User not found");
    }
    
    const updatedUser = {
      ...users[userIndex],
      ...userData
    };
    
    const updatedUsers = [...users];
    updatedUsers[userIndex] = updatedUser;
    
    setUsers(updatedUsers);
    
    if (user && user.id === userId) {
      setUser(updatedUser);
    }
    
    toast.success(`Usuário ${updatedUser.name} atualizado com sucesso`);
    return updatedUser;
  };

  const deleteUser = async (userId: string): Promise<void> => {
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, active: false } : u
    );
    
    setUsers(updatedUsers);
    
    toast.success("Usuário removido com sucesso");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      hasPermission,
      hasRole,
      login,
      logout,
      updateUserRole,
      getUsers,
      addUser,
      updateUser,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
