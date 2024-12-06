import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const server = createServer(app);

// Middleware

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
  })
);

// Routes
import svixRouter from "./routes/svix.route";

app.use("/api", svixRouter);

export { app };
export default server;
