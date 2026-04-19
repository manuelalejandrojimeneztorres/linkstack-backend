import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./router";
import { connectToDatabase } from "./config/db";
import { corsConfig } from "./config/cors";

connectToDatabase();

const app = express();

// Cors
app.use(cors(corsConfig));

// Read form data
app.use(express.json());

app.use("/", router);

export default app;
