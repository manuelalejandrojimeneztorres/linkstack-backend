import colors from "colors";
import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }

    const { connection } = await mongoose.connect(process.env.MONGODB_URI);
    const url = `${connection.host}:${connection.port}`;

    console.log(
      colors.bgBlue.green.bold(
        "Successfully connected to MongoDB database at " + url
      )
    );
  } catch (error) {
    console.error(
      colors.bgRed.white.bold("Error connecting to MongoDB database:"),
      error
    );
  }
};
