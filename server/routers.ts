import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createIntakeSubmission, getIntakeSubmissions } from "./db";
import { ENV } from "./_core/env";
import nodemailer from "nodemailer";
import axios from "axios";

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
          await sendWebhookNotification(input);

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

// Gmail SMTP transporter
const createMailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
};

// Email helper functions
async function sendParentConfirmationEmail(email: string, name: string) {
  try {
    const transporter = createMailTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "DiverseMinds - We Received Your Inquiry",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">DiverseMinds</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 5px 0 0 0;">Special Needs Consult Ltd.</p>
          </div>
          <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-top: 0;">Hello ${name},</h2>
            <p style="color: #4b5563; line-height: 1.6;">
              Thank you for reaching out to DiverseMinds! We have received your inquiry and appreciate your interest in our services.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              Our team will review your submission and contact you within 24-48 hours to discuss how we can best support your child's needs.
            </p>
            <p style="color: #4b5563; line-height: 1.6;">
              In the meantime, if you have any questions, feel free to reach out to us via WhatsApp or email.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Best regards,<br/>
                <strong>DiverseMinds Team</strong>
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email] Confirmation sent to ${email}`);
  } catch (error) {
    console.error("[Email] Failed to send confirmation:", error);
  }
}

async function sendAdminNotification(data: any) {
  try {
    const transporter = createMailTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Intake Submission - ${data.parentName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">New Intake Submission</h1>
          </div>
          <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1f2937; margin-top: 0;">Parent Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; width: 30%;">Name:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.parentName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Location:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.location || "Not provided"}</td>
              </tr>
            </table>

            <h2 style="color: #1f2937;">Child Information</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold; width: 30%;">Child Name:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.childName || "Not provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Age Range:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.ageRange || "Not provided"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; color: #6b7280; font-weight: bold;">Services Interested:</td>
                <td style="padding: 10px 0; color: #1f2937;">${data.selectedServices.join(", ")}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This is an automated notification. Please follow up with the parent within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[Email] Admin notification sent for ${data.parentName}`);
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
  }
}

async function sendWhatsAppNotification(phone: string, name: string) {
  try {
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneNumberId || !accessToken) {
      console.warn("[WhatsApp] Missing WhatsApp credentials");
      return;
    }

    const message = `Hello ${name},\n\nThank you for contacting DiverseMinds! We have received your inquiry and will get back to you within 24-48 hours.\n\nBest regards,\nDiverseMinds Team`;

    const response = await axios.post(
      `https://graph.instagram.com/v18.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone.replace(/\D/g, ""), // Remove non-digits
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`[WhatsApp] Message sent to ${phone}`);
  } catch (error) {
    console.error("[WhatsApp] Failed to send notification:", error);
  }
}

async function sendWebhookNotification(data: any) {
  try {
    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("[Webhook] No webhook URL configured");
      return;
    }

    const payload = {
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      location: data.location,
      childName: data.childName,
      ageRange: data.ageRange,
      diagnosisStatus: data.diagnosisStatus,
      observationTimeframe: data.observationTimeframe,
      selectedNeeds: data.selectedNeeds,
      selectedServices: data.selectedServices,
      deliveryPreference: data.deliveryPreference,
      mainGoal: data.mainGoal,
      parentEmotion: data.parentEmotion,
      consent: data.consent,
      timestamp: new Date().toISOString(),
    };

    await axios.post(webhookUrl, payload);
    console.log(`[Webhook] Data sent to ${webhookUrl}`);
  } catch (error) {
    console.error("[Webhook] Failed to send notification:", error);
  }
}
