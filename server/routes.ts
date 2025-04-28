import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Get all categories
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });
  
  // Get category by slug
  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });
  
  // Get products (with optional filters)
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { 
        categoryId, 
        featured, 
        limit = 10, 
        page = 1,
        search
      } = req.query;
      
      const options: any = {};
      
      if (categoryId) {
        options.categoryId = Number(categoryId);
      }
      
      if (featured === "true") {
        options.featured = true;
      }
      
      if (search) {
        options.search = search.toString();
      }
      
      // Calculate offset for pagination
      const offset = (Number(page) - 1) * Number(limit);
      options.limit = Number(limit);
      options.offset = offset;
      
      const products = await storage.getProducts(options);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  
  // Get product by slug
  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const product = await storage.getProductBySlug(slug);
      
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  
  // Create inquiry
  app.post("/api/inquiries", async (req: Request, res: Response) => {
    try {
      // Validate request body (we don't need to add createdAt as it's handled by the database)
      const validatedData = insertInquirySchema.parse(req.body);
      
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
