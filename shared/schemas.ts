/**
 * Validation schemas shared by the React forms and the Express API,
 * so client and server always agree on what a valid submission is.
 */
import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(80, "Name is too long");
const email = z.string().trim().toLowerCase().pipe(z.email("Please enter a valid email address"));
const phone = z
  .string()
  .trim()
  .max(25, "Phone number is too long")
  .regex(/^[+\d\s()-]*$/, "Use digits, spaces and + ( ) - only");
const optionalPhone = phone.optional().or(z.literal(""));
/** Hidden honeypot field: real people never fill it, bots usually do. */
const honeypot = z.string().max(0, "Spam detected").optional();

export const visitSchema = z.object({
  fullName: name,
  email,
  phone: optionalPhone,
  adults: z.coerce.number({ error: "Enter a number" }).int("Whole numbers only").min(1, "At least 1 adult").max(20, "For groups over 20, please contact us"),
  children: z.coerce.number({ error: "Enter a number" }).int("Whole numbers only").min(0, "Can't be negative").max(20, "For groups over 20, please contact us"),
  visitDate: z.iso.date("Choose the date you plan to visit"),
  firstVisit: z.boolean().default(true),
  questions: z.string().trim().max(1000, "Please keep it under 1000 characters").optional().or(z.literal("")),
  website: honeypot,
});
export type VisitInput = z.input<typeof visitSchema>;

export const shareOptions = ["public", "anonymous", "private"] as const;
export const prayerKinds = ["request", "praise"] as const;

export const prayerSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  share: z.enum(shareOptions, "Choose how to share this"),
  kind: z.enum(prayerKinds, "Choose request or praise report"),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000, "Please keep it under 2000 characters"),
  website: honeypot,
});
export type PrayerInput = z.input<typeof prayerSchema>;

export const contactSchema = z.object({
  name,
  email,
  phone: optionalPhone,
  topic: z.string().trim().min(1, "Choose a topic").max(60),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(2000),
  website: honeypot,
});
export type ContactInput = z.input<typeof contactSchema>;

export const registrationSchema = z.object({
  title: z.string().trim().max(30).optional().or(z.literal("")),
  firstName: name,
  lastName: name,
  email,
  phone: phone.min(6, "Please enter your phone number"),
  country: z.string().trim().min(2, "Please enter your country").max(60),
  city: z.string().trim().min(2, "Please enter your city").max(60),
  website: honeypot,
});
export type RegistrationInput = z.input<typeof registrationSchema>;

export const chatMessageSchema = z.object({
  author: name,
  text: z.string().trim().min(1, "Message is empty").max(500, "Keep messages under 500 characters"),
});
export type ChatMessageInput = z.input<typeof chatMessageSchema>;

/* ---------- Shapes returned by the API ---------- */

export interface PublicPrayer {
  id: string;
  name: string; // "Anonymous" when shared anonymously
  kind: (typeof prayerKinds)[number];
  message: string;
  createdAt: string;
  count: number; // "I prayed" or "celebrate" reactions
}

export interface ChatMessage {
  id: string;
  room: string;
  author: string;
  text: string;
  createdAt: string;
}

/** Turn a ZodError into { field: firstMessage } for form display. */
export function toFieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}
