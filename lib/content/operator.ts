import { type Locale } from "@/lib/config";
import { tr } from "./copy";

export const operator = {
  name: "Bohdan S.",
  role: "Product Marketing Manager",
  type: "Person" as const,
  portrait: "/images/operator.jpeg",
  linkedin: "https://www.linkedin.com/in/bohdan-pm",
  anchor: "operator",
};

export const operatorCopy = (lang: Locale) =>
  tr(
    lang,
    "Von Dresden aus begleite ich Ihre Google Ads und ChatGPT Ads Projekte – online und mit direktem Kontakt. Bei AD4GROWTH verbinde ich Produktdenken mit Suchmaschinenwerbung (SEA), Kampagnenmanagement und nachvollziehbarer Erfolgsmessung.",
    "Based in Dresden, I work with you directly on Google Ads and ChatGPT Ads projects online. At AD4GROWTH, I connect product thinking with paid search (SEA), campaign management and clear measurement.",
    "З Дрездена веду ваші проєкти Google Ads і ChatGPT Ads онлайн, у прямому контакті з вами. В AD4GROWTH поєдную продуктове мислення, пошукову рекламу (SEA), управління кампаніями та зрозуміле вимірювання.",
    "Из Дрездена веду ваши проекты Google Ads и ChatGPT Ads онлайн, в прямом контакте с вами. В AD4GROWTH соединяю продуктовое мышление, поисковую рекламу (SEA), управление кампаниями и понятное измерение.",
  );
