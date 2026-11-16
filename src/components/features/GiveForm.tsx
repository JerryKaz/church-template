import { useState, type FormEvent } from "react";
import { ExternalLink, Lock } from "lucide-react";
import { site } from "../../content/site";
import { formatMoney } from "../../utils/format";
import styles from "./GiveForm.module.css";

/**
 * Collects amount and fund, then hands off to your payment provider's hosted
 * checkout. No card data ever touches this site, which keeps you out of PCI scope.
 * To process payments in-app instead, replace `checkout()` with your provider's SDK.
 */
export function GiveForm() {
  const { presetAmounts, funds, currency, providerUrl, supportsPrefill } = site.give;
  const [preset, setPreset] = useState<number | null>(presetAmounts[1]);
  const [custom, setCustom] = useState("");
  const [fund, setFund] = useState<string>(funds[0]);
  const [error, setError] = useState<string | null>(null);

  const amount = preset ?? Number(custom);
  const valid = Number.isFinite(amount) && amount >= 1;

  const checkout = (e: FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setError("Please choose or enter an amount.");
      return;
    }
    setError(null);
    const url = new URL(providerUrl);
    if (supportsPrefill) {
      url.searchParams.set("amount", String(amount));
      url.searchParams.set("fund", fund);
    }
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  return (
    <form className={styles.form} onSubmit={checkout} noValidate>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Choose an amount ({currency})</legend>
        <div className={styles.amounts}>
          {presetAmounts.map((a) => (
            <button
              key={a}
              type="button"
              className={`${styles.amount} ${preset === a ? styles.active : ""}`}
              aria-pressed={preset === a}
              onClick={() => {
                setPreset(a);
                setCustom("");
                setError(null);
              }}
            >
              {formatMoney(a, currency)}
            </button>
          ))}
          <label className={`${styles.customWrap} ${preset === null ? styles.active : ""}`}>
            <span className="visually-hidden">Other amount</span>
            <span className={styles.currency} aria-hidden="true">
              {currency}
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              placeholder="Other"
              className={styles.custom}
              value={custom}
              onFocus={() => setPreset(null)}
              onChange={(e) => {
                setPreset(null);
                setCustom(e.target.value);
                setError(null);
              }}
            />
          </label>
        </div>
      </fieldset>

      <label className={styles.fundLabel} htmlFor="give-fund">
        Give towards
      </label>
      <select id="give-fund" className={styles.select} value={fund} onChange={(e) => setFund(e.target.value)}>
        {funds.map((f) => (
          <option key={f}>{f}</option>
        ))}
      </select>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <button type="submit" className={styles.submit}>
        {valid ? `Give ${formatMoney(amount, currency)}` : "Give"} <ExternalLink size={18} aria-hidden="true" />
      </button>
      <p className={styles.secure}>
        <Lock size={14} aria-hidden="true" /> You'll complete your gift on our secure payment partner's page.
      </p>
    </form>
  );
}
