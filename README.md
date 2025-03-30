# Social Media Platform

This is a full-stack social media platform built with React, Node.js, Express, and MongoDB.
The application provides core social functionalities such as user authentication, post management, and user interactions.

## Features

- **User Authentication**: Users can register, log in, and manage their profiles.
- **Post Management**: Users can create, edit, search, and delete posts.
- **Interactions**: Users can like and dislike posts.
- **API Documentation**: Comprehensive API documentation is available using Swagger.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **HTTP Requests**: Axios
- **API Testing**: Postman
- **Documentation**: Swagger

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Social-Media-Platform.git

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd Social-Media-Platform/node-rest-api
   npm install

3. Set up your MongoDB database and configure your environment variables (.env)

4. Start the backend server
   To keep the service running continuously and not dependent on the terminal, you can use pm2
   
   ```bash
   npm run dev
   
   pm2 start index.js

5. Navigate to the frontend directory and install dependencies:
   
   ```bash
   cd Social-Media-Platform/social-media-platform
   npm install

6. Start the frontend development server:
   
   ```bash
   npm run dev
