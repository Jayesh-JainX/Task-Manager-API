export interface Task {
  id: string;
  userId: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
