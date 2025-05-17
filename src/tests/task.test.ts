import request from "supertest";
import app from "../server.js";

describe("User and Task API Endpoints", () => {
  let userId: string;
  let taskId1: string;
  let taskId2: string;
  let jwtToken: string;

  const uniqueSuffix = Date.now();
  const testEmail = `testuser+${uniqueSuffix}@example.com`;
  const testPassword = "password123";

  // Increase timeout for registration
  it("POST /api/users - Register the user and obtain JWT", async () => {
    // Register the user
    const registerRes = await request(app)
      .post("/api/users")
      .send({ email: testEmail, password: testPassword });

    // Log error details if registration fails
    if (registerRes.status !== 201) {
      console.error("Registration failed:", registerRes.body);
    }

    expect(registerRes.status).toBe(201);
    expect(registerRes.body.message).toBe("User registered");

    // Extract user ID
    userId = registerRes.body.data[0].id;
    expect(userId).toBeDefined();
    console.log("New User ID:", userId);

    // Login to get JWT token
    const loginRes = await request(app)
      .post("/api/login")
      .send({ email: testEmail, password: testPassword });

    // Log error details if login fails
    if (loginRes.status !== 200) {
      console.error("Login failed:", loginRes.body);
    }

    expect(loginRes.status).toBe(200);
    jwtToken = loginRes.body.token;
    expect(jwtToken).toBeDefined();
    console.log("JWT Token:", jwtToken);
  });

  // Test creating the first task
  it("POST /api/tasks - Create first task for the user", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({
        title: "First Task",
        description: "This is the first task",
        userId,
        status: "pending",
      });

    // Log error details if task creation fails
    if (res.status !== 201) {
      console.error("Task creation failed:", res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Task created");
    taskId1 = res.body.data[0].id;
    expect(taskId1).toBeDefined();
    console.log("First Task ID:", taskId1);
  });

  // Test creating the second task
  it("POST /api/tasks - Create second task for the user", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({
        title: "Second Task",
        description: "This is the second task",
        userId,
        status: "pending",
      });

    // Log error details if task creation fails
    if (res.status !== 201) {
      console.error("Task creation failed:", res.body);
    }

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Task created");
    taskId2 = res.body.data[0].id;
    expect(taskId2).toBeDefined();
    console.log("Second Task ID:", taskId2);
  });

  // Test retrieving all tasks for the user
  it("GET /api/tasks?userId= - Get all tasks for the user", async () => {
    const res = await request(app)
      .get(`/api/tasks?userId=${userId}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    // Log error details if fetching tasks fails
    if (res.status !== 200) {
      console.error("Fetching tasks failed:", res.body);
    }

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
    console.log("Tasks retrieved:", res.body);
  });

  // Test updating the status of the first task to "in-progress"
  it("PATCH /api/tasks/:id/status - Update status to 'in-progress'", async () => {
    const res = await request(app)
      .patch(`/api/tasks/${taskId1}/status`)
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({ status: "in-progress" });

    // Log error details if updating task status fails
    if (res.status !== 200) {
      console.error("Updating task status failed:", res.body);
    }

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task updated");
    console.log("Updated Task ID to 'in-progress':", taskId1);
  });

  // Test deleting the second task
  it("DELETE /api/tasks/:id - Delete second task", async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId2}`)
      .set("Authorization", `Bearer ${jwtToken}`);

    // Log error details if deletion fails
    if (res.status !== 200) {
      console.error("Task deletion failed:", res.body);
    }

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Task deleted");
    console.log("Deleted Task ID:", taskId2);
  });
});
