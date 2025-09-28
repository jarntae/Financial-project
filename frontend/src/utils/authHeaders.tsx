// src/utils/api.js
export const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
// export const apiUrl = "http://localhost:8080";
export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  const type = localStorage.getItem("token_type") || "Bearer";
  return {
    "Content-Type": "application/json",
    Authorization: `${type} ${token}`,
  };
}
