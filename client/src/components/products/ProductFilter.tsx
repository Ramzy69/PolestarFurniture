import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Category } from "@shared/schema";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
  isLoading: boolean;
}

const ProductFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  isLoading
}: ProductFilterProps) => {
  const [, navigate] = useLocation();
  const [searchInput, setSearchInput] = useState("");
  
  const handleCategoryClick = (categorySlug: string | null) => {
    onCategoryChange(categorySlug);
    
    if (categorySlug) {
      navigate(`/products?category=${categorySlug}`);
    } else {
      navigate("/products");
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="bg-white dark:bg-primary-dark rounded-lg shadow-md p-6">
      <h3 className="text-lg font-montserrat font-semibold mb-6">Filter Products</h3>
      
      {/* Search */}
      <div className="mb-8">
        <h4 className="text-sm font-montserrat font-medium mb-3">Search</h4>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>
      
      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-montserrat font-medium">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 pt-2">
              <button
                className={`text-left px-2 py-1.5 rounded-md text-sm ${
                  selectedCategory === null 
                    ? 'bg-accent/10 dark:bg-accent/20 text-accent font-medium'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                onClick={() => handleCategoryClick(null)}
              >
                All Products
              </button>
              
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-full" />
                ))
              ) : (
                categories.map((category) => (
                  <button
                    key={category.id}
                    className={`text-left px-2 py-1.5 rounded-md text-sm ${
                      selectedCategory === category.slug 
                        ? 'bg-accent/10 dark:bg-accent/20 text-accent font-medium'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => handleCategoryClick(category.slug)}
                  >
                    {category.name}
                  </button>
                ))
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Price Range */}
      <Accordion type="single" collapsible>
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-montserrat font-medium">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-4 pt-2">
              <div className="flex gap-4 items-center">
                <Input
                  type="number"
                  placeholder="Min"
                  className="w-full"
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  className="w-full"
                />
              </div>
              <Button size="sm" className="w-full">Apply</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      {/* Availability */}
      <Accordion type="single" collapsible>
        <AccordionItem value="availability" className="border-none">
          <AccordionTrigger className="py-3 text-sm font-montserrat font-medium">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-accent" />
                <span className="text-sm">In Stock</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-accent" />
                <span className="text-sm">Out of Stock</span>
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="pt-4 mt-4 border-t">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => {
            onCategoryChange(null);
            setSearchInput("");
            navigate("/products");
          }}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
