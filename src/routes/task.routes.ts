import { Router } from "express";
import {
  createTask,
  getUserTasks,
  updateTaskStatus,
  deleteTask,
  authenticateJWT,
} from "../controllers/task.controller.js";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         userId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, in-progress, done]
 *           default: pending
 *
 * paths:
 *   /tasks:
 *     post:
 *       summary: Create a new task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       responses:
 *         201:
 *           description: Task created successfully
 *         400:
 *           description: Invalid input or user does not exist
 *         409:
 *           description: Duplicate task title for user
 *         401:
 *           description: Unauthorized - missing or invalid token
 *
 *     get:
 *       summary: Get all tasks for a user
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: query
 *           name: userId
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: List of tasks
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Task'
 *         401:
 *           description: Unauthorized - missing or invalid token
 *         500:
 *           description: Server error
 *
 *   /tasks/{id}/status:
 *     patch:
 *       summary: Update task status
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [pending, in-progress, done]
 *       responses:
 *         200:
 *           description: Task status updated
 *         401:
 *           description: Unauthorized - missing or invalid token
 *         500:
 *           description: Server error
 *
 *   /tasks/{id}:
 *     delete:
 *       summary: Delete a task
 *       tags: [Tasks]
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Task deleted
 *         401:
 *           description: Unauthorized - missing or invalid token
 *         500:
 *           description: Server error
 */

router.post("/tasks", authenticateJWT, createTask);
router.get("/tasks", authenticateJWT, getUserTasks);
router.patch("/tasks/:id/status", authenticateJWT, updateTaskStatus);
router.delete("/tasks/:id", authenticateJWT, deleteTask);

export default router;
