import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "GA5WmtRQ0mrGh5VN4ehSriO4wO/awD1RWOtibkq79WcA/Ik0FTFXZXYcNhCPOWtoqo6SvCbDiFN2eKgv2fp+ag==";

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description, userId, status = "pending" } = req.body;

    // Validate user existence
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .single();
    if (userError || !userData) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    // Prevent duplicate task title for the same user
    const { data: duplicateTasks } = await supabase
      .from("tasks")
      .select("*")
      .eq("title", title)
      .eq("user_id", userId);

    if (duplicateTasks && duplicateTasks.length > 0) {
      res.status(409).json({ message: "Duplicate task title for this user" });
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          description,
          user_id: userId,
          status,
          completed_at: status === "done" ? new Date().toISOString() : null,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "Task created", data });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.query;

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(200).json(data);
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  const updateData: any = { status };
  if (status === "done") {
    updateData.completed_at = new Date().toISOString();
  } else {
    updateData.completed_at = null;
  }

  const { error } = await supabase
    .from("tasks")
    .update(updateData)
    .eq("id", id);

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(200).json({ message: "Task updated" });
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) {
    res.status(500).json({ message: error.message });
    return;
  }

  res.status(200).json({ message: "Task deleted" });
};

// Scheduled job: auto-close in-progress tasks older than 2 hours
import cron from "node-cron";

export const scheduleTaskAutoClose = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      // Runs every hour at minute 0
      const now = new Date();
      now.setHours(now.getHours() - 2); // Safely subtract 2 hours

      const twoHoursAgo = now.toISOString();

      const { error } = await supabase
        .from("tasks")
        .update({ status: "done", completed_at: new Date().toISOString() })
        .lt("updated_at", twoHoursAgo)
        .eq("status", "in-progress");

      if (error) {
        console.error("Error auto-closing tasks:", error.message);
      } else {
        console.log("Auto-closed tasks older than 2 hours.");
      }
    } catch (err) {
      console.error("Error during auto-close task scheduling:", err);
    }
  });
};

// JWT Middleware for protected routes
export const authenticateJWT = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }
    (req as any).user = user;
    next();
  });
};
