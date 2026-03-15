import { redis } from "./redisClient.ts";

export async function createVectorIndex() {
  try {
    await redis.ft.create(
      "idx:queries",
      {
        query: {
          type: "TEXT",
        },
        embedding: {
          type: "VECTOR",
          ALGORITHM: "HNSW",
          TYPE: "FLOAT32",
          DIM: 384,
          DISTANCE_METRIC: "COSINE",
        },
      },
      {
        ON: "HASH",
        PREFIX: "query:",
      }
    );

    console.log("✅ Redis vector index created");
  } catch (err) {
    console.log("Index may already exist");
  }
}