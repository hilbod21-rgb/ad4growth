"use client";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { business, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { labCopy } from "@/lib/content/performance";
import {
  calculateScenario,
  initialScenario,
  demoAssumptions,
  type Scenario,
  type MetricId,
} from "@/lib/performance";
import { track } from "@/lib/analytics";
const stageIds: MetricId[] = [
  "spend",
  "impressions",
  "clicks",
  "conversions",
  "customers",
  "revenue",
];
const metricIds: MetricId[] = ["CTR", "CPC", "CVR", "CPA", "CAC", "ROAS"];
const relations: Record<MetricId, MetricId[]> = {
  spend: ["spend", "clicks", "conversions", "customers", "revenue"],
  impressions: ["impressions", "clicks"],
  clicks: ["spend", "impressions", "clicks", "conversions"],
  conversions: ["spend", "clicks", "conversions", "customers"],
  customers: ["spend", "conversions", "customers", "revenue"],
  revenue: ["spend", "customers", "revenue"],
  CTR: ["impressions", "clicks"],
  CPC: ["spend", "clicks"],
  CVR: ["clicks", "conversions"],
  CPA: ["spend", "conversions"],
  CAC: ["spend", "customers"],
  ROAS: ["spend", "revenue"],
};
export function PerformanceLab({ lang }: { lang: Locale }) {
  const l = labCopy(lang),
    c = copy(lang);
  const [scenario, setScenario] = useState<Scenario>(initialScenario);
  const [metric, setMetric] = useState<MetricId>("CAC");
  const [hover, setHover] = useState<MetricId | null>(null);
  const [decision, setDecision] = useState(2);
  const r = calculateScenario(scenario),
    base = calculateScenario(initialScenario);
  const active = hover || metric;
  const fmt = (n: number, d = 0) =>
    n.toLocaleString(lang, {
      maximumFractionDigits: d,
      minimumFractionDigits: d,
    });
  const money = (n: number, d = 0) => `€${fmt(n, d)}`;
  const metricValue = (id: MetricId) =>
    id === "CTR" || id === "CVR"
      ? `${fmt(r[id], 2)}%`
      : id === "ROAS"
        ? `${fmt(r.ROAS, 2)}×`
        : ["spend", "revenue", "CPC", "CPA", "CAC"].includes(id)
          ? money(r[id], ["CPC", "CPA", "CAC"].includes(id) ? 2 : 0)
          : fmt(r[id]);
  const labels: Record<MetricId, string> = {
    spend: l.labels[0],
    impressions: l.labels[1],
    clicks: l.labels[2],
    conversions: l.labels[3],
    customers: l.labels[4],
    revenue: l.labels[5],
    CTR: "Click-through rate",
    CPC: "Cost per click",
    CVR: "Conversion rate",
    CPA: "Cost per acquisition",
    CAC: "Customer acquisition cost",
    ROAS: "Return on ad spend",
  };
  const formulas: Record<MetricId, string> = {
    spend: `Google Ads + ChatGPT Ads`,
    impressions: "Clicks / assumed CTR",
    clicks: "Ad spend / assumed CPC",
    conversions: "Clicks × assumed CVR",
    customers: "Conversions × close rate",
    revenue: "Customers × revenue per customer",
    CTR: "Clicks / impressions × 100",
    CPC: "Ad spend / clicks",
    CVR: "Conversions / clicks × 100",
    CPA: "Ad spend / conversions",
    CAC: "Total acquisition cost / new customers",
    ROAS: "Attributed revenue / ad spend",
  };
  const equations: Record<MetricId, string> = {
    spend: `${money(r.google.spend)} + ${money(r.chatgpt.spend)}`,
    impressions: `${fmt(r.google.impressions)} + ${fmt(r.chatgpt.impressions)}`,
    clicks: `${fmt(r.google.clicks)} + ${fmt(r.chatgpt.clicks)}`,
    conversions: `${fmt(r.google.conversions)} + ${fmt(r.chatgpt.conversions)}`,
    customers: `${fmt(r.google.customers)} + ${fmt(r.chatgpt.customers)}`,
    revenue: `${fmt(r.google.customers)} × ${money(demoAssumptions.google.customerRevenue)} + ${fmt(r.chatgpt.customers)} × ${money(demoAssumptions.chatgpt.customerRevenue)}`,
    CTR: `${fmt(r.clicks)} / ${fmt(r.impressions)} × 100`,
    CPC: `${money(r.spend)} / ${fmt(r.clicks)}`,
    CVR: `${fmt(r.conversions)} / ${fmt(r.clicks)} × 100`,
    CPA: `${money(r.spend)} / ${fmt(r.conversions)}`,
    CAC: `(${money(r.spend)} + ${money(r.management)}) / ${fmt(r.customers)}`,
    ROAS: `${money(r.revenue)} / ${money(r.spend)}`,
  };
  const detail = metricIds.includes(active)
    ? c.metricDescriptions[metricIds.indexOf(active)]
    : c.stageNotes[stageIds.indexOf(active)];
  const diff = base[active]
    ? ((r[active] - base[active]) / base[active]) * 100
    : 0;
  const selectMetric = (id: MetricId) => {
    setMetric(id);
    setHover(null);
    track("metric_open", { metric_name: id, locale: lang });
  };
  useEffect(() => {
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: "configure_acquisition_demo",
            title: "Configure acquisition demo",
            description:
              "Change the illustrative budget and Google allocation on this page. Does not change real advertising accounts or send an inquiry.",
            inputSchema: {
              type: "object",
              properties: {
                budget: { type: "number", minimum: 2500, maximum: 10000 },
                googleShare: { type: "number", minimum: 20, maximum: 80 },
              },
              required: ["budget", "googleShare"],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute(input: unknown) {
              const value = input as Scenario;
              if (
                !value ||
                !Number.isFinite(value.budget) ||
                !Number.isFinite(value.googleShare) ||
                value.budget < 2500 ||
                value.budget > 10000 ||
                value.googleShare < 20 ||
                value.googleShare > 80
              )
                throw new Error(
                  "Budget must be 2500–10000 and Google share 20–80.",
                );
              flushSync(() =>
                setScenario({
                  budget: value.budget,
                  googleShare: value.googleShare,
                }),
              );
              const result = calculateScenario(value);
              return {
                demo: true,
                budget: value.budget,
                googleShare: value.googleShare,
                customers: result.customers,
                revenue: result.revenue,
                CAC: result.CAC,
                ROAS: result.ROAS,
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {});
    } catch {}
    return () => lifecycle.abort();
  }, []);
  return (
    <>
      <section className="lab-section wrap" id="system">
        <div className="lab-heading">
          <p className="eyebrow">01 / THE ACQUISITION SYSTEM</p>
          <h2>
            {l.title[0]}
            <br />
            <span>{l.title[1]}</span>
          </h2>
          <p>{l.intro}</p>
        </div>
        <div className="lab-shell">
          <div className="lab-toolbar">
            <span className="demo-label">{l.demo}</span>
            <button
              onClick={() => {
                setScenario(initialScenario);
                setMetric("CAC");
                setHover(null);
              }}
            >
              {l.reset} ↺
            </button>
          </div>
          <div className="lab-sources">
            <div>
              <span className="channel-number">01</span>
              <div>
                <h3>Google Ads</h3>
                <p>SEARCH → QUERY → INTENT</p>
              </div>
              <span className="channel-amount">
                {money(r.google.spend)}
                <small>{fmt(scenario.googleShare)}%</small>
              </span>
            </div>
            <div>
              <span className="channel-number">02</span>
              <div>
                <h3>ChatGPT Ads</h3>
                <p>CONVERSATION → CONTEXT → INTENT</p>
              </div>
              <span className="channel-amount">
                {money(r.chatgpt.spend)}
                <small>{fmt(100 - scenario.googleShare)}%</small>
              </span>
            </div>
          </div>
          <div className="source-merge" aria-hidden="true">
            <span />
            <b>4</b>
            <span />
          </div>
          <div className="lab-workspace">
            <div className="lab-pipeline">
              <div className="budget-control">
                <div>
                  <label id="budget-label">{l.adjust}</label>
                  <output>{money(scenario.budget)}</output>
                </div>
                <Slider
                  aria-labelledby="budget-label"
                  aria-valuetext={money(scenario.budget)}
                  min={2500}
                  max={10000}
                  step={250}
                  value={[scenario.budget]}
                  onValueChange={([budget]) =>
                    setScenario((s) => ({ ...s, budget }))
                  }
                />
                <div className="slider-limits">
                  <span>€2.500</span>
                  <span>€10.000</span>
                </div>
              </div>
              <div className="stage-list" onMouseLeave={() => setHover(null)}>
                {stageIds.map((id, i) => (
                  <button
                    className={`acq-stage ${relations[active].includes(id) ? "connected" : ""} ${metric === id ? "chosen" : ""}`}
                    key={id}
                    onClick={() => selectMetric(id)}
                    onMouseEnter={() => setHover(id)}
                    onFocus={() => setHover(id)}
                    onBlur={() => setHover(null)}
                    aria-pressed={metric === id}
                  >
                    <span className="stage-order">0{i + 1}</span>
                    <span className="stage-label">{labels[id]}</span>
                    <strong>{metricValue(id)}</strong>
                    <span className="stage-arrow" aria-hidden="true">
                      {i === 5 ? "↗" : "↓"}
                    </span>
                  </button>
                ))}
              </div>
              <div className="roas-summary">
                <span>RETURN ON AD SPEND</span>
                <strong>{metricValue("ROAS")}</strong>
                <button aria-label="ROAS" onClick={() => selectMetric("ROAS")}>
                  ↗
                </button>
              </div>
            </div>
            <aside className="metric-inspector" aria-label={l.linked}>
              <div className="inspector-kpis">
                {metricIds.map((id) => (
                  <button
                    key={id}
                    className={metric === id ? "selected" : ""}
                    onClick={() => selectMetric(id)}
                    aria-pressed={metric === id}
                  >
                    {id}
                  </button>
                ))}
              </div>
              <div className="inspector-detail" aria-live="polite">
                <p className="eyebrow">{labels[active]}</p>
                <strong className="inspector-value">
                  {metricValue(active)}
                </strong>
                <div className="inspector-formula">
                  <span>{formulas[active]}</span>
                  <code>
                    {equations[active]} = {metricValue(active)}
                  </code>
                </div>
                <p>{detail}</p>
                <div className="scenario-delta">
                  <strong>
                    {diff > 0 ? "↑" : diff < 0 ? "↓" : "="}{" "}
                    {fmt(Math.abs(diff), 1)}%
                  </strong>
                  <span>{l.baseline}</span>
                </div>
              </div>
              <p className="inspector-help">{l.inspect}</p>
            </aside>
          </div>
          <details className="model-assumptions">
            <summary>
              {l.assumptionTitle}
              <span>+</span>
            </summary>
            <div className="assumptions-content">
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>{l.assumptionTitle}</th>
                      <th>Google Ads</th>
                      <th>ChatGPT Ads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {l.assumptions.map((label, i) => (
                      <tr key={label}>
                        <th>{label}</th>
                        {[demoAssumptions.google, demoAssumptions.chatgpt].map(
                          (a, j) => (
                            <td key={j}>
                              {i === 0
                                ? money(a.cpc, 2)
                                : i === 1
                                  ? `${fmt(a.cvr * 100, 1)}%`
                                  : i === 2
                                    ? `${fmt(a.closeRate * 100)}%`
                                    : i === 3
                                      ? money(a.customerRevenue)
                                      : `${fmt(a.ctr * 100, 1)}%`}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>{l.assumptionNote}</p>
            </div>
          </details>
        </div>
      </section>
      <section className="allocation-section wrap" id="allocation">
        <div className="lab-heading">
          <p className="eyebrow">02 / BUDGET ALLOCATION</p>
          <h2>
            {l.allocationTitle[0]}
            <br />
            <span>{l.allocationTitle[1]}</span>
          </h2>
          <p>{l.allocationIntro}</p>
        </div>
        <div className="allocation-layout">
          <div className="allocation-interface">
            <div className="allocation-top">
              <span className="eyebrow">{l.labels[0]}</span>
              <strong>{money(scenario.budget)}</strong>
            </div>
            <div
              className="allocation-bar"
              aria-label={`Google Ads ${scenario.googleShare}%, ChatGPT Ads ${100 - scenario.googleShare}%`}
            >
              <span style={{ width: `${scenario.googleShare}%` }}>
                {fmt(scenario.googleShare)}%
              </span>
              <span style={{ width: `${100 - scenario.googleShare}%` }}>
                {fmt(100 - scenario.googleShare)}%
              </span>
            </div>
            <label className="allocation-slider-label" id="allocation-label">
              {l.allocationLabel}
            </label>
            <Slider
              aria-labelledby="allocation-label"
              aria-valuetext={`${scenario.googleShare}% Google Ads`}
              min={20}
              max={80}
              step={5}
              value={[scenario.googleShare]}
              onValueChange={([googleShare]) =>
                setScenario((s) => ({ ...s, googleShare }))
              }
            />
            <div className="allocation-channels">
              {[r.google, r.chatgpt].map((ch, i) => (
                <div key={i}>
                  <p className="eyebrow">
                    0{i + 1} / {i ? "CHATGPT ADS" : "GOOGLE ADS"}
                  </p>
                  <strong>{money(ch.spend)}</strong>
                  <dl>
                    <div>
                      <dt>CPA</dt>
                      <dd>{money(ch.CPA, 2)}</dd>
                    </div>
                    <div>
                      <dt>CVR</dt>
                      <dd>{fmt(ch.CVR, 1)}%</dd>
                    </div>
                    <div>
                      <dt>{l.labels[4]}</dt>
                      <dd>{ch.customers}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
            <p className="per-euro">
              {l.perEuro}:{" "}
              <strong>{fmt(scenario.googleShare / 100, 2)} € Google</strong> /{" "}
              <strong>
                {fmt((100 - scenario.googleShare) / 100, 2)} € ChatGPT
              </strong>
            </p>
            <div className="allocation-result">
              <div>
                <span>CAC</span>
                <strong>{metricValue("CAC")}</strong>
              </div>
              <div>
                <span>ROAS</span>
                <strong>{metricValue("ROAS")}</strong>
              </div>
              <small>{l.demo}</small>
            </div>
          </div>
          <div className="decision-interface">
            <div
              className="decision-list"
              role="group"
              aria-label={l.demoDecision}
            >
              {l.steps.map(([title, body], i) => (
                <button
                  key={title}
                  aria-pressed={decision === i}
                  className={decision === i ? "active" : ""}
                  onClick={() => setDecision(i)}
                >
                  <span>0{i + 1}</span>
                  <strong>{title}</strong>
                  <span className="decision-toggle">
                    {decision === i ? "−" : "+"}
                  </span>
                  {decision === i && <p>{body}</p>}
                </button>
              ))}
            </div>
            <div className="decision-note">
              <span className="eyebrow">{l.demoDecision}</span>
              <p>{l.decision}</p>
            </div>
          </div>
        </div>
      </section>
      <MonthlyCycle lang={lang} />
    </>
  );
}
export function MonthlyCycle({ lang }: { lang: Locale }) {
  const l = labCopy(lang),
    c = copy(lang);
  return (
    <section className="monthly-section wrap" id="management">
      <div className="lab-heading">
        <p className="eyebrow">03 / 30 DAYS OF MANAGEMENT</p>
        <h2>
          {l.cycleTitle[0]}
          <br />
          <span>{l.cycleTitle[1]}</span>
        </h2>
        <p>{l.cycleIntro}</p>
      </div>
      <div className="management-fees">
        <span>
          Google Ads <strong>€{business.pricing.googleAds.monthly}</strong>{" "}
          {c.month}
        </span>
        <span>
          ChatGPT Ads <strong>€{business.pricing.chatgptAds.monthly}</strong>{" "}
          {c.month}
        </span>
        <span>{c.media}</span>
      </div>
      <Tabs defaultValue="0" className="monthly-tabs">
        <TabsList aria-label="Monthly operating cycle">
          {l.weeks.map(([title], i) => (
            <TabsTrigger key={i} value={String(i)}>
              <span>W0{i + 1}</span>
              <strong>{title}</strong>
              <span className="week-days">
                {String(i * 7 + 1).padStart(2, "0")}—
                {i === 3 ? "30" : String((i + 1) * 7).padStart(2, "0")}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        {l.weeks.map(([title, body, outcome], i) => (
          <TabsContent value={String(i)} key={i}>
            <div className="week-detail">
              <div className="week-number" aria-hidden="true">
                0{i + 1}
                <span>/ 04</span>
              </div>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <div className="week-output">
                <p className="eyebrow">{l.outcome}</p>
                <p>{outcome}</p>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <p className="cycle-note">{l.cycleNote}</p>
    </section>
  );
}
