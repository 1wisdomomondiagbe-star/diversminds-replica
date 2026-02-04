import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createIntakeSubmission, getIntakeSubmissions } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  intake: router({
    submit: publicProcedure
      .input(
        z.object({
          childName: z.string().optional(),
          ageRange: z.string().optional(),
          diagnosisStatus: z.string().optional(),
          observationTimeframe: z.string().optional(),
          selectedNeeds: z.array(z.string()),
          selectedServices: z.array(z.string()),
          deliveryPreference: z.string().optional(),
          mainGoal: z.string().optional(),
          parentEmotion: z.string().optional(),
          parentName: z.string(),
          phone: z.string(),
          email: z.string().email(),
          location: z.string().optional(),
          consent: z.boolean(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const submission = await createIntakeSubmission({
            childName: input.childName || null,
            ageRange: input.ageRange || null,
            diagnosisStatus: input.diagnosisStatus || null,
            observationTimeframe: input.observationTimeframe || null,
            childNeeds: JSON.stringify(input.selectedNeeds),
            servicesInterested: JSON.stringify(input.selectedServices),
            deliveryPreference: input.deliveryPreference || null,
            mainGoal: input.mainGoal || null,
            parentEmotion: input.parentEmotion || null,
            parentName: input.parentName,
            phone: input.phone,
            email: input.email,
            location: input.location || null,
            consent: input.consent ? 1 : 0,
            status: "pending",
          });

          await sendParentConfirmationEmail(input.email, input.parentName);
          await sendWhatsAppNotification(input.phone, input.parentName);
          await sendAdminNotification(input);

          return {
            success: true,
            message: "Thank you for your submission! We will contact you soon.",
          };
        } catch (error) {
          console.error("[Intake] Submission failed:", error);
          return {
            success: false,
            message: "Failed to submit form. Please try again.",
          };
        }
      }),
    list: publicProcedure.query(async () => {
      try {
        const submissions = await getIntakeSubmissions();
        return submissions;
      } catch (error) {
        console.error("[Intake] Failed to fetch submissions:", error);
        return [];
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;

// Email helper functions
async function sendParentConfirmationEmail(email: string, name: string) {
  try {
    console.log(`[Email] Sending confirmation to ${email} for ${name}`);
    // Configure your email service here
    // Placeholder - configure with SendGrid, Gmail SMTP, or another service
  } catch (error) {
    console.error("[Email] Failed to send confirmation:", error);
  }
}

async function sendAdminNotification(data: any) {
  try {
    console.log(`[Email] Sending admin notification for ${data.parentName}`);
    // Send email to admin
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
  }
}

async function sendWhatsAppNotification(phone: string, name: string) {
  try {
    console.log(`[WhatsApp] Sending notification to ${phone} for ${name}`);
    // Configure WhatsApp Business API here
    // Placeholder - integrate with Twilio, WhatsApp Business API, or similar service
  } catch (error) {
    console.error("[WhatsApp] Failed to send notification:", error);
  }
}
