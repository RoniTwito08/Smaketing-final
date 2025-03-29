//adam ben david 208298257
//aviv menahem 212292197
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import express, { Express } from "express";
import http from "http";
import postsRoutes from "./routes/posts_routes";
import commentsRoutes from "./routes/comments_routes";
import usersRoutes from "./routes/users_routes";
import authRoutes from "./routes/auth_routes";
import chatRoutes from "./routes/chat_routes";
import geminiRoutes from "./routes/gemini_routes";
import businessInfoRoutes from "./routes/businessInfo_routes";
import LandingPageGeneratorRoutes from "./routes/landing_page_builder_routes";
import CampaignRoutes from './routes/campaign_routes'
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import { initializeSocket } from "./socket";
import marketingRoutes from "./routes/marketingAnalysis_routes";
import fs from 'fs';

const app = express();
const httpServer = http.createServer(app);

const initApp = (): Promise<Express> => {
  const isProduction =
    process.env.NODE_ENV?.trim().toLowerCase() === "production";

  // CORS configuration
  app.use(
    cors({
      origin: isProduction
        ? "https://node10.cs.colman.ac.il"
        : ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  //הגדלת הגודל שאפשר להעביר בבקשות (עשינו בשביל העברת התמונות לגימיני)
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/posts", postsRoutes);
  app.use("/comments", commentsRoutes);
  app.use("/users", usersRoutes);
  app.use("/auth", authRoutes);
  app.use("/gemini", geminiRoutes);
  app.use("/business-info", businessInfoRoutes);
  app.use("/marketing", marketingRoutes);
  
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
  app.use("/landing-page-generator",LandingPageGeneratorRoutes);
  app.use('/api/pexels_images', express.static(path.join(__dirname, 'pexels_images')));
  app.use('/api/campaigns', CampaignRoutes);
  
  app.use(
    "/uploads/profile_pictures",
    express.static(path.join(__dirname, "../uploads/profile_pictures"))
  );
  app.use(
    "/uploads/post_images",
    express.static(path.join(__dirname, "../uploads/post_images"))
  );
  app.use(
    "/uploads/business_pictures",
    express.static(path.join(__dirname, "../uploads/business_pictures"))
  );

  app.use("/images", express.static(path.join(__dirname, "../images")));

  // example for a photo location:
  app.use("/chat", chatRoutes);
  app.use("/uploads", express.static("uploads"));
  app.use("/test", express.static("."));

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Web Dev 2025 REST API",
        version: "1.0.0",
        description: "REST server including authentication using JWT",
      },
      servers: [
        {
          url: isProduction
            ? "https://node10.cs.colman.ac.il"
            : "http://localhost:3000",
          description: isProduction
            ? "Production server"
            : "Development server",
        },
      ],
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  // Add a redirect from root to api-docs
  app.get("/", (req, res) => {
    res.redirect("/api-docs");
  });

  return new Promise<Express>((resolve, reject) => {
    if (!process.env.DB_CONNECT) {
      reject(new Error("DB_CONNECT is not defined in .env file"));
    } else {
      mongoose
        .connect(process.env.DB_CONNECT)
        .then(() => {
          // Initialize Socket.IO after DB connection
          const io = initializeSocket(httpServer);
          resolve(app);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
};

app.use('/dist', express.static(path.join(__dirname, '../frontend/dist')));
app.use('/src', express.static(path.join(__dirname, '../../Client/src')));
app.use('/static', express.static(path.join(__dirname, 'public')));

//save landing page fule in folder
app.post("/api/saveLandingPage", (req: any, res: any) => {
  const { html, userPrimaryColor, userSecondaryColor, userTertiaryColor, userTextColor, userFont } = req.body;
  if (!html) {
    return res.status(400).json({ error: "Missing HTML content" });
  }

  const completeHTML = `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="UTF-8">
                  <title>Landing Page</title>
                  <link rel="stylesheet" href="http://localhost:3000/dist/assets/index-uoALyoE3.css">
                  <style>
                    :root {
                      --primary-color: ${userPrimaryColor};
                      --secondary-color: ${userSecondaryColor};
                      --tertiary-color: ${userTertiaryColor};
                      --text-color: ${userTextColor};
                      --font: ${userFont};
                    }
                  </style>
                </head>
                <body>
                  ${html}
                </body>
              </html>
          `;

  const fileName = `landingPage-${Date.now()}.html`;
  const folderPath = path.join(__dirname, "landingPages");
  const filePath = path.join(folderPath, fileName);

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating folder:", err);
      return res.status(500).json({ error: "Server error" });
    }

    fs.writeFile(filePath, completeHTML, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).json({ error: "Server error" });
      }
      res.status(200).json({ message: "Landing page saved", file: fileName });
    });
  });
});

export { app, httpServer };
export default initApp;
