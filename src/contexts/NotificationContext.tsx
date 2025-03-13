
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { Bell } from "lucide-react";

// Tipos de notificações
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

// Interface para o objeto de notificação
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  timestamp: Date;
  link?: string;
}

// Interface para o contexto
interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications deve ser usado dentro de um NotificationProvider');
  }
  return context;
};

// Mock de dados de exemplo
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Novo pagamento recebido',
    message: 'Um pagamento de R$ 1.500,00 foi recebido para a conta #12345',
    type: 'success',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutos atrás
  },
  {
    id: '2',
    title: 'Lembrete de conformidade',
    message: 'Verificação mensal de conformidade deve ser concluída em 3 dias',
    type: 'warning',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 horas atrás
  },
  {
    id: '3',
    title: 'Novo cliente adicionado',
    message: 'O cliente "Empresa ABC" foi adicionado com sucesso ao sistema',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 dia atrás
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const savedNotifications = localStorage.getItem('notifications');
    return savedNotifications 
      ? JSON.parse(savedNotifications).map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }))
      : initialNotifications;
  });

  const unreadCount = notifications.filter(notification => !notification.read).length;

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Mostrar toast para notificação em tempo real
    toast(notification.title, {
      description: notification.message,
      icon: <Bell className="h-4 w-4" />
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
