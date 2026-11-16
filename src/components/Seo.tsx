import { site } from "../content/site";

/** React 19 hoists <title> and <meta> into <head> automatically. */
export function Seo({ title, description }: { title?: string; description?: string }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`;
  const desc = description ?? site.description;
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
    </>
  );
}
