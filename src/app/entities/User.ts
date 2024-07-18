export interface User {
  name: string;
  email: string;
  role: "ADMIN" | "FREE" | "PREMIUM";
}
