import mongoose from "mongoose";
import { MONGO_NAME } from "../lib/constants";

const connectDB = async () => {
  try {
    const uri = `${process.env.MONGODB_URL}/${MONGO_NAME}/?authSource=admin`;
    await mongoose.connect(uri, {
      dbName: MONGO_NAME,
    });
    console.log(`\n MongoDb connected !! DB URL: ${uri}`);
  } catch (error) {
    console.error("MONGODB CONNECT ERROR:- ", error);
    process.exit(1);
  }
};

export default connectDB;
