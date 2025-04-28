import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Twitter, Send, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white dark:bg-primary-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold font-montserrat text-white">
                POLESTAR<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-neutral-300 mb-6">
              Creating premium office furniture solutions that blend style, comfort, and functionality for the modern workplace.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=chairs" className="text-neutral-300 hover:text-accent transition-colors">
                  Office Chairs
                </Link>
              </li>
              <li>
                <Link href="/products?category=desks" className="text-neutral-300 hover:text-accent transition-colors">
                  Desks & Tables
                </Link>
              </li>
              <li>
                <Link href="/products?category=conference" className="text-neutral-300 hover:text-accent transition-colors">
                  Conference Solutions
                </Link>
              </li>
              <li>
                <Link href="/products?category=storage" className="text-neutral-300 hover:text-accent transition-colors">
                  Storage Units
                </Link>
              </li>
              <li>
                <Link href="/products?category=workstations" className="text-neutral-300 hover:text-accent transition-colors">
                  Workstations
                </Link>
              </li>
              <li>
                <Link href="/products?category=reception" className="text-neutral-300 hover:text-accent transition-colors">
                  Reception Furniture
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="text-neutral-300 hover:text-accent transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-neutral-300 hover:text-accent transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-neutral-300 hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-neutral-300 mb-4">
              Subscribe to our newsletter for the latest products, trends, and exclusive offers.
            </p>
            <form className="mb-4">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full rounded-r-none border-none dark:bg-white/10"
                />
                <Button type="submit" className="bg-accent hover:bg-accent/90 rounded-l-none">
                  <Send size={18} />
                </Button>
              </div>
            </form>
            <p className="text-neutral-400 text-sm">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Polestar Furniture. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-accent text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-400 hover:text-accent text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-400 hover:text-accent text-sm transition-colors">Shipping Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
