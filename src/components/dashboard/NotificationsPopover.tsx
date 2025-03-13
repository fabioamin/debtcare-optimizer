
import React from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { formatDistanceToNow } from 'date-fns';
import { ptBR, enUS, es } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const getLocale = (lang: string) => {
  switch (lang) {
    case 'pt':
      return ptBR;
    case 'es':
      return es;
    default:
      return enUS;
  }
};

const NotificationItem: React.FC<{
  notification: Notification;
  onRead: () => void;
  onRemove: () => void;
}> = ({ notification, onRead, onRemove }) => {
  const { language } = useLanguage();
  
  const getBgColor = () => {
    if (notification.read) return 'bg-background hover:bg-muted/50';
    
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 hover:bg-green-100';
      case 'warning':
        return 'bg-yellow-50 hover:bg-yellow-100';
      case 'error':
        return 'bg-red-50 hover:bg-red-100';
      default:
        return 'bg-blue-50 hover:bg-blue-100';
    }
  };

  return (
    <div className={`${getBgColor()} p-3 rounded-md mb-2 transition-colors`}>
      <div className="flex justify-between">
        <h4 className="font-medium text-sm">{notification.title}</h4>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.timestamp), { 
            addSuffix: true,
            locale: getLocale(language)
          })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
      <div className="flex justify-end gap-1 mt-2">
        {!notification.read && (
          <Button variant="ghost" size="sm" onClick={onRead} className="h-7 px-2">
            <Check className="h-4 w-4 mr-1" />
            <span className="text-xs">Lido</span>
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onRemove} className="h-7 px-2">
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Remover</span>
        </Button>
      </div>
    </div>
  );
};

const NotificationsPopover = () => {
  const { t } = useTranslation();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearNotifications
  } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-3 border-b border-border flex items-center justify-between">
          <h3 className="font-medium">Notificações</h3>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Marcar todas como lidas
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              Limpar todas
            </Button>
          </div>
        </div>
        
        <ScrollArea className="max-h-80">
          <div className="p-3">
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                Nenhuma notificação
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                  onRemove={() => removeNotification(notification.id)}
                />
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
