import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import express from "express";
import connectToMongo from "./db.js";
import userRoutes from "./routes/UserRoutes.js";
import admin from "firebase-admin";

// Loading environment variables from .env file
env.config();

// Initialising Firebase admin SDK with service account credentials
const serviceAccount = {
  privateKey: process.env.FIREBASE_PRIVATE_KEY, // Firebase private key
  projectId: process.env.FIREBASE_PROJECT_ID, // Firebase project ID
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // Firebase client email
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialising Express App
const app = express();
// Enabling CORS middleware
app.use(cors());

// Middleware to compress responses
app.use(compression());
// Middleware to parse cookies
app.use(cookieParser());
// Middleware to parse JSON bodies of requests
app.use(bodyParser.json());

// Connecting to MongoDB
connectToMongo();

// Defining routes for user-related endpoints
app.use("/api/v1/user/", userRoutes);

// Starting the server
app.listen(8080, () => {
  console.log("Server running");
});

export { app, admin };
