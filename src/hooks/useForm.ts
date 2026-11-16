import { useState, type ChangeEvent, type FormEvent } from "react";
import type { ZodType } from "zod";
import { toFieldErrors } from "../../shared/schemas";
import { ApiValidationError } from "../services/api";

type Status = "idle" | "submitting" | "success" | "error";
type FieldValue = string | boolean;

interface UseFormOptions<TValues extends Record<string, FieldValue>> {
  initial: TValues;
  schema: ZodType;
  onSubmit: (values: TValues) => Promise<void>;
}

/**
 * Small form state machine: controlled values, per-field errors from the shared
 * Zod schema (checked on submit and re-checked as the user fixes a field),
 * submit status, and server-side validation errors mapped back onto fields.
 */
export function useForm<TValues extends Record<string, FieldValue>>({ initial, schema, onSubmit }: UseFormOptions<TValues>) {
  const [values, setValues] = useState<TValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const validate = (next: TValues) => {
    const result = schema.safeParse(next);
    return result.success ? {} : toFieldErrors(result.error);
  };

  const setField = <K extends keyof TValues>(name: K, value: TValues[K]) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Only re-validate a field that is currently showing an error, so we don't nag while typing.
    const key = name as string;
    if (errors[key]) {
      const fieldError = validate(next)[key];
      setErrors((prev) => {
        const copy = { ...prev };
        if (fieldError) copy[key] = fieldError;
        else delete copy[key];
        return copy;
      });
    }
  };

  /** Spread onto an input/select/textarea: {...bind("email")} */
  const bind = (name: keyof TValues & string) => ({
    name,
    id: `field-${name}`,
    value: typeof values[name] === "boolean" ? undefined : (values[name] as string),
    checked: typeof values[name] === "boolean" ? (values[name] as boolean) : undefined,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `field-${name}-error` : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement;
      setField(name, (target.type === "checkbox" ? target.checked : target.value) as TValues[typeof name]);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      // Move focus to the first invalid field for keyboard and screen-reader users.
      const first = Object.keys(clientErrors)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await onSubmit(values);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiValidationError) setErrors(err.fieldErrors);
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
    setFormError(null);
  };

  return { values, errors, status, formError, setField, bind, handleSubmit, reset };
}
