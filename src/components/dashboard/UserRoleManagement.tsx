import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ROLE_PERMISSIONS, useAuth } from "@/contexts/AuthContext";
import { User, UserRole, UserFormData } from "@/types/auth";
import { Shield, UserCog, Plus, Pencil, Trash2, UserX, AlertCircle } from "lucide-react";
import PermissionGuard from "@/components/auth/PermissionGuard";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const UserRoleManagement: React.FC = () => {
  const { user, updateUserRole, getUsers, addUser, updateUser, deleteUser } = useAuth();
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const users = getUsers().filter(u => u.active !== false);

  const userFormSchema = z.object({
    name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    role: z.enum(['system_admin', 'collection_agent', 'collection_manager', 'company_admin'], {
      invalid_type_error: "Selecione um perfil válido",
    }),
    password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }).optional(),
  });

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "collection_agent",
      password: "",
    },
  });

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      setLoadingUserId(userId);
      await updateUserRole(userId, newRole);
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleAddUser = () => {
    form.reset({
      name: "",
      email: "",
      role: "collection_agent",
      password: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const onSubmitAddUser = form.handleSubmit(async (data) => {
    try {
      await addUser(data as UserFormData);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  });

  const onSubmitEditUser = form.handleSubmit(async (data) => {
    if (!selectedUser) return;
    
    try {
      await updateUser(selectedUser.id, data as Partial<UserFormData>);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  });

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUser(selectedUser.id);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const canEditRoles = user?.role === 'system_admin';

  return (
    <PermissionGuard permission="users.view">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Gerenciamento de Usuários e Perfis
            </CardTitle>
            <CardDescription>
              Gerencie os perfis de acesso dos usuários do sistema
            </CardDescription>
          </div>
          <PermissionGuard permission="users.create">
            <Button onClick={handleAddUser} className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Usuário
            </Button>
          </PermissionGuard>
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
                {users.map((userItem) => (
                  <TableRow key={userItem.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={userItem.avatar} alt={userItem.name} />
                          <AvatarFallback>{userItem.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{userItem.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{userItem.email}</TableCell>
                    <TableCell>
                      <Badge className={`${getRoleBadgeColor(userItem.role)}`}>
                        {getRoleDisplay(userItem.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PermissionGuard permission="users.edit">
                          <Select
                            disabled={!canEditRoles || loadingUserId === userItem.id}
                            defaultValue={userItem.role}
                            onValueChange={(value) => handleRoleChange(userItem.id, value as UserRole)}
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
                          
                          {loadingUserId === userItem.id && (
                            <Button variant="ghost" size="sm" disabled>
                              Atualizando...
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditUser(userItem)}
                            className="ml-2"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </PermissionGuard>
                        
                        <PermissionGuard permission="users.delete">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(userItem)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </PermissionGuard>
                      </div>
                      
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

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo usuário. Todos os campos são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmitAddUser} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um perfil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_PERMISSIONS.map((role) => (
                          <SelectItem key={role.role} value={role.role}>
                            {role.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize os dados do usuário. Deixe a senha em branco para mantê-la.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={onSubmitEditUser} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nova Senha (opcional)</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Deixe em branco para manter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um perfil" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLE_PERMISSIONS.map((role) => (
                          <SelectItem key={role.role} value={role.role}>
                            {role.displayName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja remover o usuário {selectedUser?.name}? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-4 border rounded-md bg-destructive/10">
            <UserX className="h-10 w-10 text-destructive mr-4" />
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
              <Badge className={`mt-2 ${getRoleBadgeColor(selectedUser?.role as UserRole)}`}>
                {selectedUser ? getRoleDisplay(selectedUser.role) : ''}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              <Trash2 className="mr-2 h-4 w-4" />
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PermissionGuard>
  );
};

export default UserRoleManagement;
