# Blog Application

The blog application allows users to create, manage, and view blog posts. Each blog post is associated with an author and may include additional features such as commenting, categories, and publishing dates.

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications.
- **Express.js** - Web framework for Node.js.
- **TypeScript** - JavaScript with type annotations.
- **MongoDB** - NoSQL database for data storage.
- **Mongoose** - MongoDB object modeling tool for Node.js.
- **ESLint** - Linter for identifying and fixing problems in JavaScript code.
- **Prettier** - Code formatter for maintaining consistent code style.

## Features
- User Authentication and Authorization
- Mongoose schema validation with proper error message
- Blog Management
- Search and Filtering on Blogs
## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed on your machine.
- **MongoDB** instance running locally or a cloud MongoDB database.

## Getting Started

Follow these steps to set up and run the project locally.

## 1. Clone the Repository

```bash
https://github.com/Al-amin07/backend_project_3
```

## 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

   ```bash
   cd backend_project_3
   npm install
   ```

## 3. Set Up Environment Variables
Create a .env file in the root of the project to store environment variables, such as MongoDB URI or any secret keys. Here’s an example:
```bash
PORT=6000
mongodb+srv://project3:c8S2MT1C3ONlIB9q@cluster0.pekpvn6.mongodb.net/project_3?retryWrites=true&w=majority&appName=Cluster0
```

## 4. Run the Project
- **Development Mode**
To start the project in development mode with hot reloading:
```bash
npm run start:dev
```
- **Production Mode**
If you prefer to run the project in production mode:
```bash
npm run build
npm run start
```
