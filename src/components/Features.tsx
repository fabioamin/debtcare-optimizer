
import { useEffect, useRef, useState } from "react";
import { IntersectionObserver } from "react-intersection-observer";
import { Brain, MessageSquareText, CreditCard, ShieldCheck, ChartLine, Globe, Settings, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Features = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features: Feature[] = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description: "Behavioral analytics and machine learning models that predict customer engagement patterns for personalized debt recovery strategies."
    },
    {
      icon: <MessageSquareText className="h-6 w-6" />,
      title: "Omnichannel Communication",
      description: "Seamlessly engage customers through their preferred channels with perfectly timed, empathetic messaging that drives resolution."
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Flexible Payment Options",
      description: "Offer customizable payment plans with multiple payment methods, making it easier for customers to resolve their debts on their terms."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Compliance & Security",
      description: "Built-in compliance controls and bank-level security ensure all debt recovery activities adhere to regulations while protecting data."
    },
    {
      icon: <ChartLine className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and dashboards provide actionable insights into recovery performance, trends, and opportunities."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Self-Service Portal",
      description: "Customer-friendly web and mobile interfaces that empower debtors to understand, manage and resolve their debts without agent intervention."
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "White-Label Customization",
      description: "Fully brandable solution that seamlessly integrates with your existing platforms and reflects your company's identity."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated Workflows",
      description: "Intelligent automation of routine tasks and decision-making processes, freeing your team to focus on high-value activities."
    }
  ];

  return (
    <section id="features" className="section-padding bg-secondary/50" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className={cn(
            "section-title transition-all duration-700 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Powerful Features for Modern Debt Recovery
          </h2>
          <p className={cn(
            "section-subtitle transition-all duration-700 delay-100 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Our platform combines the best practices from leading debt recovery solutions, creating a comprehensive system that prioritizes both efficiency and human connection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-card rounded-xl shadow-sm p-6 border border-border/50 hover:border-primary/20 hover:shadow-md transition-all duration-300 relative overflow-hidden group",
                "transition-all duration-700 opacity-0 translate-y-10",
                inView && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${150 + index * 75}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
