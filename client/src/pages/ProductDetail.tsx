import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@shared/schema";
import { ShoppingCart, ChevronLeft, Star, StarHalf, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import InquiryForm from "@/components/shared/InquiryForm";

const ProductDetail = () => {
  const { id: slug } = useParams();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  const { data: product, isLoading, error } = useQuery<Product>({ 
    queryKey: [`/api/products/${slug}`],
  });
  
  // Set active image when product data is loaded
  useEffect(() => {
    if (product && product.imageUrl && !activeImage) {
      setActiveImage(product.imageUrl);
    }
  }, [product, activeImage]);
  
  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-5 w-5 text-yellow-400 fill-yellow-400" />);
    }
    
    // Add empty stars to complete 5 stars
    const emptyStarsCount = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-5 w-5 text-yellow-400" />);
    }
    
    return stars;
  };
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-montserrat mb-4">Product Not Found</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            The product you're looking for doesn't exist or an error occurred.
          </p>
          <Button asChild>
            <Link href="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product ? `${product.name} | Polestar Furniture` : "Product | Polestar Furniture"}</title>
        <meta 
          name="description" 
          content={product?.description || "View details of this premium office furniture product."} 
        />
      </Helmet>
      
      <section className="py-12 bg-white dark:bg-primary/95">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-8" 
            asChild
          >
            <Link href="/products">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          
          {isLoading ? (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-1/2">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <div className="flex gap-4 mt-4">
                  {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="w-20 h-20 rounded-md" />
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <Skeleton className="h-10 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/4 mb-6" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-8" />
                <Skeleton className="h-8 w-1/3 mb-8" />
                <div className="flex gap-4 mb-8">
                  <Skeleton className="h-12 w-40" />
                  <Skeleton className="h-12 w-12" />
                  <Skeleton className="h-12 w-12" />
                </div>
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          ) : product && (
            <div className="flex flex-col lg:flex-row gap-12">
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="rounded-lg overflow-hidden bg-neutral-100 dark:bg-primary-dark">
                  <img 
                    src={activeImage || product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-auto object-contain aspect-square"
                  />
                </div>
                {product.gallery && product.gallery.length > 0 && (
                  <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                    <div 
                      className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                        activeImage === product.imageUrl ? 'border-accent' : 'border-transparent'
                      }`}
                      onClick={() => setActiveImage(product.imageUrl)}
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {product.gallery.map((image, index) => (
                      <div 
                        key={index}
                        className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                          activeImage === image ? 'border-accent' : 'border-transparent'
                        }`}
                        onClick={() => setActiveImage(image)}
                      >
                        <img 
                          src={image} 
                          alt={`${product.name} - view ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold font-montserrat mb-2">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {renderRating(product.rating || 0)}
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {product.rating} Stars
                  </span>
                </div>
                
                <div className="text-2xl font-montserrat font-bold mb-6">
                  {product.discountedPrice ? (
                    <>
                      <span className="text-accent">₹{product.discountedPrice.toLocaleString()}</span>
                      <span className="text-base line-through text-neutral-400 ml-3">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span>₹{product.price.toLocaleString()}</span>
                  )}
                </div>
                
                <p className="text-neutral-500 dark:text-neutral-400 mb-8">
                  {product.description}
                </p>
                
                <div className="flex gap-4 mb-8">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="rounded-full h-12 w-12">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="pt-4">
                    <p className="text-neutral-500 dark:text-neutral-400">
                      {product.description}
                    </p>
                  </TabsContent>
                  <TabsContent value="specifications" className="pt-4">
                    <ul className="list-disc pl-5 text-neutral-500 dark:text-neutral-400 space-y-2">
                      <li>Premium quality materials</li>
                      <li>Ergonomic design for comfort</li>
                      <li>Easy assembly</li>
                      <li>2-year warranty</li>
                      <li>Dimensions: 60cm x 80cm x 120cm</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="shipping" className="pt-4">
                    <p className="text-neutral-500 dark:text-neutral-400 mb-3">
                      Free shipping to all major cities in India. Delivery within 5-7 business days.
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      For custom orders and bulk inquiries, please contact our sales team.
                    </p>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          )}
        </div>
      </section>
      
      <InquiryForm />
    </>
  );
};

export default ProductDetail;
