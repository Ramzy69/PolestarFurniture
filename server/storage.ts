import { 
  User, 
  InsertUser, 
  Product,
  InsertProduct,
  Category,
  InsertCategory,
  Inquiry,
  InsertInquiry
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product operations
  getProducts(options?: { 
    categoryId?: number; 
    featured?: boolean; 
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Inquiry operations
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private inquiries: Map<number, Inquiry>;
  private userId: number;
  private productId: number;
  private categoryId: number;
  private inquiryId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.inquiries = new Map();
    this.userId = 1;
    this.productId = 1;
    this.categoryId = 1;
    this.inquiryId = 1;
    
    // Initialize with some categories
    this.initializeData();
  }
  
  private initializeData() {
    // Add default categories
    const categoriesData: InsertCategory[] = [
      { 
        name: "Office Chairs", 
        slug: "chairs", 
        description: "Ergonomic designs for all-day comfort",
        imageUrl: "https://images.unsplash.com/photo-1541558869434-2031818e7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Desks & Tables", 
        slug: "desks", 
        description: "Functional workspaces for productivity",
        imageUrl: "https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Conference Solutions", 
        slug: "conference", 
        description: "Professional setups for effective meetings",
        imageUrl: "https://images.unsplash.com/photo-1534462070332-61b22ee125c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Storage Solutions", 
        slug: "storage", 
        description: "Organized storage for efficient workspaces",
        imageUrl: "https://images.unsplash.com/photo-1581107316720-6fa0b8fc22ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      { 
        name: "Workstations", 
        slug: "workstations", 
        description: "Complete desk setups for maximum productivity",
        imageUrl: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ];
    
    // Add categories
    categoriesData.forEach(cat => this.createCategory(cat));
    
    // Add sample products
    const productsData: InsertProduct[] = [
      {
        name: "Premium Ergonomic Chair",
        slug: "premium-ergonomic-chair",
        description: "Advanced lumbar support with premium materials for all-day comfort. Fully adjustable with breathable mesh back.",
        price: 24999,
        discountedPrice: 22999,
        imageUrl: "https://images.unsplash.com/photo-1559061509-b1f7a3ee93cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1559061509-b1f7a3ee93cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1571538288252-e2f09adff7d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        categoryId: 1,
        featured: 1,
        inStock: 1,
        rating: 4.5,
        badges: ["Best Seller"]
      },
      {
        name: "Executive Desk",
        slug: "executive-desk",
        description: "Spacious work surface with built-in storage solutions. High-quality wood construction with metal accents.",
        price: 42500,
        imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1587212805776-992ad9f791a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        categoryId: 2,
        featured: 1,
        inStock: 1,
        rating: 4.0,
        badges: []
      },
      {
        name: "Conference Table",
        slug: "conference-table",
        description: "Elegant design with integrated power solutions. Perfect for meeting rooms and collaborative spaces.",
        price: 78999,
        imageUrl: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        categoryId: 3,
        featured: 1,
        inStock: 1,
        rating: 5.0,
        badges: ["New Arrival"]
      },
      {
        name: "Storage Cabinet",
        slug: "storage-cabinet",
        description: "Versatile storage solution with adjustable shelves. Keep your office organized and clutter-free.",
        price: 32750,
        imageUrl: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1594125674956-61a9b49c8ecc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        categoryId: 4,
        featured: 1,
        inStock: 1,
        rating: 4.5,
        badges: []
      },
      {
        name: "Modern Workstation Setup",
        slug: "modern-workstation-setup",
        description: "Complete office setup with desk, chair, and storage. Designed for maximum productivity and comfort.",
        price: 89999,
        imageUrl: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1541558869434-2031818e7af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        categoryId: 5,
        featured: 1,
        inStock: 1,
        rating: 4.8,
        badges: ["Best Value"]
      },
      {
        name: "Mid-Back Mesh Chair",
        slug: "mid-back-mesh-chair",
        description: "Comfortable mesh chair with excellent back support and breathability.",
        price: 14999,
        discountedPrice: 12999,
        imageUrl: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        ],
        categoryId: 1,
        featured: 0,
        inStock: 1,
        rating: 4.3,
        badges: ["Sale"]
      }
    ];
    
    // Add products
    productsData.forEach(prod => this.createProduct(prod));
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Product operations
  async getProducts(options: { 
    categoryId?: number; 
    featured?: boolean; 
    limit?: number;
    offset?: number;
    search?: string;
  } = {}): Promise<Product[]> {
    let products = Array.from(this.products.values());
    
    if (options.categoryId) {
      products = products.filter(p => p.categoryId === options.categoryId);
    }
    
    if (options.featured) {
      products = products.filter(p => p.featured === 1);
    }
    
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination if provided
    if (options.limit && options.offset !== undefined) {
      products = products.slice(options.offset, options.offset + options.limit);
    } else if (options.limit) {
      products = products.slice(0, options.limit);
    }
    
    return products;
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Inquiry operations
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.inquiryId++;
    const inquiry: Inquiry = { ...insertInquiry, id };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
