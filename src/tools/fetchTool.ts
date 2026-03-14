import * as z from "zod";
import axios from "axios";
import * as cheerio from "cheerio";

export const fetchTool = {
  name: "fetch",
  description:
    "Fetch the content of a webpage and return the readable text",

  schema: z.object({
    url: z.string().url()
  }),

  func: async ({ url }: { url: string }) => {
    try {

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const html = response.data;

      const $ = cheerio.load(html);

      $("script, style, noscript").remove();

      const text = $("body").text();

      const cleaned = text
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 5000);   // token control

      return cleaned;

    } catch (error: unknown) {

      return `Error fetching data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;

    }
  }
};