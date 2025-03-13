
import { Mail, MessageSquare, Phone, Globe } from "lucide-react";
import ChannelCard from "./ChannelCard";

const ChannelsTab = () => {
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {channels.map((channel, index) => (
        <ChannelCard key={index} {...channel} />
      ))}
    </div>
  );
};

export default ChannelsTab;
