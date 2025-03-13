
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building, Users, BriefcaseBusiness, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Solution {
  icon: JSX.Element;
  title: string;
  description: string;
  features: string[];
  variant: "primary" | "secondary" | "accent" | "muted";
}

const Solutions = () => {
  const [inView, setInView] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  const solutions: Solution[] = [
    {
      icon: <Building className="h-6 w-6" />,
      title: "For Financial Institutions",
      description: "Empower banks and lenders with a complete debt recovery platform that maintains customer relationships and maximizes return.",
      features: [
        "Seamless integration with banking systems",
        "Regulatory compliance built-in for financial sector",
        "AI-driven early intervention strategies",
        "White-label customer portal with bank branding",
        "End-to-end recovery workflow automation"
      ],
      variant: "primary"
    },
    {
      icon: <BriefcaseBusiness className="h-6 w-6" />,
      title: "For Collection Agencies",
      description: "Transform your agency with digital-first recovery approaches that increase effectiveness while reducing operational costs.",
      features: [
        "Multi-client management and reporting",
        "Performance-based agent incentive tools",
        "Legal workflow integration and tracking",
        "Predictive contact scoring and prioritization",
        "Commission and fee structure management"
      ],
      variant: "secondary"
    },
    {
      icon: <Banknote className="h-6 w-6" />,
      title: "For Debt Buyers",
      description: "Maximize portfolio returns with data-driven insights that identify the most promising accounts and optimal recovery strategies.",
      features: [
        "Portfolio valuation and scoring",
        "Data enrichment and validation tools",
        "Strategic segmentation capabilities",
        "Performance tracking by vintage",
        "ROI analysis and optimization"
      ],
      variant: "accent"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "For Service Providers",
      description: "Maintain customer goodwill while effectively managing overdue accounts with our customer-centric recovery solutions.",
      features: [
        "Integration with billing and CRM systems",
        "Customer retention focused approaches",
        "Subscription and recurring payment handling",
        "Service continuation management",
        "Customer satisfaction monitoring"
      ],
      variant: "muted"
    }
  ];

  return (
    <section id="solutions" className="section-padding" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className={cn(
            "section-title transition-all duration-700 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Tailored Solutions for Every Industry
          </h2>
          <p className={cn(
            "section-subtitle transition-all duration-700 delay-100 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            DebtCare offers specialized approaches for different sectors, combining industry-specific knowledge with our core technology platform.
          </p>
        </div>

        <div className={cn(
          "grid grid-cols-1 md:grid-cols-4 gap-3 mb-12 opacity-0 translate-y-10 transition-all duration-700 delay-200",
          inView && "opacity-100 translate-y-0"
        )}>
          {solutions.map((solution, index) => (
            <button
              key={index}
              className={cn(
                "text-left p-4 rounded-lg transition-all duration-300",
                activeTab === index ? 
                  "bg-card shadow-md border border-primary/20" : 
                  "hover:bg-card/60 hover:shadow-sm"
              )}
              onClick={() => setActiveTab(index)}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                activeTab === index ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
              )}>
                {solution.icon}
              </div>
              <h3 className="font-medium">{solution.title}</h3>
            </button>
          ))}
        </div>

        <div className={cn(
          "opacity-0 translate-y-10 transition-all duration-700 delay-300",
          inView && "opacity-100 translate-y-0"
        )}>
          <Card className="bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-8 relative overflow-hidden">
                <CardHeader className="p-0 pb-6">
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                    `bg-${solutions[activeTab].variant}/10 text-${solutions[activeTab].variant}`
                  )}>
                    {solutions[activeTab].icon}
                  </div>
                  <CardTitle className="text-2xl">{solutions[activeTab].title}</CardTitle>
                  <CardDescription className="text-lg mt-2">{solutions[activeTab].description}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="space-y-3">
                    {solutions[activeTab].features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 h-5 w-5 text-primary flex-shrink-0">
                          <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-0 pt-8">
                  <Button className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>

                {/* Decorative gradient */}
                <div className={cn(
                  "absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-15 filter blur-xl transition-all duration-500",
                  activeTab === 0 && "bg-primary",
                  activeTab === 1 && "bg-secondary-foreground",
                  activeTab === 2 && "bg-accent",
                  activeTab === 3 && "bg-muted-foreground"
                )}></div>
              </div>

              <div className="relative lg:h-auto overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 hidden lg:block">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full max-w-md glassmorphism rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                    <div className="p-5 bg-gradient-to-b from-gray-800/50 to-transparent border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">DC</span>
                          </div>
                          <span className="text-sm font-medium text-white">DebtCare Portal</span>
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-white space-y-5">
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">Account Summary</h3>
                          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Active</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-white/70">Total Due:</span>
                            <span className="font-medium">$2,487.35</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Minimum Payment:</span>
                            <span className="font-medium">$124.37</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Next Due Date:</span>
                            <span className="font-medium">Aug 15, 2023</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Payment Options</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/15 transition-colors">
                            <div className="flex items-center justify-center gap-2">
                              <Banknote className="h-4 w-4" />
                              <span className="text-sm">Pay in Full</span>
                            </div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/15 transition-colors">
                            <div className="flex items-center justify-center gap-2">
                              <Users className="h-4 w-4" />
                              <span className="text-sm">Payment Plan</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <button className="w-full py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                          Make a Payment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated elements */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full animate-pulse-slow"></div>
                <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-primary/30 rounded-full animate-float"></div>
                <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-accent/30 rounded-full animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
