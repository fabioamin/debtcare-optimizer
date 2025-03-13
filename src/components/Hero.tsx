
import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, BarChart, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content - now appears first on mobile */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>{t('hero.tagline')}</span>
            </div>
            
            <h1 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl transition-opacity duration-700 opacity-0",
                loaded && "opacity-100"
              )}
            >
              {t('hero.title')}
              <span className="text-primary relative ml-3">
                {t('hero.highlight')}
                <svg className="absolute -bottom-2 w-full h-3 text-primary/20" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C32 2 62 1.5 93 5.5c43 4.5 85.5 8.5 129 0C247 1.5 280.5.5 299 3.5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p 
              className={cn(
                "text-lg md:text-xl text-muted-foreground max-w-2xl transition-opacity duration-700 delay-100 opacity-0",
                loaded && "opacity-100"
              )}
            >
              {t('hero.description')}
            </p>
            
            <div 
              className={cn(
                "flex flex-col sm:flex-row gap-4 pt-4 transition-opacity duration-700 delay-200 opacity-0",
                loaded && "opacity-100"
              )}
            >
              <Button size="lg" asChild className="group">
                <Link to="/dashboard">
                  {t('hero.cta.getStarted')}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/#solutions">
                  {t('hero.cta.viewSolutions')}
                </Link>
              </Button>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 opacity-0 transition-all duration-700 delay-300",
                loaded && "opacity-100"
              )}
            >
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{t('hero.stats.recoveryRate')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{t('hero.stats.customerRating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{t('hero.stats.fasterResolution')}</span>
              </div>
            </div>
          </div>
          
          {/* Customer Insights UI - now appears second on mobile */}
          <div 
            className={cn(
              "w-full lg:w-1/2 relative opacity-0 transition-all duration-1000 delay-300",
              loaded && "opacity-100"
            )}
          >
            <div className="relative z-10">
              <div className="glassmorphism rounded-2xl shadow-xl overflow-hidden">
                <div className="relative bg-gradient-to-b from-primary/5 to-transparent p-4 md:p-8">
                  <div className="absolute top-6 right-6 flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="pt-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-3">
                            <h3 className="font-medium">Customer Insights</h3>
                            <p className="text-xs text-muted-foreground">Real-time behavioral analysis</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/dashboard">View</Link>
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="space-y-4">
                          <div className="bg-secondary p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Payment Preferences</span>
                              <span className="text-xs text-muted-foreground">Last 30 days</span>
                            </div>
                            <div className="mt-3 flex items-end gap-2">
                              <div className="h-16 w-1/4 bg-primary/20 rounded-t-md relative group">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-foreground text-background px-2 py-1 rounded">Mobile</span>
                                <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-primary rounded-t-md"></div>
                              </div>
                              <div className="h-24 w-1/4 bg-primary/20 rounded-t-md relative group">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-foreground text-background px-2 py-1 rounded">Web</span>
                                <div className="absolute bottom-0 left-0 right-0 h-4/5 bg-primary rounded-t-md"></div>
                              </div>
                              <div className="h-20 w-1/4 bg-primary/20 rounded-t-md relative group">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-foreground text-background px-2 py-1 rounded">Email</span>
                                <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-primary rounded-t-md"></div>
                              </div>
                              <div className="h-12 w-1/4 bg-primary/20 rounded-t-md relative group">
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium bg-foreground text-background px-2 py-1 rounded">Other</span>
                                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-primary rounded-t-md"></div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-secondary p-3 rounded-lg">
                              <span className="text-sm font-medium">Response Rate</span>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-2xl font-bold">87%</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">+12%</span>
                              </div>
                            </div>
                            <div className="bg-secondary p-3 rounded-lg">
                              <span className="text-sm font-medium">Avg. Time to Pay</span>
                              <div className="mt-2 flex items-center gap-2">
                                <span className="text-2xl font-bold">4.2d</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">-1.5d</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/30 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/30 rounded-full filter blur-2xl opacity-50 animate-float"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
