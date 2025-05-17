// config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "API documentation for the task management system",
    },
    servers: [
      {
        url: "https://tickdone.vercel.app/api",
        description: "Production API Server",
      },
      {
        url: "/api",
        description: "Local API Server",
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
  apis: ["./dist/routes/*.js"], // Point to compiled JS files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Serve Swagger UI at /api-docs
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Task Management API Documentation",
      explorer: true,
      swaggerOptions: {
        url: "/api-docs/swagger.json",
        persistAuthorization: true,
      },
    })
  );

  // Serve swagger.json
  app.get("/api-docs/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
