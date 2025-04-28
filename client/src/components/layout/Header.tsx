import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  Phone, 
  Mail, 
  User 
} from "lucide-react";

const productCategories = [
  { name: "Office Chairs", href: "/products?category=chairs" },
  { name: "Desks & Tables", href: "/products?category=desks" },
  { name: "Conference Solutions", href: "/products?category=conference" },
  { name: "Storage Units", href: "/products?category=storage" },
  { name: "Workstations", href: "/products?category=workstations" },
];

const Header = () => {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-primary shadow-md transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-primary text-white dark:bg-accent py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 text-sm">
            <a href="tel:+919876543210" className="flex items-center hover:text-neutral-300 transition-colors">
              <Phone className="h-4 w-4 mr-1" /> +91 98765 43210
            </a>
            <a href="mailto:info@polestarfurniture.in" className="flex items-center hover:text-neutral-300 transition-colors">
              <Mail className="h-4 w-4 mr-1" /> info@polestarfurniture.in
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle variant="text" className="text-white hover:text-neutral-300 p-0 h-auto" />
            <Button variant="ghost" className="text-white hover:text-neutral-300 p-0 h-auto flex items-center gap-1">
              <User className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Account</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold font-montserrat text-primary dark:text-white">
              POLESTAR<span className="text-accent">.</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/">
                    <NavigationMenuLink 
                      className={cn(
                        "font-montserrat font-semibold hover:text-accent transition-colors",
                        location === "/" && "text-accent"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-montserrat font-semibold hover:text-accent transition-colors">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-2">
                      {productCategories.map((category) => (
                        <li key={category.name}>
                          <Link href={category.href}>
                            <NavigationMenuLink 
                              className="block px-3 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md"
                            >
                              {category.name}
                            </NavigationMenuLink>
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link href="/products">
                          <NavigationMenuLink 
                            className="block px-3 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md font-semibold text-accent"
                          >
                            View All Products
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/about">
                    <NavigationMenuLink 
                      className={cn(
                        "font-montserrat font-semibold hover:text-accent transition-colors",
                        location === "/about" && "text-accent"
                      )}
                    >
                      About Us
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link href="/contact">
                    <NavigationMenuLink 
                      className={cn(
                        "font-montserrat font-semibold hover:text-accent transition-colors",
                        location === "/contact" && "text-accent"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          {/* Search, Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-accent transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 p-2 bg-white dark:bg-primary shadow-lg rounded-md w-60">
                  <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-3 py-1 border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 rounded-l-md focus:outline-none"
                    />
                    <Button type="submit" className="rounded-l-none">
                      <Search className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              )}
            </div>
            
            <Button variant="ghost" size="icon" className="hover:text-accent transition-colors" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden hover:text-accent transition-colors">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start font-montserrat font-semibold">Home</Button>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" className="w-full justify-start font-montserrat font-semibold">Products</Button>
                    <div className="pl-4 flex flex-col gap-2">
                      {productCategories.map((category) => (
                        <Link key={category.name} href={category.href}>
                          <Button variant="ghost" className="w-full justify-start text-sm">{category.name}</Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link href="/about">
                    <Button variant="ghost" className="w-full justify-start font-montserrat font-semibold">About Us</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost" className="w-full justify-start font-montserrat font-semibold">Contact</Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
