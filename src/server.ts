import express from "express";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import { scheduleTaskAutoClose } from "./controllers/task.controller";
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(express.json());
setupSwagger(app);

// Routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

// Start cron job for auto-closing tasks
scheduleTaskAutoClose();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { app };
