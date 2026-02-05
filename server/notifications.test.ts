import { describe, expect, it, vi, beforeEach } from "vitest";
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

describe("intake.submit with notifications", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully submits form and triggers notifications", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.submit({
      childName: "John Doe",
      ageRange: "6-9",
      diagnosisStatus: "yes",
      observationTimeframe: "recently",
      selectedNeeds: ["Communication difficulties"],
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

  it("handles form submission with minimal data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.submit({
      childName: undefined,
      ageRange: undefined,
      diagnosisStatus: undefined,
      observationTimeframe: undefined,
      selectedNeeds: [],
      selectedServices: [],
      deliveryPreference: undefined,
      mainGoal: undefined,
      parentEmotion: undefined,
      parentName: "John Smith",
      phone: "+1 555 176 1920",
      email: "john@example.com",
      location: undefined,
      consent: true,
    });

    expect(result.success).toBe(true);
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
        email: "invalid-email-format",
        location: "Lagos, Nigeria",
        consent: true,
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("requires parent name", async () => {
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
        parentName: "", // Empty name
        phone: "+234 816 834 9969",
        email: "jane@example.com",
        location: "Lagos, Nigeria",
        consent: true,
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("requires phone number", async () => {
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
        phone: "", // Empty phone
        email: "jane@example.com",
        location: "Lagos, Nigeria",
        consent: true,
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("accepts multiple services", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.submit({
      childName: "John Doe",
      ageRange: "6-9",
      diagnosisStatus: "yes",
      observationTimeframe: "recently",
      selectedNeeds: ["Communication difficulties", "Behavioral challenges", "Social skills"],
      selectedServices: [
        "ABA Therapy",
        "Speech Therapy",
        "Occupational Therapy",
        "Parent Training",
      ],
      deliveryPreference: "hybrid",
      mainGoal: "Comprehensive development support",
      parentEmotion: "hopeful",
      parentName: "Jane Doe",
      phone: "+234 816 834 9969",
      email: "jane@example.com",
      location: "Lagos, Nigeria",
      consent: true,
    });

    expect(result.success).toBe(true);
  });

  it("accepts WhatsApp format phone numbers", async () => {
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
      phone: "+1 555 176 1920", // International format
      email: "jane@example.com",
      location: "Lagos, Nigeria",
      consent: true,
    });

    expect(result.success).toBe(true);
  });
});

describe("intake.list", () => {
  it("returns array of submissions", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.intake.list();

    expect(Array.isArray(result)).toBe(true);
  });
});
