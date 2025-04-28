
# Polestar Furniture - Office Furniture E-commerce

A modern e-commerce platform for premium office furniture built with React, Express, and PostgreSQL.

## Features

- Modern responsive UI with dark/light theme support
- Product catalog with categories and search
- Product details with image gallery
- Contact form with inquiry system
- Admin dashboard for product management
- Database-driven content management

## Tech Stack

- Frontend: React + TypeScript + Vite
- UI Components: Shadcn UI + Tailwind CSS
- Backend: Express.js + TypeScript
- Database: PostgreSQL with Drizzle ORM
- State Management: TanStack Query
- Animations: Framer Motion

## Getting Started

### Prerequisites

- Node.js v20 or higher
- PostgreSQL database
- Git (for cloning)

### Development on Replit

1. Visit the project on Replit: [Polestar Furniture](https://replit.com/@username/project-name)
2. Fork the project using the "Fork" button
3. Set up your environment variables in the Secrets tab:
   - `DATABASE_URL`: Your PostgreSQL connection string
4. Click the "Run" button to start the development server
5. The app will be available at your Replit URL

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/username/project-name.git
cd project-name
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with:
```
DATABASE_URL=your_database_url_here
```

4. Start the development server:
```bash
npm run dev
```

The app will run on `http://0.0.0.0:5000`

## Deployment on Replit

1. Fork the project on Replit
2. Set up your environment variables in Secrets
3. Click "Deploy" in the top navigation
4. Choose "Deploy from Git"
5. Configure your deployment:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
6. Click "Deploy" to publish your app

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utility functions
│   │   └── pages/      # Page components
├── server/              # Backend Express application
│   ├── db.ts           # Database configuration
│   ├── routes.ts       # API routes
│   └── storage.ts      # Data access layer
└── shared/             # Shared types and schemas
```

## Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add YourFeature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
