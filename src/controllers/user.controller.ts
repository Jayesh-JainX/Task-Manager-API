import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "GA5WmtRQ0mrGh5VN4ehSriO4wO/awD1RWOtibkq79WcA/Ik0FTFXZXYcNhCPOWtoqo6SvCbDiFN2eKgv2fp+ag==";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password }])
      .select();

    if (error) throw error;

    res.status(201).json({ message: "User registered", data });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ id: data.id, email: data.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
