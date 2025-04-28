import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Product } from "@shared/schema";
import ProductCard from "@/components/products/ProductCard";
import { motion } from "framer-motion";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useQuery<Product[]>({ 
    queryKey: ['/api/products', { featured: true }],
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleProducts, setVisibleProducts] = useState(3);

  // Determine how many products to show based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleProducts(1);
      } else if (window.innerWidth < 1024) {
        setVisibleProducts(2);
      } else {
        setVisibleProducts(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    if (products) {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, products.length - visibleProducts + 1));
    }
  };

  const prevSlide = () => {
    if (products) {
      setCurrentSlide((prev) => 
        prev === 0 ? Math.max(0, products.length - visibleProducts) : prev - 1
      );
    }
  };

  useEffect(() => {
    if (carouselRef.current && products) {
      const slideWidth = carouselRef.current.offsetWidth / visibleProducts;
      carouselRef.current.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
  }, [currentSlide, products, visibleProducts]);
  
  if (error) {
    return (
      <section className="py-16 bg-white dark:bg-primary/90">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-3">Featured Products</h2>
            <p className="text-red-500">Failed to load products. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-primary/90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold font-montserrat mb-3">Featured Products</h2>
            <p className="text-neutral-400 dark:text-neutral-300 max-w-2xl">Our most popular office furniture solutions</p>
          </motion.div>
          <div className="hidden md:flex space-x-2">
            <Button 
              onClick={prevSlide} 
              variant="outline" 
              size="icon" 
              className="rounded-full border border-neutral-300 dark:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-400/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              onClick={nextSlide} 
              variant="outline" 
              size="icon" 
              className="rounded-full border border-neutral-300 dark:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-400/20"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="products-carousel overflow-hidden">
          <motion.div 
            ref={carouselRef}
            className="carousel-slide flex transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-sm mx-3">
                  <Skeleton className="h-64 w-full rounded-t-lg" />
                  <div className="p-5 bg-neutral-100 dark:bg-primary-dark rounded-b-lg">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              products?.map((product) => (
                <ProductCard key={product.id} product={product} className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-sm mx-3" />
              ))
            )}
          </motion.div>
        </div>
        
        <div className="flex justify-center mt-8 md:hidden">
          <Button 
            onClick={prevSlide} 
            variant="outline" 
            size="icon" 
            className="rounded-full border border-neutral-300 dark:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-400/20 mx-1"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            onClick={nextSlide} 
            variant="outline" 
            size="icon" 
            className="rounded-full border border-neutral-300 dark:border-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-400/20 mx-1"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
