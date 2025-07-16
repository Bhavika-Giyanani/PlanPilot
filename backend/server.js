import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import path from "path";

//^ Swagger API Documentation
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };

dotenv.config();
const _dirname = path.resolve();

connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("", userRoutes);
app.use("", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
