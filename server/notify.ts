/**
 * Notification hook: called after every successful submission.
 * Right now it logs. Plug in email (Resend, Postmark, Nodemailer), SMS,
 * Slack or a CRM here without touching the routes.
 */
export async function notify(type: string, summary: string, data: unknown) {
  if (process.env.NODE_ENV !== "test") {
    console.info(`[notify] ${type}: ${summary}`);
  }
  void data;
}
