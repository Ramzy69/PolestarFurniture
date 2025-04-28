import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-neutral-100 dark:bg-primary overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight mb-4">
              Transform Your <span className="text-accent">Workspace</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-neutral-400 dark:text-neutral-300 max-w-lg">
              Discover premium office furniture solutions that blend style, comfort, and functionality for the modern workplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white font-montserrat font-semibold"
                asChild
              >
                <Link href="/products">
                  Explore Products
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary dark:border-white text-primary dark:text-white font-montserrat font-semibold hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-primary"
                asChild
              >
                <Link href="/contact">
                  Request Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1520032626377-4e1d2acd4f13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern office furniture setup" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-transparent dark:from-primary/70 pointer-events-none"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-4 rounded-lg shadow-lg hidden md:block">
              <p className="font-montserrat font-bold">Premium Quality</p>
              <p className="text-sm">Built to Last</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-accent/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default HeroSection;
