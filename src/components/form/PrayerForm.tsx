import { Send } from "lucide-react";
import { prayerSchema } from "../../../shared/schemas";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";
import { Button } from "../Button";
import { SmartLink } from "../SmartLink";
import { FormError, FormGrid, FormSuccess, Honeypot, SelectField, TextAreaField, TextField } from "./Fields";
import styles from "./Form.module.css";

const shareOptions = [
  { value: "public", label: "Public: show my first name on the prayer wall" },
  { value: "anonymous", label: "Anonymous: show it without my name" },
  { value: "private", label: "Private: prayer team only" },
] as const;

const kindOptions = [
  { value: "request", label: "Prayer Request" },
  { value: "praise", label: "Praise Report" },
] as const;

interface PrayerFormProps {
  onSubmitted?: () => void;
  onDone?: () => void;
}

export function PrayerForm({ onSubmitted, onDone }: PrayerFormProps) {
  const form = useForm({
    initial: { name: "", email: "", phone: "", share: "", kind: "request", message: "", website: "" },
    schema: prayerSchema,
    onSubmit: async (v) => {
      await api.submitPrayer(v as Parameters<typeof api.submitPrayer>[0]);
      onSubmitted?.();
    },
  });
  const { bind, errors, values } = form;

  if (form.status === "success") {
    const isPraise = values.kind === "praise";
    return (
      <FormSuccess
        title={isPraise ? "Thank you for sharing!" : "We're praying with you"}
        action={
          onDone ? (
            <Button variant="soft" onClick={onDone}>
              Close
            </Button>
          ) : (
            <Button variant="soft" onClick={form.reset}>
              Send another
            </Button>
          )
        }
      >
        {isPraise
          ? "Your praise report encourages our whole church family."
          : "Our prayer team has received your request."}{" "}
        {values.share !== "private" && "It will appear on the prayer wall so others can pray too."}
      </FormSuccess>
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <FormGrid>
        <TextField label="Name" required autoComplete="name" error={errors.name} {...bind("name")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email} {...bind("email")} />
        <TextField label="Phone" type="tel" autoComplete="tel" error={errors.phone} {...bind("phone")} />
        <SelectField label="Request or praise?" required options={kindOptions} error={errors.kind} {...bind("kind")} />
        <SelectField label="Share this" required full options={shareOptions} error={errors.share} {...bind("share")} />
        <TextAreaField
          label={values.kind === "praise" ? "Your praise report" : "Your prayer request"}
          required
          maxLength={2000}
          hint={`${values.message.length}/2000`}
          error={errors.message}
          {...bind("message")}
        />
      </FormGrid>
      <Honeypot {...bind("website")} />
      <FormError message={form.formError} />
      <div className={styles.actions}>
        <Button type="submit" loading={form.status === "submitting"} icon={<Send />}>
          Submit
        </Button>
        <p className={styles.note}>
          Your email and phone are never shown publicly. <SmartLink to="/privacy">Privacy policy</SmartLink>
        </p>
      </div>
    </form>
  );
}
