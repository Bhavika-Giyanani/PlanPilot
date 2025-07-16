import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "PlanPilot",
    description: "API Documentation for user and tasks APIs of PlanPilot",
  },
  host: "http://localhost:5000",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/authRoutes.js", "./routes/taskRoutes.js"];

swaggerAutogen(outputFile, routes, doc);
