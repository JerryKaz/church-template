import { ArrowRight } from "lucide-react";
import { Button } from "../Button";
import { Section, type Tone } from "../Section";
import styles from "./CtaBanner.module.css";

interface Cta {
  label: string;
  to: string;
}

interface CtaBannerProps {
  title: string;
  body?: string;
  primary?: Cta;
  secondary?: Cta;
  tone?: Tone;
}

export function CtaBanner({ title, body, primary, secondary, tone = "brand" }: CtaBannerProps) {
  const onColor = tone === "brand" || tone === "dark";
  return (
    <Section tone={tone} title={title} intro={body}>
      {(primary || secondary) && (
        <div className={`${styles.actions} reveal`}>
          {primary && (
            <Button variant={onColor ? "soft" : "primary"} to={primary.to}>
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button variant={onColor ? "outline-light" : "soft"} to={secondary.to} icon={<ArrowRight />}>
              {secondary.label}
            </Button>
          )}
        </div>
      )}
    </Section>
  );
}
