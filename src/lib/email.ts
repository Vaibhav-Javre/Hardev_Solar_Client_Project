import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/site-config";

export interface LeadEmailPayload {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  propertyType: string;
  interestedService?: string;
  monthlyElectricityBill?: string;
  message?: string;
  source?: string;
  submittedAt?: string;
  leadId?: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ||
  process.env.LEADS_NOTIFICATION_EMAIL ||
  SITE_CONFIG.email;

// Initialize Resend client only if valid key is supplied
const resend =
  RESEND_API_KEY && RESEND_API_KEY !== "re_placeholder_api_key"
    ? new Resend(RESEND_API_KEY)
    : null;

/**
 * Sends an internal lead alert notification to the company administrator.
 * Designed with strict fault tolerance: email failure NEVER causes lead creation to fail.
 */
export async function sendLeadNotificationEmail(
  payload: LeadEmailPayload
): Promise<{ success: boolean; error?: string }> {
  const timestamp = payload.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // If Resend API key is not yet configured, log safely in dev mode and return gracefully
  if (!resend) {
    console.log(
      `[Email Notification - Mock/Dev Mode] New Lead Alert for ${ADMIN_EMAIL}:\n`,
      JSON.stringify(
        {
          subject: `New Solar Enquiry: ${payload.fullName} (${payload.phone})`,
          ...payload,
          submittedAt: timestamp,
        },
        null,
        2
      )
    );
    return { success: true };
  }

  try {
    const fromAddress =
      process.env.RESEND_FROM_EMAIL || "Hardev Solar Services Leads <onboarding@resend.dev>";

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #16a34a; padding-bottom: 16px; margin-bottom: 20px;">
          <h2 style="color: #0f291e; margin: 0 0 6px 0; font-size: 20px; font-weight: 800;">
            New Solar Consultation Enquiry
          </h2>
          <p style="color: #64748b; margin: 0; font-size: 13px;">
            Submitted on ${timestamp} via ${payload.source || "Website"}
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 160px;">Customer Name:</td>
              <td style="padding: 10px 0; color: #0f291e; font-weight: 700;">${payload.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
              <td style="padding: 10px 0; color: #16a34a; font-weight: 700;">
                <a href="tel:+91${payload.phone}" style="color: #16a34a; text-decoration: none;">+91 ${payload.phone}</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/91${payload.phone}" style="color: #15803d; text-decoration: none;">WhatsApp</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 10px 0; color: #0f291e;">${payload.email || "Not provided"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">City / Location:</td>
              <td style="padding: 10px 0; color: #0f291e; font-weight: 600;">${payload.city}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Property Type:</td>
              <td style="padding: 10px 0; color: #0f291e;">${payload.propertyType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Interested Service:</td>
              <td style="padding: 10px 0; color: #0f291e;">${payload.interestedService || "General Consultation"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Monthly Electricity Bill:</td>
              <td style="padding: 10px 0; color: #0f291e;">${payload.monthlyElectricityBill || "Not specified"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Source / Campaign:</td>
              <td style="padding: 10px 0; color: #0f291e;">${payload.source || "Website Direct"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0 6px 0; color: #64748b; font-weight: 600; vertical-align: top;">Customer Note:</td>
              <td style="padding: 12px 0 6px 0; color: #0f291e; line-height: 1.5;">${payload.message || "Requested rooftop solar consultation"}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
          Sent automatically by Hardev Solar Services Lead Management System.
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: ADMIN_EMAIL,
      subject: `[New Solar Lead] ${payload.fullName} - ${payload.city} (+91 ${payload.phone})`,
      html: htmlContent,
      text: `New Solar Enquiry\n\nName: ${payload.fullName}\nPhone: +91 ${payload.phone}\nEmail: ${payload.email || "N/A"}\nCity: ${payload.city}\nProperty Type: ${payload.propertyType}\nInterested Service: ${payload.interestedService || "General"}\nMonthly Bill: ${payload.monthlyElectricityBill || "N/A"}\nMessage: ${payload.message || "N/A"}\nSource: ${payload.source || "website"}\nSubmitted At: ${timestamp}`,
    });

    if (error) {
      console.warn("[Resend Email Warning]:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown email error";
    console.warn("[Email Notification Error (Safely Handled)]:", errorMsg);
    return { success: false, error: errorMsg };
  }
}
