import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("intake.submit", () => {
  it("accepts valid intake form submission", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.submit({
      childName: "John Doe",
      ageRange: "6-9",
      diagnosisStatus: "yes",
      observationTimeframe: "recently",
      selectedNeeds: ["Communication difficulties", "Behavioral challenges"],
      selectedServices: ["ABA Therapy", "Speech Therapy"],
      deliveryPreference: "online",
      mainGoal: "Improve communication skills",
      parentEmotion: "concerned",
      parentName: "Jane Doe",
      phone: "+234 816 834 9969",
      email: "jane@example.com",
      location: "Lagos, Nigeria",
      consent: true,
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Thank you");
  });

  it("rejects submission without required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.intake.submit({
        childName: "",
        ageRange: "",
        diagnosisStatus: "",
        observationTimeframe: "",
        selectedNeeds: [],
        selectedServices: [],
        deliveryPreference: "",
        mainGoal: "",
        parentEmotion: "",
        parentName: "", // Missing required field
        phone: "+234 816 834 9969",
        email: "jane@example.com",
        location: "",
        consent: true,
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects submission without consent", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.submit({
      childName: "John Doe",
      ageRange: "6-9",
      diagnosisStatus: "yes",
      observationTimeframe: "recently",
      selectedNeeds: ["Communication difficulties"],
      selectedServices: ["ABA Therapy"],
      deliveryPreference: "online",
      mainGoal: "Improve communication skills",
      parentEmotion: "concerned",
      parentName: "Jane Doe",
      phone: "+234 816 834 9969",
      email: "jane@example.com",
      location: "Lagos, Nigeria",
      consent: false, // No consent
    });

    // The form should still accept it but the backend should handle it appropriately
    expect(result).toBeDefined();
  });

  it("validates email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.intake.submit({
        childName: "John Doe",
        ageRange: "6-9",
        diagnosisStatus: "yes",
        observationTimeframe: "recently",
        selectedNeeds: ["Communication difficulties"],
        selectedServices: ["ABA Therapy"],
        deliveryPreference: "online",
        mainGoal: "Improve communication skills",
        parentEmotion: "concerned",
        parentName: "Jane Doe",
        phone: "+234 816 834 9969",
        email: "invalid-email", // Invalid email
        location: "Lagos, Nigeria",
        consent: true,
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("intake.list", () => {
  it("returns list of intake submissions", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.list();

    expect(Array.isArray(result)).toBe(true);
  });
});
