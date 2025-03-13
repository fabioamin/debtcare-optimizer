
import { useState, useEffect, useRef } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [inView, setInView] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className={cn(
            "section-title transition-all duration-700 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Get Started with DebtCare
          </h2>
          <p className={cn(
            "section-subtitle transition-all duration-700 delay-100 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Ready to transform your debt recovery process? Contact us today for a personalized demo or to discuss your specific needs.
          </p>
        </div>

        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 opacity-0 translate-y-10 transition-all duration-700 delay-200",
          inView && "opacity-100 translate-y-0"
        )}>
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 relative overflow-hidden group hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-4">Let's discuss your needs</h3>
                <p className="text-muted-foreground mb-6">
                  Our team of experts is ready to help you implement the perfect debt recovery solution for your organization.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email Us</h4>
                      <p className="text-muted-foreground">info@debtcare.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Call Us</h4>
                      <p className="text-muted-foreground">+1 (888) 555-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Visit Us</h4>
                      <p className="text-muted-foreground">
                        1234 Innovation Way<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-secondary rounded-xl p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-accent/10 rounded-full"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-2">Request a Demo</h3>
                <p className="text-muted-foreground">
                  See DebtCare in action with a personalized demonstration tailored to your industry and specific needs.
                </p>
                <Button className="mt-4" variant="outline">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 relative overflow-hidden">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Message Received!</h3>
                <p className="text-muted-foreground max-w-md">
                  Thank you for reaching out. A member of our team will contact you shortly to discuss how DebtCare can help your organization.
                </p>
                <Button 
                  className="mt-6"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">
                    Company
                  </label>
                  <Input 
                    id="company" 
                    placeholder="Your Company"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?"
                    rows={4} 
                    required 
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
