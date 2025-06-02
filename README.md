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

## Live Demo

  You can view a live demo of the application at: [Live Demo](http://47.236.113.174:5173/)
  
  *For testing, log in with the following account*
  
  Email: john@gmail.com
  Pwd: 123456

## API Documentation

   You can view the API documentation at: [Swagger UI](http://47.236.113.174:8800/api-docs)

## Pre-requests
  1. check node and npm
     ```bash
     node -v   npm -v
  node.js install: https://nodejs.org/en/download/
  
  2. create a project
     ```bash
     npx create-next-app@latest --javascript social-media-platform
  3. create backend
     https://medium.com/@ibrahimhz/creating-your-first-backend-with-node-js-step-by-step-guide-892769af4cb0
     remember to add "type": "module" into package.json file, otherwise we cannot use "import"
## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jiatongcherry/Social-Media-Platform.git

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd Social-Media-Platform/node-rest-api
   npm install

3. Set up your MongoDB database and configure your environment variables (.env)

4. Start the backend server:
   To keep the service running continuously and not dependent on the terminal, you can use pm2
   
   ```bash
   npm run dev
   
   pm2 start index.js

5. Navigate to the frontend directory and install dependencies:
   
   ```bash
   cd Social-Media-Platform/social-media-platform
   npm install

6. Start the frontend development server:
   To keep the service running continuously and not dependent on the terminal, you can use pm2
   
   ```bash
   npm run dev
   
   pm2 start ecosystem.config.cjs
