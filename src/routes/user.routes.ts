import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *
 * paths:
 *   /users:
 *     post:
 *       summary: Register a new user
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         201:
 *           description: User registered successfully
 *         400:
 *           description: Invalid input - email already exists or invalid format
 *
 *   /login:
 *     post:
 *       summary: Login with user credentials
 *       tags: [Users]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   token:
 *                     type: string
 *                     description: JWT token for authentication
 *         401:
 *           description: Invalid credentials
 *         400:
 *           description: Invalid input format
 */

router.post("/users", registerUser);
router.post("/login", loginUser);

export default router;
