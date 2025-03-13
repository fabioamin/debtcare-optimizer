
import { 
  Mail, 
  MessageSquare, 
  Phone, 
  Globe, 
  Facebook, 
  Instagram, 
  Linkedin,
  Twitter, 
  MessageCircle, 
  Send 
} from "lucide-react";
import ChannelCard from "./ChannelCard";
import { useIsMobile } from "@/hooks/use-mobile";

const ChannelsTab = () => {
  const isMobile = useIsMobile();
  
  const channels = [
    {
      icon: Mail,
      title: "Email",
      stats: [
        { label: "Open Rate", value: "32%" },
        { label: "Response Rate", value: "18%" },
        { label: "Templates", value: "12" },
      ],
    },
    {
      icon: MessageSquare,
      title: "SMS",
      stats: [
        { label: "Open Rate", value: "98%" },
        { label: "Response Rate", value: "45%" },
        { label: "Templates", value: "8" },
      ],
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      stats: [
        { label: "Read Rate", value: "95%" },
        { label: "Response Rate", value: "62%" },
        { label: "Templates", value: "10" },
      ],
    },
    {
      icon: Send,
      title: "Telegram",
      stats: [
        { label: "Read Rate", value: "87%" },
        { label: "Response Rate", value: "54%" },
        { label: "Templates", value: "7" },
      ],
    },
    {
      icon: Phone,
      title: "Phone",
      stats: [
        { label: "Connect Rate", value: "42%" },
        { label: "Resolution Rate", value: "38%" },
        { label: "Scripts", value: "6" },
      ],
    },
    {
      icon: Globe,
      title: "Portal",
      stats: [
        { label: "Visit Rate", value: "28%" },
        { label: "Action Rate", value: "22%" },
        { label: "Notifications", value: "10" },
      ],
    },
    {
      icon: Facebook,
      title: "Facebook",
      stats: [
        { label: "Reach", value: "35%" },
        { label: "Engagement", value: "18%" },
        { label: "Messages", value: "42" },
      ],
    },
    {
      icon: Instagram,
      title: "Instagram",
      stats: [
        { label: "Reach", value: "48%" },
        { label: "Engagement", value: "24%" },
        { label: "DMs", value: "36" },
      ],
    },
    {
      icon: Twitter,
      title: "Twitter",
      stats: [
        { label: "Impressions", value: "22%" },
        { label: "Engagement", value: "12%" },
        { label: "Messages", value: "28" },
      ],
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      stats: [
        { label: "Impressions", value: "19%" },
        { label: "Response Rate", value: "15%" },
        { label: "Messages", value: "22" },
      ],
    },
  ];

  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'sm:grid-cols-2' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 animate-fade-in`}>
      {channels.map((channel, index) => (
        <ChannelCard key={index} {...channel} />
      ))}
    </div>
  );
};

export default ChannelsTab;
