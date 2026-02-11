import { Elysia } from "elysia";
import { gzipSync, deflateSync } from "node:zlib";

export const compression = new Elysia({ name: "compression" })
  .onAfterHandle(async ({ response, request, set }) => {
    // Skip compression untuk response kecil atau non-JSON
    if (!response || typeof response !== "object") {
      return response;
    }

    const acceptEncoding = request.headers.get("accept-encoding") || "";
    
    // Convert response to JSON string
    const jsonString = JSON.stringify(response);
    const originalSize = Buffer.byteLength(jsonString);

    // Skip compression jika data kecil (< 1KB)
    if (originalSize < 1024) {
      return response;
    }

    // Gzip compression
    if (acceptEncoding.includes("gzip")) {
      const compressed = gzipSync(jsonString);
      set.headers["content-encoding"] = "gzip";
      set.headers["content-type"] = "application/json";
      set.headers["x-original-size"] = originalSize.toString();
      set.headers["x-compressed-size"] = compressed.length.toString();
      return new Response(compressed);
    }

    // Deflate compression
    if (acceptEncoding.includes("deflate")) {
      const compressed = deflateSync(jsonString);
      set.headers["content-encoding"] = "deflate";
      set.headers["content-type"] = "application/json";
      set.headers["x-original-size"] = originalSize.toString();
      set.headers["x-compressed-size"] = compressed.length.toString();
      return new Response(compressed);
    }

    return response;
  });
