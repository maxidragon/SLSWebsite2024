import { getToken } from "./auth";

const BACKEND_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:5000";

export const WCA_ORIGIN = "https://www.worldcubeassociation.org";
export const WCA_LIVE_ORIGIN = "https://live.worldcubeassociation.org";

export const backendRequest = (
  path: string,
  method: string,
  useAuth: boolean,
  body?: unknown,
) => {
  const token = getToken();
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  if (token && useAuth) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  return fetch(`${BACKEND_URL}/${path}`, {
    method: method,
    headers: headers,
    redirect: "follow",
    body: JSON.stringify(body),
  });
};
export const wcaApiRequest = (path: string) => {
  return fetch(`${WCA_ORIGIN}/api/v0/${path}`);
};