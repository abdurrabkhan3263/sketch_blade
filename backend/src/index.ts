import server from "./server";
import connectDB from "./db/mongoClient";

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
