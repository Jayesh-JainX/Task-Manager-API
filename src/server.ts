import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { scheduleTaskAutoClose } from "./controllers/task.controller.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();
app.use(cors());
app.use(express.json());
setupSwagger(app);

// Routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

// Start cron job for auto-closing tasks
scheduleTaskAutoClose();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
