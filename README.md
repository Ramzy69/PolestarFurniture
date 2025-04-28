
# Polestar Furniture - Office Furniture E-commerce

A modern e-commerce platform for premium office furniture built with React, Express, and TypeScript.

## Features

- 🛍️ Browse and search office furniture products
- 🛒 Shopping cart functionality
- 🌓 Dark/Light theme support
- 📱 Responsive design
- 🔍 Advanced product filtering
- 💳 Product categories and featured items
- 📞 Contact form with inquiry system
- 🎨 Modern UI with Tailwind CSS and Shadcn UI

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn UI Components
  - React Query
  - Framer Motion
  - Wouter (Router)

- Backend:
  - Express.js
  - TypeScript
  - Drizzle ORM
  - PostgreSQL (via Neon)

## Getting Started

1. Fork the project on Replit
2. The project will automatically install dependencies

### Environment Variables

Create the following environment variables in the Secrets tab:

- `DATABASE_URL`: Your PostgreSQL connection string

### Running the Project

1. Click the "Run" button in Replit
2. The development server will start at port 5000
3. The client application will be available at your Repl's URL

## Project Structure

```
├── client/            # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── App.tsx
├── server/            # Backend Express application
│   ├── db.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── index.ts
└── shared/            # Shared TypeScript types
    └── schema.ts
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/categories` - Get all categories
- `POST /api/inquiries` - Submit an inquiry

## Deployment

1. Open the "Deployment" tab in your Replit workspace
2. Click "Deploy" to publish your changes
3. Your app will be available at your Repl's deployment URL

## Contributing

1. Fork the project on Replit
2. Create your feature branch
3. Commit your changes
4. Push to your fork
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
