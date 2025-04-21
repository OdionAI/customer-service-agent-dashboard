// lib/api.ts
import axios from "axios";

const staging_url =
  "https://odion-agent-dashboard-staging-855087577261.us-central1.run.app";

// const local_url =process.env.NEXT_PUBLIC_API_URL_LOCAL

const api = axios.create({
  baseURL: staging_url, // uses the environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
