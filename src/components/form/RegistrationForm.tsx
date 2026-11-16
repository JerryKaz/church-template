import { Send } from "lucide-react";
import { registrationSchema } from "../../../shared/schemas";
import type { ChurchEvent } from "../../content/events";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";
import { Button } from "../Button";
import { FormError, FormGrid, FormSuccess, Honeypot, SelectField, TextField } from "./Fields";
import styles from "./Form.module.css";

const titleOptions = ["Mr", "Mrs", "Ms", "Dr", "Rev", "Pastor", "Deacon", "Elder"].map((t) => ({ value: t, label: t }));

export function RegistrationForm({ event }: { event: ChurchEvent }) {
  const form = useForm({
    initial: { title: "", firstName: "", lastName: "", email: "", phone: "", country: "", city: "", website: "" },
    schema: registrationSchema,
    onSubmit: (v) => api.registerForEvent(event.slug, v),
  });
  const { bind, errors } = form;

  if (form.status === "success") {
    return (
      <FormSuccess title="You're registered!">
        We've saved your place at <strong>{event.title}</strong>. A confirmation will be sent to {form.values.email}.
      </FormSuccess>
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <FormGrid>
        {event.registration?.askTitle && (
          <SelectField label="Title" options={titleOptions} placeholder="Select your title" full error={errors.title} {...bind("title")} />
        )}
        <TextField label="First name" required autoComplete="given-name" error={errors.firstName} {...bind("firstName")} />
        <TextField label="Last name" required autoComplete="family-name" error={errors.lastName} {...bind("lastName")} />
        <TextField label="Email" type="email" required autoComplete="email" error={errors.email} {...bind("email")} />
        <TextField label="Phone" type="tel" required autoComplete="tel" error={errors.phone} {...bind("phone")} />
        <TextField label="Country" required autoComplete="country-name" error={errors.country} {...bind("country")} />
        <TextField label="City" required autoComplete="address-level2" error={errors.city} {...bind("city")} />
      </FormGrid>
      <Honeypot {...bind("website")} />
      <FormError message={form.formError} />
      <div className={styles.actions}>
        <Button type="submit" loading={form.status === "submitting"} icon={<Send />}>
          Register
        </Button>
        {event.registration?.capacityNote && <p className={styles.note}>{event.registration.capacityNote}</p>}
      </div>
    </form>
  );
}
