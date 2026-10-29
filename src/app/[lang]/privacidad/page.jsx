import Link from "next/link";
import { lang } from "next/root-params";
import { getDictionary } from "../dictionaries";

// TODO: have a lawyer review this draft before treating it as the published policy.

export async function generateMetadata() {
  const dict = await getDictionary();
  return {
    title: dict.privacy.title,
    description: dict.privacy.description,
  };
}

export default async function PrivacyPage() {
  const copy = (await getDictionary()).privacy;
  const locale = await lang();

  return (
    <div id="root">
      <article className="container legal">
        <p className="legal__draft">{copy.draft}</p>
        <p>
          <Link href={`/${locale}#contact`}>{copy.back}</Link>
        </p>
        <h1>{copy.title}</h1>
        <p>{copy.updated}</p>
        <p>{copy.intro}</p>

        <h2>{copy.responsibleTitle}</h2>
        <p>
          {copy.responsibleBefore} <a href="https://www.miguelgd.com">https://www.miguelgd.com</a>.
        </p>
        {/* TODO: publicar un correo dedicado para ejercer los derechos de acceso, rectificación y supresión. */}
        <p>{copy.rightsRequest}</p>

        <h2>{copy.dataTitle}</h2>
        <p>{copy.dataIntro}</p>
        <ul>
          {copy.dataItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{copy.dataSensitive}</p>
        <p>{copy.dataHoneypot}</p>

        <h2>{copy.purposeTitle}</h2>
        <p>{copy.purpose}</p>
        <p>{copy.consent}</p>

        <h2>{copy.retentionTitle}</h2>
        {/* TODO: confirmar con un abogado el plazo de conservación. Hoy se propone un máximo orientativo de 24 meses. */}
        <p>{copy.retention}</p>
        <p>{copy.logs}</p>

        <h2>{copy.processorsTitle}</h2>
        <p>{copy.hosting}</p>
        {/* TODO: completar el encargado real (Resend u otro SMTP) y el mecanismo de transferencia internacional del art. 12 de la Ley 25.326. */}
        <p>{copy.transfer}</p>

        <h2>{copy.rightsTitle}</h2>
        <p>{copy.rights}</p>
        <p>
          {copy.authorityBefore} <a href="https://www.argentina.gob.ar/aaip">argentina.gob.ar/aaip</a>
          .
        </p>

        <h2>{copy.securityTitle}</h2>
        <p>{copy.security}</p>

        <h2>{copy.minorsTitle}</h2>
        <p>{copy.minors}</p>

        <h2>{copy.changesTitle}</h2>
        <p>{copy.changes}</p>
      </article>
    </div>
  );
}
