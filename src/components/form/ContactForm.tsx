import { Send } from "lucide-react";
import { contactSchema } from "../../../shared/schemas";
import { contact } from "../../content/pages";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";
import { Button } from "../Button";
import { FormError, FormGrid, FormSuccess, Honeypot, SelectField, TextAreaField, TextField } from "./Fields";
import styles from "./Form.module.css";

const topicOptions = contact.topics.map((t) => ({ value: t, label: t }));

/** `initialTopic` lets pages deep-link: /contact?topic=Small%20groups */
export function ContactForm({ initialTopic = "" }: { initialTopic?: string }) {
  const matched = contact.topics.find((t) => t.toLowerCase() === initialTopic.toLowerCase()) ?? "";
  const form = useForm({
    initial: { name: "", email: "", phone: "", topic: matched, message: "", website: "" },
    schema: contactSchema,
    onSubmit: (v) => api.submitContact(v),
  });
  const { bind, errors } = form;

  if (form.status === "success") {
    return (
      <FormSuccess
        title="Message sent"
        action={
          <Button variant="soft" onClick={form.reset}>
            Send another message
          </Button>
        }
      >
        Thanks for reaching out. We'll reply to {form.values.email} within two working days.
      </FormSuccess>
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <FormGrid>
        <TextField label="Name" required autoComplete="name" error={errors.name} {...bind("name")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email} {...bind("email")} />
        <TextField label="Phone" type="tel" autoComplete="tel" error={errors.phone} {...bind("phone")} />
        <SelectField label="Topic" required options={topicOptions} error={errors.topic} {...bind("topic")} />
        <TextAreaField label="Message" required error={errors.message} {...bind("message")} />
      </FormGrid>
      <Honeypot {...bind("website")} />
      <FormError message={form.formError} />
      <div className={styles.actions}>
        <Button type="submit" loading={form.status === "submitting"} icon={<Send />}>
          Send message
        </Button>
      </div>
    </form>
  );
}
