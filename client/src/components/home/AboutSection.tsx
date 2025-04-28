import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Award, Bolt, HeadphonesIcon, Recycle } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 bg-neutral-200 dark:bg-primary/95">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Our workshop" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-10 -left-5 w-64 h-64 bg-accent/10 rounded-full -z-10 hidden lg:block"></div>
            <div className="absolute -bottom-5 right-10 w-40 h-40 bg-secondary/10 rounded-full -z-10 hidden lg:block"></div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold font-montserrat mb-5">About Polestar Furniture</h2>
            <p className="text-neutral-400 dark:text-neutral-300 mb-6">
              At Polestar Furniture, we've been crafting premium office furniture for over two decades, blending traditional craftsmanship with modern design principles.
            </p>
            <p className="text-neutral-400 dark:text-neutral-300 mb-6">
              Our mission is to create workspaces that inspire creativity, enhance productivity, and promote well-being. Every piece we create is thoughtfully designed, meticulously crafted, and built to last.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                  <Award className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold mb-1">Premium Quality</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">Crafted with the finest materials</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                  <Bolt className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold mb-1">Expert Craftsmanship</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">Skilled artisans with years of experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                  <HeadphonesIcon className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold mb-1">Dedicated Support</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">Customer service excellence</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg mr-4">
                  <Recycle className="text-accent" size={24} />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold mb-1">Sustainability</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-300">Eco-friendly materials and processes</p>
                </div>
              </div>
            </div>
            
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white font-montserrat font-semibold" 
              size="lg"
              asChild
            >
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
