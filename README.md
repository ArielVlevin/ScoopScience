# 🍦 Ice Cream Recipe & Calculator Site

This project is a full-stack application that allows users to browse, create, and calculate ice cream recipes. It includes features such as user authentication, recipe management, ingredient calculation, and a rating system.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)
5. [Usage](#usage)
6. [API Documentation](#api-documentation)
7. [Environment Variables](#environment-variables)
8. [Contributing](#contributing)
9. [License](#license)

## Project Structure

```
project-root/
├── backend/
│   ├── assets/
│   │   ├── ingredients/          # Image assets for ingredients
│   │   └── uploads/              # Folder for user-uploaded files
│   ├── src/
│   │   ├── app.js                # Main Express app setup
│   │   ├── config/               # Configuration files (e.g., database, environment)
│   │   ├── controllers/          # Request handler functions for the API
│   │   ├── database/             # Database connection and related utilities
│   │   ├── middleware/           # Express middleware functions (e.g., authentication, logging)
│   │   ├── models/               # Mongoose schemas and models
│   │   ├── routes/               # API route definitions
│   │   ├── server.js             # Entry point to start the server
│   │   └── services/             # Business logic and helper functions
│   ├── package.json              # Node.js dependencies and scripts
│   └── package-lock.json         # Exact versions of installed dependencies
└── frontend/
    ├── public/
    │   └── index.html            # Main HTML file for the frontend
    ├── src/
    │   ├── App.css               # Global CSS styles for the frontend
    │   ├── App.tsx               # Main React component
    │   ├── assets/               # Static assets like images, fonts, etc.
    │   ├── auth/                 # Authentication-related components and logic
    │   ├── components/           # Reusable React components
    │   ├── config/               # Configuration files (e.g., API endpoints)
    │   ├── contexts/             # React context providers for global state management
    │   ├── features/             # Feature-specific components and logic (e.g., recipes, ingredients)
    │   ├── hooks/                # Custom React hooks
    │   ├── layouts/              # Layout components for different pages
    │   ├── main.tsx              # Entry point for the React application
    │   ├── pages/                # Page components for different routes (e.g., Home, Dashboard)
    │   ├── services/             # API calls and data fetching logic
    │   ├── types/                # TypeScript types and interfaces
    │   ├── utils/                # Utility functions and helpers
    │   ├── vite-env.d.ts         # Vite environment variables type declarations
    ├── package.json              # Node.js dependencies and scripts
    ├── package-lock.json         # Exact versions of installed dependencies
    ├── postcss.config.js         # PostCSS configuration (for processing CSS)
    ├── tailwind.config.js        # Tailwind CSS configuration
    ├── tsconfig.json             # TypeScript configuration for the project
    ├── vite.config.ts            # Vite configuration file (bundler)
```

## Features

- **User Authentication:** Users can register, log in, and manage their profiles.
- **Recipe Management:** Create, edit, view, and delete recipes.
- **Ingredient Calculator:** Calculate ingredient amounts based on specific recipe parameters.
- **Favorites:** Users can save their favorite recipes for easy access.
- **Rating System:** Users can rate recipes and see average ratings.
- **Responsive Design:** The frontend is fully responsive and mobile-friendly.

## Tech Stack

### Frontend
- **React.js** with **TypeScript**
- **TailwindCSS** for styling
- **React Router** for navigation
- **@tanstack/react-query** for data fetching and caching
- **Axios** for API requests

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** for database management
- **JSON Web Tokens (JWT)** for authentication
- **bcrypt.js** for password hashing

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js** (version 14.x or above)
- **npm** or **yarn**
- **MongoDB** (local instance or cloud-based)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/ice-cream-recipe-calculator.git
   cd ice-cream-recipe-calculator
   ```

2. **Install frontend dependencies:**

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**

   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

1. **Start the MongoDB server:**

   Ensure MongoDB is running locally or connect to your MongoDB Atlas instance.

2. **Run the backend:**

   ```bash
   cd backend
   npm run dev
   ```

   The backend will be running on `http://localhost:3000`.

3. **Run the frontend:**

   Open a new terminal window:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will be running on `http://localhost:5173`.

## Usage

- **Register/Login:** Create a new account or log in with existing credentials.
- **Browse Recipes:** Explore a variety of ice cream recipes on the homepage.
- **Create a Recipe:** Use the "Create Recipe" option to add your custom recipes.
- **Calculate Ingredients:** Use the ingredient calculator to adjust the recipe quantities.
- **Favorite Recipes:** Save your favorite recipes for later.
- **Rate Recipes:** Share your feedback by rating recipes.

## API Documentation

### Authentication
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Log in a user and return a JWT.

### Recipes
- **GET /api/recipes:** Retrieve all recipes.
- **GET /api/recipes/:id:** Retrieve a single recipe by ID.
- **POST /api/recipes:** Create a new recipe.
- **PUT /api/recipes/:id:** Update an existing recipe.
- **DELETE /api/recipes/:id:** Delete a recipe by ID.

### Favorites
- **POST /api/favorites/add:** Add a recipe to user's favorites.
- **DELETE /api/favorites/delete/:recipe_id:** Remove a recipe from user's favorites.

## Environment Variables

Create a `.env` file in the `backend` directory and add the following:

```plaintext
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=3000
```

Ensure that `.env` files are listed in `.gitignore` to avoid exposing sensitive information.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
