
import { Menu, Search, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NotificationsPopover from "./NotificationsPopover";
import LanguageSelector from "../LanguageSelector";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-16 border-b border-border bg-card px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[280px] pl-8"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <LanguageSelector />
        <NotificationsPopover />
        <Button variant="ghost" className="flex items-center gap-2">
          <UserCircle2 className="h-5 w-5" />
          <span className="hidden md:inline">Account</span>
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
