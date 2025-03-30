import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

dotenv.config();

const app = express();

//mongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description: "API documentation for the Social Media Platform",
    },
    servers: [
      {
        url: "http://47.236.113.174:8800/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
  origin: '*', // allow all origins
}));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});