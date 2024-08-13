Here's a comprehensive README template for your ice cream recipe and calculator site, covering both the frontend and backend aspects:

---

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
├── frontend/             # React.js frontend code
│   ├── public/           # Static assets
│   ├── src/              # Source code
│   │   ├── components/   # Reusable UI components
│   │   ├── features/     # Feature-specific components and logic
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Application pages
│   │   ├── services/     # API service calls
│   │   ├── contexts/     # Context API for global state management
│   │   ├── styles/       # Global styles and TailwindCSS configuration
│   │   ├── App.tsx       # Main application component
│   │   └── index.tsx     # Entry point
│   └── package.json      # Frontend dependencies and scripts
├── backend/              # Express.js backend code
│   ├── src/              # Source code
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic services
│   │   ├── utils/        # Utility functions
│   │   ├── middleware/   # Express middleware
│   │   ├── config/       # Configuration files
│   │   ├── db.js         # MongoDB connection setup
│   │   ├── app.js        # Express app setup
│   │   └── server.js     # Server entry point
│   └── package.json      # Backend dependencies and scripts
├── .gitignore            # Git ignore file
└── README.md             # Project documentation
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

---

This README provides a clear overview of your project, helping others understand the structure, features, and how to get started. Customize it further as needed!
