import { redis } from "./redisClient.ts";

export async function storeCache(query: string, embedding: number[], result: any) {

  const key = `query:${Date.now()}`;

  await redis.hSet(key, {
    query,
    embedding: Buffer.from(Float32Array.from(embedding).buffer),
    result: JSON.stringify(result),
  });
}

export async function searchCache(embedding: number[]) {

  const results = await redis.ft.search(
    "idx:queries",
    "*=>[KNN 1 @embedding $vec AS score]",
    {
      PARAMS: {
        vec: Buffer.from(Float32Array.from(embedding).buffer),
      },
      SORTBY: "score",
      DIALECT: 2,
    }
  );

  if (results.total > 0) {
    const doc: any = results.documents[0];
    return JSON.parse(doc.value.result);
  }

  return null;
}