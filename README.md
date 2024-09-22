# Disaster Management Web Application

This project is part of an assessment for a Software Engineer position. The objective is to develop a web application for disaster management, demonstrating focus, proficiency, and commitment. The application allows admin and volunteer users to manage crises, donations, volunteers, and inventory during disaster relief efforts.
Project Overview
Features

    Admin and volunteer user roles
    Crisis management (create, update, and resolve crises)
    Donation tracking and management
    Volunteer management (assigning tasks, organizing efforts)
    Inventory management for disaster relief resources

Note: This project is a work in progress and is not yet complete.
Technologies Used

    Backend: Express.js
    Database: PostgreSQL with Prisma ORM
    Authentication: JWT for user login and token refresh
    File Upload: Multer for handling image uploads (integrated with Cloudinary)
    Validation: Zod for schema validation
    Environment Management: dotenv for managing environment variables
    Encryption: bcrypt for password hashing

Prerequisites

Ensure you have the following installed on your machine:

    Node.js (v16.x or later)
    PostgreSQL (v13.x or later)

Installation

1. Clone the Repository

git clone git@github.com:Asaduzzama-n/disaster-management-backend.git
cd disaster-management-backend

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env file in the root directory and add the following environment variables:

env

NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:<pass>@localhost:5432/disaster-management?schema=public"
BCRYPT_SALT_ROUND=12
JWT_SECRET='secret'
JWT_EXPIRES_IN=50m
JWT_REFRESH_SECRET='refresh-secret'
JWT_REFRESH_EXPIRES_IN=20d

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Make sure to replace the database URL and Cloudinary credentials with your own.

4. Database Setup

   Ensure that PostgreSQL is running on your system.
   Run the Prisma migration to set up the database schema:

npx prisma migrate dev

5. Start the Application

npm start

The application will be available at http://localhost:5000.

Scripts

    npm start – Start the development server with live reloading.
    npx prisma migrate dev – Apply database migrations.
    npx prisma studio – Open Prisma Studio to manage database entries.

License

This project is licensed under the MIT License.
Acknowledgements

    Express.js
    Prisma ORM
    Zod
    Cloudinary

This project is still under development and subject to future updates.
