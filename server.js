import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/auth.routes.js";
import contentRoutes from "./src/routes/content.routes.js";
import progressRoutes from "./src/routes/progress.routes.js";
import levelRoutes from "./src/routes/level.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

import sessionRoutes from "./src/routes/session.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/levels", levelRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/session", sessionRoutes);


app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});