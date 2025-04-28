import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Category } from "@shared/schema";

const FeaturedCategories = () => {
  const { data: categories, isLoading, error } = useQuery<Category[]>({ 
    queryKey: ['/api/categories'],
  });

  if (error) {
    return (
      <section className="py-16 bg-neutral-200 dark:bg-primary/95">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-3">Featured Categories</h2>
            <p className="text-red-500">Failed to load categories. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-200 dark:bg-primary/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-montserrat mb-3">Featured Categories</h2>
          <p className="text-neutral-400 dark:text-neutral-300 max-w-2xl mx-auto">
            Explore our most popular office furniture categories designed for the modern workplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white dark:bg-primary-dark rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-5">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))
          ) : (
            // Actual categories
            categories?.map((category, index) => (
              <motion.div 
                key={category.id}
                className="group bg-white dark:bg-primary-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.imageUrl || "https://via.placeholder.com/800x600"} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-montserrat font-semibold text-xl mb-2">{category.name}</h3>
                  <p className="text-neutral-400 dark:text-neutral-300 text-sm mb-4">{category.description}</p>
                  <Link 
                    href={`/products?category=${category.slug}`}
                    className="text-accent font-montserrat font-medium flex items-center hover:underline"
                  >
                    Explore Collection 
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
