"use client";
import { useState } from "react";
import { type Locale } from "@/lib/config";
import { tr } from "@/lib/content/copy";
import {
  measurementCopy,
  metricIds,
  metricNames,
} from "@/lib/content/measurement";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
const links: Record<string, number[]> = {
  CTR: [1, 2],
  CPC: [0, 2],
  CVR: [2, 3],
  CPA: [0, 3],
  CAC: [0, 4],
  ROAS: [0, 5],
};
export function MeasurementSystem({ lang }: { lang: Locale }) {
  const c = measurementCopy(lang);
  const [metric, setMetric] = useState("CPA");
  return (
    <>
      <section className="measure-section wrap" id="measurement">
        <div className="new-section-top">
          <p className="kicker">02 / MEASUREMENT</p>
          <h2>{c.title.replace(/\.$/, "")}</h2>
          <p>{c.intro}</p>
        </div>
        <div className="measurement-interface">
          <div className="interface-heading">
            <span>AD4GROWTH / MEASUREMENT MAP</span>
            <span>
              {tr(
                lang,
                "Zusammenhänge · keine Prognose",
                "Relationships · no forecast",
                "Зв’язки · не прогноз",
                "Связи · не прогноз",
              )}
            </span>
          </div>
          <div className="source-bands">
            {c.source.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
          <ol className="measure-flow">
            {c.stages.map((s, i) => (
              <li
                key={s}
                className={links[metric].includes(i) ? "is-related" : ""}
              >
                <span>{s}</span>
                {i < 5 && <b aria-hidden="true">→</b>}
              </li>
            ))}
          </ol>
          <Tabs
            value={metric}
            onValueChange={setMetric}
            className="metric-explorer"
          >
            <TabsList
              aria-label={tr(
                lang,
                "Kennzahl auswählen",
                "Select metric",
                "Обрати показник",
                "Выбрать показатель",
              )}
            >
              {metricIds.map((id) => (
                <TabsTrigger key={id} value={id}>
                  {id}
                </TabsTrigger>
              ))}
            </TabsList>
            {metricIds.map((id, i) => (
              <TabsContent value={id} key={id}>
                <div className="metric-explanation">
                  <div className="metric-identity">
                    <strong>{id}</strong>
                    <span>{metricNames[i]}</span>
                  </div>
                  <div className="measurement-detail">
                    <p className="metric-question">{c.metrics[i][1]}</p>
                    <span className="detail-label">{c.labels[0]}</span>
                    <p className="metric-formula">{c.metrics[i][0]}</p>
                    <span className="detail-label">{c.labels[2]}</span>
                    <p>{c.metrics[i][2]}</p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <p className="measurement-boundary">{c.boundary}</p>
        </div>
      </section>
      <section className="diagnostic-section" id="diagnostics">
        <div className="wrap">
          <div className="new-section-top">
            <p className="kicker">03 / DIAGNOSTICS</p>
            <h2>
              {tr(
                lang,
                "Was tun, wenn eine Kampagne nicht rundläuft?",
                "What if a campaign is not working well?",
                "Що робимо, коли кампанія працює не так?",
                "Что делаем, когда кампания работает не так?",
              )}
            </h2>
            <p>
              {tr(
                lang,
                "Drei typische Situationen. Wählen Sie ein Beispiel: Das prüfen wir, das ändern wir, daran bewerten wir die Wirkung.",
                "Three common situations. Choose an example to see what we check, what we change and how we assess the effect.",
                "Три типові ситуації. Оберіть приклад: що перевіряємо, що змінюємо та як оцінюємо ефект.",
                "Три типичные ситуации. Выберите пример: что проверяем, что меняем и как оцениваем эффект.",
              )}
            </p>
          </div>
          <div className="diagnostic-board">
            <div className="interface-heading">
              <span>
                {tr(
                  lang,
                  "DIAGNOSEBEISPIELE",
                  "DIAGNOSTIC EXAMPLES",
                  "ПРИКЛАДИ ДІАГНОСТИКИ",
                  "ПРИМЕРЫ ДИАГНОСТИКИ",
                )}
              </span>
              <span>
                {tr(
                  lang,
                  "Keine Kontodaten",
                  "Not account data",
                  "Не дані акаунта",
                  "Не данные аккаунта",
                )}
              </span>
            </div>
            <Tabs
              defaultValue="case-0"
              orientation="vertical"
              className="decision-workspace"
            >
              <TabsList
                className="decision-options"
                aria-label={tr(
                  lang,
                  "Situation auswählen",
                  "Choose a situation",
                  "Оберіть ситуацію",
                  "Выберите ситуацию",
                )}
              >
                {c.diagnostics.map((row, i) => (
                  <TabsTrigger value={`case-${i}`} key={row[0]}>
                    <span className="decision-index">0{i + 1}</span>
                    <span>
                      {row[0]}
                      <small>{row[1]}</small>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              {c.diagnostics.map((row, i) => (
                <TabsContent
                  value={`case-${i}`}
                  key={row[0]}
                  className="decision-panel"
                >
                  <p className="decision-caption">
                    {tr(
                      lang,
                      "VON DER FRAGE ZUR MASSNAHME",
                      "FROM QUESTION TO ACTION",
                      "ВІД ПИТАННЯ ДО ДІЇ",
                      "ОТ ВОПРОСА К ДЕЙСТВИЮ",
                    )}
                  </p>
                  <ol className="decision-steps">
                    {tr(
                      lang,
                      ["Prüfen", "Gezielt ändern", "Wirkung prüfen"],
                      [
                        "Investigate",
                        "Make a focused change",
                        "Review the effect",
                      ],
                      ["Перевірити", "Внести зміну", "Оцінити ефект"],
                      ["Проверить", "Внести изменение", "Оценить эффект"],
                    ).map((label, n) => (
                      <li key={label}>
                        <span
                          className="decision-step-number"
                          aria-hidden="true"
                        >
                          {n + 1}
                        </span>
                        <div>
                          <h3>{label}</h3>
                          <p>{row[n + 3]}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <p className="economics-note">
            {tr(
              lang,
              "Der Maßstab liegt im Geschäft: Neukunden, Marge und Kapazität. Angebot, Website und Vertrieb beeinflussen das Ergebnis ebenso wie die Kampagne.",
              "The business sets the standard: new customers, margin and capacity. Offer, website and sales influence outcomes alongside the campaign.",
              "Орієнтир — бізнес: нові клієнти, маржа й ресурси. Пропозиція, сайт і продажі впливають на результат разом із кампанією.",
              "Ориентир — бизнес: новые клиенты, маржа и ресурсы. Предложение, сайт и продажи влияют на результат вместе с кампанией.",
            )}
          </p>
        </div>
      </section>
      <section className="management-section wrap" id="approach">
        <div className="new-section-top">
          <p className="kicker">04 / ONGOING MANAGEMENT</p>
          <h2>
            {tr(
              lang,
              "Laufendes Kampagnenmanagement. Das ist enthalten",
              "Ongoing campaign management. What is included",
              "Постійне управління кампаніями. Що входить",
              "Постоянное управление кампаниями. Что входит",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "Die monatliche Betreuung umfasst die Arbeit an Ihren Anzeigen, die Kontrolle des Budgets, die Prüfung der Messung und verständliche Berichte. Wir vereinbaren den Umfang vor dem Start.",
              "Monthly management covers work on your ads, budget monitoring, measurement checks and clear reporting. We agree the scope before launch.",
              "Щомісячне управління охоплює роботу з оголошеннями, контроль бюджету, перевірку вимірювання та зрозумілі звіти. Обсяг погоджуємо до запуску.",
              "Ежемесячное управление включает работу с объявлениями, контроль бюджета, проверку измерения и понятные отчёты. Объём согласуем до запуска.",
            )}
          </p>
        </div>
        <Table className="management-table">

          <TableHeader>
            <TableRow>
              {tr(
                lang,
                [
                  "Arbeitsfeld",
                  "Was wir prüfen / bearbeiten",
                  "Was Sie daraus erhalten",
                ],
                ["Workstream", "What we review / manage", "What you receive"],
                ["Напрям", "Що перевіряємо / робимо", "Що ви отримуєте"],
                ["Направление", "Что проверяем / делаем", "Что вы получаете"],
              ).map((s) => (
                <TableHead key={s}>{s}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {c.operations.map((row) => (
              <TableRow key={row[0]}>
                {row.map((s, i) => (
                  <TableCell key={s} data-column={i}>
                    {i > 0 && <span className="management-mobile-label">{tr(lang,
                      ["", "Was wir prüfen / bearbeiten", "Was Sie daraus erhalten"],
                      ["", "What we review / manage", "What you receive"],
                      ["", "Що перевіряємо / робимо", "Що ви отримуєте"],
                      ["", "Что проверяем / делаем", "Что вы получаете"]
                    )[i]}</span>}
                    {s}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
          <p className="management-note">
            {tr(
              lang,
              "Suchbegriffe und Gebote beziehen sich auf Google Ads. Bei ChatGPT Ads richten sich die Maßnahmen nach den verfügbaren Funktionen und Messmöglichkeiten.",
              "Search terms and bids refer to Google Ads. ChatGPT Ads management depends on available features and measurement.",
              "Пошукові запити та ставки стосуються Google Ads. Дії в ChatGPT Ads залежать від доступних функцій і вимірювання.",
              "Поисковые запросы и ставки относятся к Google Ads. Действия в ChatGPT Ads зависят от доступных функций и измерения.",
            )}
          </p>
        <div className="management-ownership">
          <strong>
            {tr(
              lang,
              "Wir steuern die Arbeit. Ergebnisse entstehen im Zusammenspiel.",
              "We manage the work. Outcomes depend on the whole system.",
              "Ми керуємо роботою. Результат залежить від усієї системи.",
              "Мы управляем работой. Результат зависит от всей системы.",
            )}
          </strong>
          <p>
            {tr(
              lang,
              "Kampagnen, Tests und Budgetentscheidungen liegen in unserem Arbeitsbereich. Angebot, Preis, Marge und Vertrieb klären wir gemeinsam mit Ihnen.",
              "Campaigns, tests and budget decisions are our work. Offer, pricing, margin and sales are defined together with you.",
              "Кампанії, тести й бюджетні рішення — наша робота. Пропозицію, ціну, маржу та продажі узгоджуємо з вами.",
              "Кампании, тесты и бюджетные решения — наша работа. Предложение, цену, маржу и продажи согласуем с вами.",
            )}
          </p>
        </div>
      </section>
    </>
  );
}
