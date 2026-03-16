import express from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import resarchRoutes from "./routes/resarchRoutes.ts";
import { connectRedis } from "./db/redisClient.ts";
import { createVectorIndex } from "./db/createIndex.ts";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/v1/api", resarchRoutes);

(async function startServer() {
  try {
    await connectRedis();
    console.log("✅ Redis connected");

    await createVectorIndex();
    console.log("✅ Vector index created");

    server.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  } catch (error) {
    console.error("❌ Failed to start server", error);
  }
})();