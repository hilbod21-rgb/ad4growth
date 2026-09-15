import Image from "next/image";
import { type Locale } from "@/lib/config";
import { operator, operatorCopy } from "@/lib/content/operator";

export function Operator({ lang }: { lang: Locale }) {
  return (
    <section
      className="operator-section wrap"
      id={operator.anchor}
      aria-labelledby="operator-name"
    >
      <p className="kicker">
        06 / {lang === "de" ? "ÜBER AD4GROWTH" : "OPERATOR"}
      </p>
      <div className="operator-layout">
        <Image
          className="operator-portrait"
          src={operator.portrait}
          alt={operator.name}
          width={640}
          height={640}
          unoptimized
          loading="lazy"
        />
        <div className="operator-identity">
          <h2 id="operator-name">{operator.name}</h2>
          <p>
            {operator.role}
          </p>
          <a
            className="text-link"
            href={operator.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
        <p className="operator-description">{operatorCopy(lang)}</p>
      </div>
    </section>
  );
}
