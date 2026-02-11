import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 20 },   // naik ke 20 user
    { duration: "1m", target: 50 },    // naik ke 50 user
    { duration: "30s", target: 0 },    // turun
  ],
  thresholds: {
    http_req_duration: ["p(95)<800"], // p95 harus < 800ms
    http_req_failed: ["rate<0.01"],   // error <1%
  },
};

export default function () {
  const res = http.get("https://elysia-bun-backendshopeeclone-production.up.railway.app/api/products?page=1&limit=10");

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 600ms": (r) => r.timings.duration < 600,
  });

  sleep(1);
}