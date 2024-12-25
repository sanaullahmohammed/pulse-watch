# Frontend of Pulse Watch - Plivo Hiring Assignment

## Prerequisites

Before beginning the setup process, ensure your development environment meets these requirements:

- Node.js (version 18 or higher)
- npm (Node Package Manager)
- Git

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend
```

2. Install project dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`

## Project Structure

The application follows a structured organization:

```
frontend/
├── src/
│   ├── assets/          # Static assets and resources
│   ├── common/          # Shared utilities and components
│   ├── components/
│   │   ├── Auth/        # Authentication components
│   │   ├── Dashboard/   # Dashboard interface elements
│   │   ├── Incidents/   # Incident management components
│   │   ├── Navbar/      # Navigation components
│   │   ├── PublicStatusPage/  # Public-facing status page
│   │   ├── Services/    # Service management components
│   │   ├── Team/        # Team management interface
│   │   ├── TeamMembers/ # Team member management
│   │   └── ui/          # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── lib/            # Utility functions and helpers
│   └── types/          # TypeScript type definitions
├── public/             # Public assets
├── App.css             # Global styles
├── App.tsx             # Root application component
└── index.css          # Entry-point styles
```

## Technology Stack

The application is built using modern web technologies:

- React 18: Frontend framework
- TypeScript: Static typing and enhanced developer experience
- Vite: Build tool and development server
- TailwindCSS: Utility-first CSS framework
- ShadcnUI: Component library for consistent design
- React Router DOM: Client-side routing
- React Hook Form: Form handling and validation
- Lucide React: Icon library

## Available Scripts

The following npm scripts are available for development and deployment:

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run lint     # Run ESLint for code quality
npm run preview  # Preview production build locally
```

## Development Guidelines

When contributing to the project, please follow these practices:

1. Write clean, maintainable code with appropriate comments
2. Follow the established project structure
3. Maintain TypeScript types for all components and functions
4. Use ShadcnUI components for consistent styling
5. Test your changes thoroughly before submitting

## Build and Deployment

To prepare the application for production:

1. Create a production build:

```bash
npm run build
```

2. Test the production build locally:

```bash
npm run preview
```

The production files will be generated in the `dist` directory.
