import { 
  User, 
  InsertUser, 
  Product,
  InsertProduct,
  Category,
  InsertCategory,
  Inquiry,
  InsertInquiry,
  users,
  products,
  categories,
  inquiries
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, desc, sql } from "drizzle-orm";

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
  
  // Initialization
  initializeData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        fullName: insertUser.fullName || null,
        role: insertUser.role || null
      })
      .returning();
    return user;
  }
  
  async getProducts(options: { 
    categoryId?: number; 
    featured?: boolean; 
    limit?: number;
    offset?: number;
    search?: string;
  } = {}): Promise<Product[]> {
    let query = db.select().from(products);
    const conditions = [];
    
    if (options.categoryId) {
      conditions.push(eq(products.categoryId, options.categoryId));
    }
    
    if (options.featured) {
      conditions.push(eq(products.featured, 1));
    }
    
    if (options.search) {
      conditions.push(
        sql`(${products.name} ILIKE ${`%${options.search}%`} OR ${products.description} ILIKE ${`%${options.search}%`})`
      );
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // Apply pagination if provided
    if (options.limit) {
      query = query.limit(options.limit);
      
      if (options.offset !== undefined) {
        query = query.offset(options.offset);
      }
    }
    
    return await query;
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.slug, slug));
    return result[0];
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values({
        ...insertProduct,
        description: insertProduct.description || null,
        discountedPrice: insertProduct.discountedPrice || null,
        featured: insertProduct.featured || null,
        inStock: insertProduct.inStock || null,
        rating: insertProduct.rating || null,
        badges: insertProduct.badges || null,
        gallery: insertProduct.gallery || null
      })
      .returning();
    return product;
  }
  
  async updateProduct(id: number, updateProduct: Partial<InsertProduct>): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set(updateProduct)
      .where(eq(products.id, id))
      .returning();
    return product;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    const result = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id });
    return result.length > 0;
  }
  
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0];
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values({
        ...insertCategory,
        description: insertCategory.description || null,
        imageUrl: insertCategory.imageUrl || null
      })
      .returning();
    return category;
  }
  
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    // Remove createdAt from data since it's set by defaultNow() in the schema
    const { createdAt, ...inquiryData } = insertInquiry as any;
    
    const [inquiry] = await db
      .insert(inquiries)
      .values({
        ...inquiryData,
        phone: inquiryData.phone || null,
        company: inquiryData.company || null,
        interest: inquiryData.interest || null
      })
      .returning();
    return inquiry;
  }
  
  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  }
  
  async initializeData(): Promise<void> {
    // Check if we already have data
    const existingCategories = await this.getCategories();
    if (existingCategories.length > 0) {
      console.log("Database already contains data, skipping initialization");
      return;
    }
    
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
    const createdCategories = [];
    for (const cat of categoriesData) {
      const category = await this.createCategory(cat);
      createdCategories.push(category);
    }
    
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
    for (const prod of productsData) {
      await this.createProduct(prod);
    }
  }
}

export const storage = new DatabaseStorage();
