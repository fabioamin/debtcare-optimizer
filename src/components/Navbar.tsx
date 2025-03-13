
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-bold text-white">DC</span>
            </div>
            <span className="font-bold text-xl">DebtCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#solutions" className="text-foreground/80 hover:text-primary transition-colors">
              {t('nav.solutions')}
            </Link>
            <Link to="/#features" className="text-foreground/80 hover:text-primary transition-colors">
              {t('nav.features')}
            </Link>
            <Link to="/#testimonials" className="text-foreground/80 hover:text-primary transition-colors">
              {t('nav.testimonials')}
            </Link>
            <Link to="/#contact" className="text-foreground/80 hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Button variant="outline" asChild>
              <Link to="/dashboard">{t('nav.demo')}</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">
                <LogIn className="mr-2 h-4 w-4" />
                {t('nav.login')}
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              className="flex items-center"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-[68px] z-40 overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-all duration-300 md:hidden",
          isMenuOpen 
            ? "max-h-[calc(100vh-68px)] border-b border-border"
            : "max-h-0 border-none"
        )}
      >
        <div className="space-y-4 px-6 py-6">
          <Link
            to="/#solutions"
            className="block py-2 text-foreground/80 hover:text-primary"
            onClick={closeMenu}
          >
            {t('nav.solutions')}
          </Link>
          <Link
            to="/#features"
            className="block py-2 text-foreground/80 hover:text-primary"
            onClick={closeMenu}
          >
            {t('nav.features')}
          </Link>
          <Link
            to="/#testimonials"
            className="block py-2 text-foreground/80 hover:text-primary"
            onClick={closeMenu}
          >
            {t('nav.testimonials')}
          </Link>
          <Link
            to="/#contact"
            className="block py-2 text-foreground/80 hover:text-primary"
            onClick={closeMenu}
          >
            {t('nav.contact')}
          </Link>
          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            <Button variant="outline" asChild className="w-full justify-center">
              <Link to="/dashboard" onClick={closeMenu}>{t('nav.demo')}</Link>
            </Button>
            <Button asChild className="w-full justify-center">
              <Link to="/dashboard" onClick={closeMenu}>
                <LogIn className="mr-2 h-4 w-4" />
                {t('nav.login')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
