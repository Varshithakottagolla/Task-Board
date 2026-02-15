import { describe, it, expect } from "vitest";
import { validateCredentials } from "@/lib/auth";

describe("validateCredentials", () => {
  it("returns null for valid credentials", () => {
    expect(validateCredentials("intern@demo.com", "intern123")).toBeNull();
  });

  it("returns error for wrong email", () => {
    expect(validateCredentials("wrong@email.com", "intern123")).toBe("Invalid email or password.");
  });

  it("returns error for wrong password", () => {
    expect(validateCredentials("intern@demo.com", "wrong")).toBe("Invalid email or password.");
  });

  it("returns error for empty email", () => {
    expect(validateCredentials("", "intern123")).toBe("Email is required.");
  });

  it("returns error for empty password", () => {
    expect(validateCredentials("intern@demo.com", "")).toBe("Password is required.");
  });
});
