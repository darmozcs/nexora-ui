import axios from "axios";

export const httpClient = axios.create({
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});
