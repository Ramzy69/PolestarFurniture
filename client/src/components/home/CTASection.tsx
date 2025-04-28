import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-16 bg-secondary dark:bg-secondary/90 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="w-full lg:w-2/3 mb-8 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-montserrat mb-4">Ready to Transform Your Workspace?</h2>
            <p className="text-white/90 max-w-2xl">
              Let our experts help you design the perfect office environment tailored to your needs and preferences. Schedule a consultation today.
            </p>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col gap-4 lg:text-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              className="bg-white text-secondary hover:bg-neutral-100 font-montserrat font-semibold"
              size="lg"
              asChild
            >
              <Link href="/contact">
                Request Consultation
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 font-montserrat font-semibold"
              size="lg"
              asChild
            >
              <Link href="/products">
                Browse Catalog
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
