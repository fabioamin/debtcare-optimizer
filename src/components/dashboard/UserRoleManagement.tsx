
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ROLE_PERMISSIONS, useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";
import { Shield, UserCog } from "lucide-react";
import PermissionGuard from "@/components/auth/PermissionGuard";

const UserRoleManagement: React.FC = () => {
  const { user, updateUserRole } = useAuth();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  
  // Mock users (in a real app, these would come from an API)
  const mockUsers = [
    {
      id: '1',
      name: 'Admin',
      email: 'admin@example.com',
      role: 'system_admin' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    },
    {
      id: '2',
      name: 'João Agente',
      email: 'joao@example.com',
      role: 'collection_agent' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao'
    },
    {
      id: '3',
      name: 'Maria Gestora',
      email: 'maria@example.com',
      role: 'collection_manager' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
    },
    {
      id: '4',
      name: 'Carlos Empresa',
      email: 'carlos@example.com',
      role: 'company_admin' as UserRole,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos'
    }
  ];

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      setLoadingUserId(userId);
      await updateUserRole(userId, newRole);
    } finally {
      setLoadingUserId(null);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'system_admin':
        return 'bg-red-500';
      case 'company_admin':
        return 'bg-blue-500';
      case 'collection_manager':
        return 'bg-yellow-500';
      case 'collection_agent':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleDisplay = (role: UserRole) => {
    const roleInfo = ROLE_PERMISSIONS.find(r => r.role === role);
    return roleInfo?.displayName || role;
  };

  // Check if the current user can edit roles (system admin or certain company admins)
  const canEditRoles = user?.role === 'system_admin';

  return (
    <PermissionGuard permission="users.view">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Gerenciamento de Usuários e Perfis
          </CardTitle>
          <CardDescription>
            Gerencie os perfis de acesso dos usuários do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil Atual</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((mockUser) => (
                  <TableRow key={mockUser.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                          <AvatarFallback>{mockUser.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{mockUser.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{mockUser.email}</TableCell>
                    <TableCell>
                      <Badge className={`${getRoleBadgeColor(mockUser.role)}`}>
                        {getRoleDisplay(mockUser.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <PermissionGuard permission="users.edit">
                        <div className="flex items-center gap-2">
                          <Select
                            disabled={!canEditRoles || loadingUserId === mockUser.id}
                            defaultValue={mockUser.role}
                            onValueChange={(value) => handleRoleChange(mockUser.id, value as UserRole)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Selecionar perfil" />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLE_PERMISSIONS.map((role) => (
                                <SelectItem key={role.role} value={role.role}>
                                  <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    <span>{role.displayName}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {loadingUserId === mockUser.id && (
                            <Button variant="ghost" size="sm" disabled>
                              Atualizando...
                            </Button>
                          )}
                        </div>
                      </PermissionGuard>
                      
                      {!canEditRoles && user?.role !== 'system_admin' && (
                        <span className="text-sm text-muted-foreground">
                          Apenas administradores podem alterar perfis
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PermissionGuard>
  );
};

export default UserRoleManagement;
