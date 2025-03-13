
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
  imagePath: string;
}

const Testimonials = () => {
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const testimonials: Testimonial[] = [
    {
      quote: "DebtCare transformed our collections process. Their AI-driven platform increased our recovery rates by 34% while significantly improving customer satisfaction scores. The personalized communication strategies have been a game-changer.",
      author: "Sarah Johnson",
      position: "CFO",
      company: "National Credit Union",
      rating: 5,
      imagePath: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "The omnichannel capabilities allowed us to meet customers where they are, resulting in faster resolutions and reduced operational costs. The compliance features give us peace of mind in a heavily regulated industry.",
      author: "Michael Chen",
      position: "Head of Collections",
      company: "Pacific Banking Group",
      rating: 5,
      imagePath: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "As a debt purchasing firm, we've seen an 41% increase in portfolio performance since implementing DebtCare. Their data-driven approach to account segmentation has revolutionized how we evaluate and manage our investments.",
      author: "Elena Rodriguez",
      position: "Operations Director",
      company: "Horizon Receivables",
      rating: 4,
      imagePath: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="section-padding bg-secondary/50" ref={sectionRef}>
      <div className="container mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className={cn(
            "section-title transition-all duration-700 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Success Stories
          </h2>
          <p className={cn(
            "section-subtitle transition-all duration-700 delay-100 translate-y-10 opacity-0",
            inView && "translate-y-0 opacity-100"
          )}>
            Hear from organizations that have transformed their debt recovery processes with our platform.
          </p>
        </div>

        <div className={cn(
          "relative mt-16 opacity-0 translate-y-10 transition-all duration-700 delay-200",
          inView && "opacity-100 translate-y-0"
        )}>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src={testimonials[activeIndex].imagePath} 
                  alt={testimonials[activeIndex].author}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={cn(
                          "h-4 w-4 mr-1", 
                          i < testimonials[activeIndex].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                        )}
                      />
                    ))}
                  </div>
                  <h3 className="text-white font-semibold">{testimonials[activeIndex].author}</h3>
                  <p className="text-white/80 text-sm">{testimonials[activeIndex].position}, {testimonials[activeIndex].company}</p>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <div className="relative">
                <div className="absolute -top-10 -left-10 text-6xl text-primary/20 font-serif">"</div>
                <blockquote className="relative z-10 text-xl md:text-2xl font-medium italic text-foreground mb-8 px-6">
                  {testimonials[activeIndex].quote}
                </blockquote>
                <div className="absolute -bottom-14 -right-10 text-6xl text-primary/20 font-serif">"</div>
              </div>
              
              <div className="mt-12 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous</span>
                </Button>
                
                <div className="flex items-center space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        index === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
