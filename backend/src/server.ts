import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userMiddleware from "./middlewares/user.middleware";
import { clerkMiddleware } from "@clerk/express";

dotenv.config();

const app = express();
const server = createServer(app);

// Middleware

app.use(clerkMiddleware());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  }),
);

// Routes
import svixRouter from "./routes/svix.route";
import folderRouter from "./routes/folder.route";
import fileRouter from "./routes/file.route";
import ErrorMiddleware from "./middlewares/error.middleware";
import ErrorHandler from "./utils/ErrorHandler";

app.use("/api", svixRouter);
app.use("/api/folder", folderRouter);
app.use("/api/file", fileRouter);

// Error Middleware
app.use(ErrorMiddleware);

export default server;
