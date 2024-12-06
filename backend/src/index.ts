import server from "./server";
import { app } from "./server";
import errorMiddleware from "./middlewares/error.middleware";
import connectDB from "./db/mongoClient";

// Middleware for handling errors
app.use(errorMiddleware as any);

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} 🚀 || http://localhost:${PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error("MONGODB CONNECT ERROR:- ", error);
    process.exit(1);
  });
