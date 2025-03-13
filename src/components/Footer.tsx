
import { Link } from "react-router-dom";
import { LinkedIn, Twitter, Facebook, Instagram, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get the email input value
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    toast({
      title: "Thanks for subscribing!",
      description: `We've sent a confirmation email to ${email}.`,
      duration: 5000,
    });
    
    // Reset form
    form.reset();
  };

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto max-w-7xl py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="font-bold text-white">DC</span>
              </div>
              <span className="font-bold text-xl">DebtCare</span>
            </Link>
            
            <p className="text-muted-foreground">
              Transforming debt recovery through intelligence, empathy, and technology.
            </p>
            
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedIn className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="h-9 w-9 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-muted-foreground hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/api" className="text-muted-foreground hover:text-primary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-muted-foreground hover:text-primary transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest updates, news and product offers sent directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    name="email"
                    type="email" 
                    placeholder="Email address" 
                    className="pl-10" 
                    required 
                  />
                </div>
                <Button type="submit" size="icon" className="ml-2 flex-shrink-0">
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DebtCare. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link to="/security" className="text-muted-foreground hover:text-primary transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
