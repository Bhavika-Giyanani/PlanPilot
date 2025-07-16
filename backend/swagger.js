const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "PlanPilot",
    description: "API Documentation for user and tasks APIs of PlanPilot",
  },
  host: "https://planpilot-to1k.onrender.com",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/authRoutes.js", "./routes/taskRoutes.js"];

swaggerAutogen(outputFile, routes, doc);
