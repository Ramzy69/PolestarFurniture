import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, StarHalf } from "lucide-react";
import { Product } from "@shared/schema";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  // Function to render stars based on rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="h-4 w-4 text-yellow-400 fill-yellow-400" />);
    }
    
    // Add empty stars to complete 5 stars
    const emptyStarsCount = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarsCount; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-yellow-400" />);
    }
    
    return stars;
  };

  return (
    <motion.div 
      className={`product-card bg-neutral-100 dark:bg-primary-dark rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {product.badges && product.badges.length > 0 && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-montserrat py-1 px-2 rounded">
            {product.badges[0]}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-montserrat font-semibold text-lg">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <div className="flex">
            {renderRating(product.rating || 0)}
          </div>
        </div>
        <p className="text-neutral-400 dark:text-neutral-300 text-sm mb-4">
          {product.description && product.description.length > 70 
            ? `${product.description.substring(0, 70)}...` 
            : product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="font-montserrat font-bold text-lg">
            ₹{product.discountedPrice ? (
              <>
                <span>{product.discountedPrice.toLocaleString()}</span>
                <span className="text-sm line-through text-neutral-400 ml-2">
                  ₹{product.price.toLocaleString()}
                </span>
              </>
            ) : (
              product.price.toLocaleString()
            )}
          </span>
          <Button size="icon" className="bg-accent hover:bg-accent/90 text-white rounded-full">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
