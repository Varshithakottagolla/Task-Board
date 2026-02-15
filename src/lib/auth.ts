const VALID_EMAIL = "intern@demo.com";
const VALID_PASSWORD = "intern123";

export function validateCredentials(email: string, password: string): string | null {
  if (!email.trim()) return "Email is required.";
  if (!password) return "Password is required.";
  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) return "Invalid email or password.";
  return null; // success
}
