import { type Locale } from "../config";
import { tr } from "./copy";
export const metricIds = ["CTR", "CPC", "CVR", "CPA", "CAC", "ROAS"] as const;
export const metricNames = [
  "Click-through rate",
  "Cost per click",
  "Conversion rate",
  "Cost per action",
  "Customer acquisition cost",
  "Return on ad spend",
];
export function measurementCopy(l: Locale) {
  return {
    title: tr(
      l,
      "Erst messen. Dann entscheiden.",
      "Measure first. Then decide.",
      "Спочатку виміряти. Потім вирішувати.",
      "Сначала измерить. Затем решать.",
    ),
    intro: tr(
      l,
      "Wir verbinden Werbedaten mit Anfragen, Käufen und Ihrer Geschäftsperspektive. Jede Kennzahl beantwortet eine andere Frage.",
      "We connect advertising data with inquiries, purchases and your business context. Each metric answers a different question.",
      "Поєднуємо рекламні дані із запитами, покупками та контекстом бізнесу. Кожен показник відповідає на окреме запитання.",
      "Связываем рекламные данные с заявками, покупками и контекстом бизнеса. Каждый показатель отвечает на отдельный вопрос.",
    ),
    stages: tr(
      l,
      [
        "Werbeausgaben",
        "Impressionen",
        "Klicks",
        "Conversions",
        "Neue Kunden",
        "Umsatz",
      ],
      [
        "Ad spend",
        "Impressions",
        "Clicks",
        "Conversions",
        "New customers",
        "Revenue",
      ],
      [
        "Рекламні витрати",
        "Покази",
        "Кліки",
        "Конверсії",
        "Нові клієнти",
        "Дохід",
      ],
      [
        "Рекламные расходы",
        "Показы",
        "Клики",
        "Конверсии",
        "Новые клиенты",
        "Выручка",
      ],
    ),
    source: tr(
      l,
      ["Werbeplattform", "Website / Ereignisse", "CRM / Verkauf"],
      ["Ad platform", "Website / events", "CRM / sales"],
      ["Рекламна платформа", "Сайт / події", "CRM / продажі"],
      ["Рекламная платформа", "Сайт / события", "CRM / продажи"],
    ),
    labels: tr(
      l,
      ["Formel", "Geschäftsfrage", "Einfluss & Grenzen"],
      ["Formula", "Business question", "Influences & limits"],
      ["Формула", "Питання бізнесу", "Вплив і обмеження"],
      ["Формула", "Вопрос бизнеса", "Влияние и ограничения"],
    ),
    metrics: tr(
      l,
      [
        [
          "Klicks ÷ Impressionen × 100 %",
          "Wird die Anzeige als relevant wahrgenommen?",
          "Angebot, Suchintention und Anzeigeninhalt beeinflussen die Klickrate. Eine hohe CTR belegt weder Leadqualität noch Profitabilität.",
        ],
        [
          "Werbeausgaben ÷ Klicks",
          "Was kostet der eingekaufte Besuch?",
          "Auktion, Wettbewerb, Ausrichtung und Gebote beeinflussen CPC. Ein günstiger Klick kann trotzdem unpassend sein.",
        ],
        [
          "Conversions ÷ Klicks × 100 %",
          "Wird aus dem Klick die vereinbarte Zielaktion?",
          "Angebot, Landingpage und Messqualität beeinflussen CVR. Hier ist die Basis Klicks; andere Berichte verwenden Sitzungen. Nur gleiche Definitionen vergleichen.",
        ],
        [
          "Werbeausgaben ÷ Conversions",
          "Was kostet eine definierte Zielaktion?",
          "Traffic, Website und Conversion-Definition beeinflussen CPA. Eine Formularanfrage ist kein gewonnener Kunde.",
        ],
        [
          "Gesamte Akquisitionskosten ÷ neue Kunden",
          "Was kostet ein tatsächlich gewonnener Kunde?",
          "Werbung, Betreuung und relevante Vertriebsaufwände gehören zum vereinbarten Kostenumfang. Abschlussrate und Zeitverzug berücksichtigen; CRM-Daten sind nötig.",
        ],
        [
          "Zugeordneter Umsatz ÷ Werbeausgaben",
          "Wie viel Umsatz wird den Werbeausgaben zugeordnet?",
          "Attributionsmodell, Zeitfenster und Retouren verändern die Sicht. ROAS zeigt keinen Gewinn: Marge und weitere Kosten fehlen.",
        ],
      ],
      [
        [
          "Clicks ÷ impressions × 100%",
          "Does the ad appear relevant?",
          "Offer, intent and ad copy influence CTR. A high rate proves neither lead quality nor profitability.",
        ],
        [
          "Ad spend ÷ clicks",
          "What does an acquired visit cost?",
          "Auction dynamics, competition, targeting and bids influence CPC. Cheap clicks may still be unsuitable.",
        ],
        [
          "Conversions ÷ clicks × 100%",
          "Does a click become the agreed target action?",
          "Offer, landing page and measurement influence CVR. This definition uses clicks; some reports use sessions. Compare like definitions.",
        ],
        [
          "Ad spend ÷ conversions",
          "What does a defined target action cost?",
          "Traffic, website and conversion definition influence CPA. A form submission is not a won customer.",
        ],
        [
          "Total acquisition costs ÷ new customers",
          "What does a won customer cost?",
          "Include advertising, management and relevant sales costs in the agreed scope. Account for close rate and time lag; CRM data is needed.",
        ],
        [
          "Attributed revenue ÷ ad spend",
          "How much revenue is attributed to advertising?",
          "Attribution model, window and refunds change the view. ROAS is not profit: margin and other costs are missing.",
        ],
      ],
      [
        [
          "Кліки ÷ покази × 100 %",
          "Чи сприймають рекламу як релевантну?",
          "Пропозиція, намір і текст впливають на CTR. Висока частка кліків не доводить якість лідів або прибутковість.",
        ],
        [
          "Рекламні витрати ÷ кліки",
          "Скільки коштує залучений візит?",
          "Аукціон, конкуренція, націлювання та ставки впливають на CPC. Дешевий клік може бути нецільовим.",
        ],
        [
          "Конверсії ÷ кліки × 100 %",
          "Чи стає клік погодженою цільовою дією?",
          "Впливають пропозиція, сторінка та якість вимірювання. Тут база — кліки; інші звіти використовують сесії. Порівнюємо однакові визначення.",
        ],
        [
          "Рекламні витрати ÷ конверсії",
          "Скільки коштує визначена цільова дія?",
          "Впливають трафік, сайт і визначення конверсії. Заявка ще не є клієнтом.",
        ],
        [
          "Усі витрати на залучення ÷ нові клієнти",
          "Скільки коштує залучений клієнт?",
          "У погоджений склад витрат входять реклама, управління й релевантні витрати продажів. Враховуємо закриття угод і затримку; потрібні дані CRM.",
        ],
        [
          "Атрибутований дохід ÷ рекламні витрати",
          "Який дохід віднесено до реклами?",
          "Модель атрибуції, період і повернення змінюють оцінку. ROAS не показує прибуток: бракує маржі та інших витрат.",
        ],
      ],
      [
        [
          "Клики ÷ показы × 100 %",
          "Воспринимают ли рекламу как релевантную?",
          "Предложение, намерение и текст влияют на CTR. Высокая доля кликов не доказывает качество лидов или прибыльность.",
        ],
        [
          "Рекламные расходы ÷ клики",
          "Сколько стоит привлечённый визит?",
          "Аукцион, конкуренция, таргетинг и ставки влияют на CPC. Дешёвый клик может быть нецелевым.",
        ],
        [
          "Конверсии ÷ клики × 100 %",
          "Становится ли клик согласованным целевым действием?",
          "Влияют предложение, страница и качество измерения. Здесь база — клики; другие отчёты используют сессии. Сравниваем одинаковые определения.",
        ],
        [
          "Рекламные расходы ÷ конверсии",
          "Сколько стоит определённое целевое действие?",
          "Влияют трафик, сайт и определение конверсии. Заявка ещё не является клиентом.",
        ],
        [
          "Все затраты на привлечение ÷ новые клиенты",
          "Сколько стоит привлечённый клиент?",
          "В согласованный состав затрат входят реклама, управление и релевантные расходы продаж. Учитываем закрытие сделок и задержку; нужны данные CRM.",
        ],
        [
          "Атрибутированная выручка ÷ рекламные расходы",
          "Какая выручка отнесена к рекламе?",
          "Модель атрибуции, период и возвраты меняют оценку. ROAS не показывает прибыль: не учтены маржа и другие затраты.",
        ],
      ],
    ),
    boundary: tr(
      l,
      "Für einen belastbaren Vergleich stimmen wir Ereignisse, Zeiträume und Attribution ab. Fehlen Daten, bleibt die Frage offen.",
      "Reliable comparisons need aligned events, periods and attribution. Missing data means an unanswered question.",
      "Для надійного порівняння узгоджуємо події, періоди й атрибуцію. Без даних питання залишається відкритим.",
      "Для надёжного сравнения согласуем события, периоды и атрибуцию. Без данных вопрос остаётся открытым.",
    ),
    diagnostics: tr(
      l,
      [
        [
          "Unpassende Anfragen",
          "Google Ads",
          "",
          "Welche Suchbegriffe bringen die falschen Besucher?",
          "Unpassende Begriffe ausschließen und Anzeigen präzisieren.",
          "Prüfen, ob die nächsten Anfragen besser zum Angebot passen.",
        ],
        [
          "Anfragen werden teurer",
          "Kosten pro Anfrage",
          "",
          "Liegt es an Klickkosten, Website oder fehlerhafter Messung?",
          "Die bestätigte Ursache gezielt bearbeiten.",
          "Kosten und Anfragequalität im gleichen Zeitraum vergleichen.",
        ],
        [
          "Mehr Budget einsetzen?",
          "Budgetentscheidung",
          "",
          "Passen Kosten, Marge und Ihre Kapazität zusammen?",
          "Nur mit belastbaren Daten schrittweise mehr Budget testen.",
          "Zusätzliche Kunden bewerten; bei Bedarf reduzieren oder stoppen.",
        ],
      ],
      [
        [
          "The wrong inquiries",
          "Google Ads",
          "",
          "Which search terms attract the wrong visitors?",
          "Exclude irrelevant terms and make ads more precise.",
          "Check whether new inquiries fit the offer better.",
        ],
        [
          "Inquiries cost more",
          "Cost per inquiry",
          "",
          "Is it click cost, the website or incorrect tracking?",
          "Address the confirmed cause.",
          "Compare cost and inquiry quality over matching periods.",
        ],
        [
          "Increase the budget?",
          "Budget decision",
          "",
          "Do costs, margin and capacity support it?",
          "Test gradual increases only with reliable data.",
          "Review additional customers; reduce or stop if needed.",
        ],
      ],
      [
        [
          "Нецільові запити",
          "Google Ads",
          "",
          "Які пошукові запити приводять не тих відвідувачів?",
          "Виключаємо нецільові запити й уточнюємо оголошення.",
          "Перевіряємо, чи нові звернення краще відповідають пропозиції.",
        ],
        [
          "Заявки дорожчають",
          "Вартість заявки",
          "",
          "Причина у вартості кліків, сайті чи помилці вимірювання?",
          "Працюємо з підтвердженою причиною.",
          "Порівнюємо вартість і якість заявок за однакові періоди.",
        ],
        [
          "Збільшити бюджет?",
          "Рішення про бюджет",
          "",
          "Чи дозволяють це витрати, маржа й ресурси?",
          "Поступово тестуємо збільшення лише за надійними даними.",
          "Оцінюємо додаткових клієнтів; за потреби зменшуємо або зупиняємо.",
        ],
      ],
      [
        [
          "Нецелевые обращения",
          "Google Ads",
          "",
          "Какие поисковые запросы приводят не тех посетителей?",
          "Исключаем нецелевые запросы и уточняем объявления.",
          "Проверяем, лучше ли новые обращения соответствуют предложению.",
        ],
        [
          "Заявки дорожают",
          "Стоимость заявки",
          "",
          "Причина в цене кликов, сайте или ошибке измерения?",
          "Работаем с подтверждённой причиной.",
          "Сравниваем стоимость и качество заявок за одинаковые периоды.",
        ],
        [
          "Увеличить бюджет?",
          "Решение о бюджете",
          "",
          "Позволяют ли это затраты, маржа и ресурсы?",
          "Постепенно тестируем увеличение только по надёжным данным.",
          "Оцениваем дополнительных клиентов; при необходимости сокращаем или останавливаем.",
        ],
      ],
    ),
    operations: tr(
      l,
      [
        [
          "Anzeigen & Suchbegriffe",
          "Google Ads: Suchbegriffe prüfen, negative Keywords pflegen und Anzeigen überarbeiten.",
          "Passendere Ausrichtung auf Ihre Leistungen.",
        ],
        [
          "Budget & Gebote",
          "Ausgaben kontrollieren und Gebote anhand der Kampagnendaten anpassen.",
          "Budgetentscheidungen mit klarer Begründung.",
        ],
        [
          "Messung & Tests",
          "Conversion-Tracking prüfen und gezielte Änderungen testen.",
          "Nachvollziehbar prüfen, was funktioniert.",
        ],
        [
          "Bericht & nächste Schritte",
          "Ergebnisse, Änderungen und nächste Maßnahmen zusammenfassen.",
          "Ein verständlicher Überblick über die laufende Arbeit.",
        ],
      ],
      [
        [
          "Ads & search terms",
          "Google Ads: review queries, maintain negative keywords and revise ads.",
          "Targeting better aligned with your services.",
        ],
        [
          "Budget & bids",
          "Monitor spend and adjust bids using campaign data.",
          "Budget decisions with a clear reason.",
        ],
        [
          "Measurement & tests",
          "Check conversion tracking and test focused changes.",
          "A clear way to evaluate what works.",
        ],
        [
          "Report & next steps",
          "Summarize results, changes and upcoming actions.",
          "An understandable overview of ongoing work.",
        ],
      ],
      [
        [
          "Оголошення й запити",
          "Google Ads: перевіряємо запити, додаємо мінус-слова, оновлюємо оголошення.",
          "Точніше націлювання на ваші послуги.",
        ],
        [
          "Бюджет і ставки",
          "Контролюємо витрати та коригуємо ставки за даними кампаній.",
          "Бюджетні рішення зі зрозумілим обґрунтуванням.",
        ],
        [
          "Вимірювання й тести",
          "Перевіряємо трекінг конверсій і тестуємо конкретні зміни.",
          "Зрозуміла перевірка того, що працює.",
        ],
        [
          "Звіт і наступні кроки",
          "Підсумовуємо результати, зміни та наступні дії.",
          "Зрозумілий огляд поточної роботи.",
        ],
      ],
      [
        [
          "Объявления и запросы",
          "Google Ads: проверяем запросы, добавляем минус-слова, обновляем объявления.",
          "Более точное соответствие вашим услугам.",
        ],
        [
          "Бюджет и ставки",
          "Контролируем расходы и корректируем ставки по данным кампаний.",
          "Бюджетные решения с понятным обоснованием.",
        ],
        [
          "Измерение и тесты",
          "Проверяем трекинг конверсий и тестируем конкретные изменения.",
          "Понятная проверка того, что работает.",
        ],
        [
          "Отчёт и следующие шаги",
          "Подводим итоги по результатам, изменениям и следующим действиям.",
          "Понятный обзор текущей работы.",
        ],
      ],
    ),
  };
}
