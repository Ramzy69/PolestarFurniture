import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Product, Category } from "@shared/schema";
import { motion } from "framer-motion";
import { useProductSearch } from "@/lib/hooks/useProductSearch";

const Products = () => {
  const [searchParams] = useProductSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get the categoryId from the URL query params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);
  
  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({ 
    queryKey: ['/api/categories'],
  });
  
  // Find the selected category id based on slug
  const selectedCategoryId = selectedCategory && categories 
    ? categories.find(c => c.slug === selectedCategory)?.id 
    : undefined;
  
  // Fetch products with filters
  const { 
    data: products, 
    isLoading: productsLoading, 
    error 
  } = useQuery<Product[]>({ 
    queryKey: [
      '/api/products', 
      { 
        categoryId: selectedCategoryId, 
        search: searchParams.get("search") || undefined
      }
    ],
  });
  
  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };
  
  return (
    <>
      <Helmet>
        <title>Products | Polestar Furniture</title>
        <meta name="description" content="Browse our collection of premium office furniture for the modern workplace." />
      </Helmet>
      
      <section className="bg-neutral-100 dark:bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
              Our Premium Office Furniture
            </h1>
            <p className="text-neutral-400 dark:text-neutral-300 max-w-3xl mx-auto">
              Browse our collection of high-quality office furniture designed for style, comfort, and functionality
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 bg-white dark:bg-primary/95">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/4">
              <ProductFilter 
                categories={categories || []} 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                isLoading={categoriesLoading}
              />
            </div>
            
            <div className="w-full lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-montserrat font-semibold">
                  {selectedCategory && categories?.find(c => c.slug === selectedCategory)
                    ? categories.find(c => c.slug === selectedCategory)?.name
                    : searchParams.get("search")
                    ? `Search Results: "${searchParams.get("search")}"`
                    : "All Products"}
                </h2>
                <div className="text-sm text-neutral-400 dark:text-neutral-300">
                  {products?.length || 0} products found
                </div>
              </div>
              
              {error ? (
                <div className="bg-red-50 dark:bg-red-900/10 text-red-500 p-4 rounded-md">
                  Failed to load products. Please try again later.
                </div>
              ) : productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, index) => (
                    <div key={index} className="bg-neutral-100 dark:bg-primary-dark rounded-lg shadow-md">
                      <Skeleton className="h-64 w-full rounded-t-lg" />
                      <div className="p-5">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-6 w-1/3" />
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-neutral-100 dark:bg-primary-dark rounded-lg">
                  <h3 className="text-lg font-montserrat font-semibold mb-2">No products found</h3>
                  <p className="text-neutral-400 dark:text-neutral-300 mb-6">
                    We couldn't find any products matching your criteria.
                  </p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory(null);
                      window.history.pushState({}, "", "/products");
                    }}
                  >
                    View All Products
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
