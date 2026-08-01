import { http, HttpResponse } from "msw";
import type { LoginPayload, LoginResponse } from "@/DAL/auth";
import { BASE_PATH, LOGIN_PATH } from "@/DAL/const";
import type { User } from "@/models";

export const handlers = [
  http.get(`${BASE_PATH}/health`, () => HttpResponse.json({ status: "ok" })),
  http.post(LOGIN_PATH, async ({ request }) => {
    const { email } = (await request.json()) as LoginPayload;
    const user: User = { id: "1", name: "Admin", email, role: "ADMIN" };
    const response: LoginResponse = { user, token: "mock-token" };
    return HttpResponse.json(response);
  }),
];
