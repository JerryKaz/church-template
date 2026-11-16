import { Send } from "lucide-react";
import { visitSchema } from "../../../shared/schemas";
import { useForm } from "../../hooks/useForm";
import { api } from "../../services/api";
import { Button } from "../Button";
import { CheckboxField, FormError, FormGrid, FormSuccess, Honeypot, TextAreaField, TextField } from "./Fields";
import styles from "./Form.module.css";

const today = () => new Date().toISOString().slice(0, 10);

export function VisitForm() {
  const form = useForm({
    initial: {
      fullName: "",
      email: "",
      phone: "",
      adults: "1",
      children: "0",
      visitDate: "",
      firstVisit: true,
      questions: "",
      website: "",
    },
    schema: visitSchema,
    onSubmit: (v) => api.submitVisit(v),
  });
  const { bind, errors } = form;

  if (form.status === "success") {
    return (
      <FormSuccess
        title={`Thanks, ${form.values.fullName.split(" ")[0]}!`}
        action={
          <Button variant="outline-light" onClick={form.reset}>
            Plan another visit
          </Button>
        }
      >
        We've got your details and someone from our team will be in touch before your visit. See you soon!
      </FormSuccess>
    );
  }

  return (
    <form className={styles.form} onSubmit={form.handleSubmit} noValidate>
      <FormGrid>
        <TextField label="Full name" required autoComplete="name" error={errors.fullName} {...bind("fullName")} />
        <TextField label="Email address" type="email" required autoComplete="email" error={errors.email} {...bind("email")} />
        <TextField label="Phone number" type="tel" autoComplete="tel" error={errors.phone} {...bind("phone")} />
        <TextField label="Date of visit" type="date" required min={today()} error={errors.visitDate} {...bind("visitDate")} />
        <TextField label="Number of adults" type="number" inputMode="numeric" min={1} max={20} required error={errors.adults} {...bind("adults")} />
        <TextField label="Number of children" type="number" inputMode="numeric" min={0} max={20} error={errors.children} {...bind("children")} />
        <CheckboxField label="This is my first time visiting" error={errors.firstVisit} {...bind("firstVisit")} />
        <TextAreaField label="Any questions for us?" error={errors.questions} {...bind("questions")} />
      </FormGrid>
      <Honeypot {...bind("website")} />
      <FormError message={form.formError} />
      <div className={styles.actions}>
        <Button type="submit" variant="soft" loading={form.status === "submitting"} icon={<Send />}>
          Submit
        </Button>
      </div>
    </form>
  );
}
