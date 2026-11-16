import type {
  ChatMessage,
  ContactInput,
  PrayerInput,
  PublicPrayer,
  RegistrationInput,
  VisitInput,
} from "../../shared/schemas";

export interface Api {
  submitVisit(input: VisitInput): Promise<void>;
  submitContact(input: ContactInput): Promise<void>;
  registerForEvent(eventSlug: string, input: RegistrationInput): Promise<void>;

  submitPrayer(input: PrayerInput): Promise<void>;
  listPrayers(): Promise<PublicPrayer[]>;
  reactToPrayer(id: string): Promise<number>;

  listChat(room: string): Promise<ChatMessage[]>;
  sendChat(room: string, author: string, text: string): Promise<ChatMessage>;
  /** Live updates. Returns an unsubscribe function. */
  subscribeChat(room: string, onMessage: (m: ChatMessage) => void): () => void;
}

/** Thrown for validation failures so forms can show per-field messages. */
export class ApiValidationError extends Error {
  readonly fieldErrors: Record<string, string>;
  constructor(fieldErrors: Record<string, string>) {
    super("Please check the highlighted fields.");
    this.name = "ApiValidationError";
    this.fieldErrors = fieldErrors;
  }
}
