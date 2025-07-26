import { queryClient } from "./http";

export function clearLocalStorage() {
  localStorage.clear();
}

export function isTokenValid() {
  const token = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiredAt");

  if (!token || !expiration) {
    queryClient.clear();
    return false
  };

  const now = Date.now();
  return now < parseInt(expiration, 10);
}
