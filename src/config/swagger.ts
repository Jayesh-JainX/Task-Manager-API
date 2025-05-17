import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

// Resolve the current directory in ES Module context
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Define the Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI version
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for the task management system",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // Local server URL
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.ts")], // Use dynamic path resolution for TypeScript files
};

const swaggerSpec = swaggerJsdoc(options);

// Setup Swagger UI
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
