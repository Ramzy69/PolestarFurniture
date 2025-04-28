import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@shared/schema";
import ProductCard from "@/components/products/ProductCard";

interface ProductCarouselProps {
  products: Product[];
  loading?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  showArrows?: boolean;
  showDots?: boolean;
  slidesToShow?: number;
  responsive?: {
    breakpoint: number;
    slidesToShow: number;
  }[];
  className?: string;
}

const ProductCarousel = ({
  products,
  loading = false,
  autoplay = false,
  autoplaySpeed = 5000,
  showArrows = true,
  showDots = false,
  slidesToShow = 3,
  responsive = [
    { breakpoint: 1024, slidesToShow: 2 },
    { breakpoint: 640, slidesToShow: 1 }
  ],
  className = ""
}: ProductCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(slidesToShow);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      let visibleCount = slidesToShow;
      for (const item of responsive) {
        if (window.innerWidth <= item.breakpoint) {
          visibleCount = item.slidesToShow;
          break;
        }
      }
      setVisibleSlides(visibleCount);
      
      // Ensure currentSlide is valid with new slidesToShow
      if (products && currentSlide > products.length - visibleCount) {
        setCurrentSlide(Math.max(0, products.length - visibleCount));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesToShow, responsive, products, currentSlide]);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && products && products.length > visibleSlides) {
      autoplayRef.current = setInterval(() => {
        next();
      }, autoplaySpeed);
      
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }
  }, [autoplay, autoplaySpeed, currentSlide, products, visibleSlides]);

  // Reset autoplay on interaction
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      if (autoplay && products && products.length > visibleSlides) {
        autoplayRef.current = setInterval(() => {
          next();
        }, autoplaySpeed);
      }
    }
  };

  const next = () => {
    if (!products) return;
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, products.length - visibleSlides);
      return prev >= maxSlide ? 0 : prev + 1;
    });
    resetAutoplay();
  };

  const prev = () => {
    if (!products) return;
    setCurrentSlide((prev) => {
      const maxSlide = Math.max(0, products.length - visibleSlides);
      return prev <= 0 ? maxSlide : prev - 1;
    });
    resetAutoplay();
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    resetAutoplay();
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }
  };

  // Calculate visible products
  let visibleProducts = products ? products.slice(currentSlide, currentSlide + visibleSlides) : [];
  
  // If we're at the end of the list and need more to fill the last slide
  if (products && currentSlide + visibleSlides > products.length) {
    const remainingCount = currentSlide + visibleSlides - products.length;
    const additionalProducts = products.slice(0, remainingCount);
    visibleProducts = [...visibleProducts, ...additionalProducts];
  }

  // Apply appropriate width to carousel elements
  useEffect(() => {
    if (carouselRef.current && products && products.length > 0) {
      const itemWidth = 100 / visibleSlides;
      const items = carouselRef.current.querySelectorAll('.carousel-item');
      items.forEach((item: Element) => {
        (item as HTMLElement).style.width = `${itemWidth}%`;
      });
    }
  }, [visibleSlides, products]);

  // Loading skeleton placeholders
  if (loading) {
    return (
      <div className={`product-carousel relative overflow-hidden ${className}`}>
        <div className="flex gap-4">
          {Array(visibleSlides).fill(0).map((_, index) => (
            <div key={index} className="carousel-item" style={{ width: `${100 / visibleSlides}%` }}>
              <div className="bg-neutral-100 dark:bg-primary-dark rounded-lg overflow-hidden shadow-md h-96 animate-pulse">
                <div className="h-64 bg-neutral-200 dark:bg-neutral-700"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full"></div>
                  <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                    <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`product-carousel relative ${className}`}>
      <div 
        className="carousel-container overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div 
          ref={carouselRef}
          className="carousel-track flex transition-all duration-500"
          initial={false}
          animate={{ 
            x: products && products.length > visibleSlides 
              ? `-${(currentSlide * 100) / visibleSlides}%` 
              : 0 
          }}
        >
          {products && products.map((product, index) => (
            <div 
              key={index} 
              className="carousel-item px-3"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>

      {showArrows && products && products.length > visibleSlides && (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white dark:bg-neutral-800 shadow-md border-neutral-200 dark:border-neutral-700"
            onClick={prev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white dark:bg-neutral-800 shadow-md border-neutral-200 dark:border-neutral-700"
            onClick={next}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {showDots && products && products.length > visibleSlides && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil((products.length - visibleSlides + 1) / 1) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === Math.floor(currentSlide / 1) 
                  ? 'bg-accent' 
                  : 'bg-neutral-300 dark:bg-neutral-600'
              }`}
              onClick={() => goToSlide(index * 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
