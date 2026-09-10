import { tr, copy } from "./copy";
import type { Locale } from "@/lib/config";
export function serviceCopy(lang: Locale, chat: boolean) {
  const c = copy(lang);
  return {
    title: chat
      ? tr(
          lang,
          "Wenn aus einem Gespräch\nNachfrage entsteht.",
          "When a conversation\nbecomes demand.",
          "Коли розмова\nформує попит.",
          "Когда разговор\nформирует спрос.",
        )
      : tr(
          lang,
          "Da sein, wenn\nder Bedarf da ist.",
          "Be there when\nthe need is real.",
          "Бути поруч, коли\nвиникає потреба.",
          "Быть рядом, когда\nвозникает потребность.",
        ),
    intro: chat ? c.chatShort : c.googleShort,
    steps: chat
      ? ["CONVERSATION", "CONTEXT", "INTENT", "AD OPPORTUNITY", "CONVERSION"]
      : ["SEARCH", "QUERY", "INTENT", "AD", "CONVERSION"],
    section: chat
      ? tr(
          lang,
          "Ein neuer Kontext. Ein eigener Ansatz.",
          "A different context. A distinct approach.",
          "Інший контекст. Окремий підхід.",
          "Другой контекст. Отдельный подход.",
        )
      : tr(
          lang,
          "Von der Suchanfrage bis zur Kundenqualität.",
          "From search query to customer quality.",
          "Від пошукового запиту до якості клієнта.",
          "От поискового запроса до качества клиента.",
        ),
    body: chat
      ? tr(
          lang,
          "In Gesprächen können Menschen ihren Bedarf präzisieren, Optionen abwägen und Entscheidungen vorbereiten. Das ist ein anderer Nutzungskontext als die Eingabe eines Suchbegriffs. Wir prüfen zuerst, ob dieser Kontext, Ihr Angebot und der tatsächlich verfügbare Werbezugang zusammenpassen.",
          "In conversations, people can refine needs, compare options and prepare decisions. That is a different context from entering a search query. We first assess the fit between that context, your offer and the advertising access actually available.",
          "У розмові люди можуть уточнювати потреби, порівнювати варіанти й готувати рішення. Це інший контекст, ніж введення пошукового запиту. Спочатку перевіряємо відповідність цього контексту вашій пропозиції та реально доступним рекламним можливостям.",
          "В разговоре люди могут уточнять потребности, сравнивать варианты и готовить решения. Это другой контекст, чем ввод поискового запроса. Сначала проверяем соответствие контекста вашему предложению и реально доступным рекламным возможностям.",
        )
      : tr(
          lang,
          "Eine relevante Suchanfrage ist ein guter Anfang. Wirtschaftlich wird sie erst, wenn Angebot, Anzeige und Zielseite zusammenpassen. Deshalb beginnt die Arbeit bei Ihrem Geschäftsmodell und endet nicht beim Klickbericht.",
          "A relevant search is a good starting point. It becomes commercially useful when offer, ad and landing page align. That is why the work starts with your business model and does not end with a click report.",
          "Релевантний запит — добрий початок. Він стає корисним для бізнесу, коли пропозиція, оголошення та цільова сторінка узгоджені. Тому робота починається з бізнес-моделі й не закінчується звітом про кліки.",
          "Релевантный запрос — хорошее начало. Он становится полезным для бизнеса, когда предложение, объявление и целевая страница согласованы. Поэтому работа начинается с бизнес-модели и не заканчивается отчётом о кликах.",
        ),
    work: chat
      ? tr(
          lang,
          [
            [
              "Eignung prüfen",
              "Zielmarkt, Angebotskategorie, Kontozugang und aktuell mögliche Formate klären. Ohne nutzbaren Zugang kein zugesagter Kampagnenstart.",
            ],
            [
              "Test definieren",
              "Eine klare Hypothese, ein begrenztes Testbudget und eine messbare Zielaktion festlegen.",
            ],
            [
              "Umsetzung abstimmen",
              "Anzeigen und Zielseiten auf die tatsächlich verfügbaren Vorgaben ausrichten. Tracking und Datenschutz vor Aktivierung prüfen.",
            ],
            [
              "Ergebnisse bewerten",
              "Verfügbare Signale, Conversion-Qualität und Geschäftswert auswerten. Grenzen der Attribution transparent benennen.",
            ],
          ],
          [
            [
              "Assess eligibility",
              "Check market, offer category, account access and available formats. No promised campaign launch without usable access.",
            ],
            [
              "Define the test",
              "Set a clear hypothesis, a bounded test budget and a measurable target action.",
            ],
            [
              "Align execution",
              "Adapt ads and destinations to actual platform requirements. Review tracking and privacy before activation.",
            ],
            [
              "Evaluate outcomes",
              "Review available signals, conversion quality and business value. State attribution limitations clearly.",
            ],
          ],
          [
            [
              "Перевірити відповідність",
              "Уточнити ринок, категорію, доступ до акаунта та формати. Без робочого доступу запуск не обіцяємо.",
            ],
            [
              "Визначити тест",
              "Сформулювати гіпотезу, обмежений тестовий бюджет і вимірювану цільову дію.",
            ],
            [
              "Узгодити реалізацію",
              "Адаптувати оголошення й сторінки до фактичних вимог. Перевірити вимірювання та приватність до запуску.",
            ],
            [
              "Оцінити результати",
              "Аналізувати доступні сигнали, якість конверсій та бізнес-цінність. Відкрито вказувати межі атрибуції.",
            ],
          ],
          [
            [
              "Проверить соответствие",
              "Уточнить рынок, категорию, доступ к аккаунту и форматы. Без рабочего доступа запуск не обещаем.",
            ],
            [
              "Определить тест",
              "Сформулировать гипотезу, ограниченный тестовый бюджет и измеримое целевое действие.",
            ],
            [
              "Согласовать реализацию",
              "Адаптировать объявления и страницы к фактическим требованиям. Проверить измерение и приватность до запуска.",
            ],
            [
              "Оценить результаты",
              "Анализировать доступные сигналы, качество конверсий и ценность для бизнеса. Открыто указывать ограничения атрибуции.",
            ],
          ],
        )
      : tr(
          lang,
          [
            [
              "Angebot & Suchintention",
              "Geschäft, Angebot, Zielgruppe und Kundenökonomie verstehen. Keywords und Suchintentionen nach Relevanz strukturieren.",
            ],
            [
              "Struktur & Setup",
              "Kampagnen, Anzeigengruppen, Anzeigen und Ausschluss-Keywords aufbauen. Conversion-Tracking vor dem Start prüfen.",
            ],
            [
              "Launch & Optimierung",
              "Suchbegriffe analysieren, irrelevante Anfragen ausschließen, Budget und Gebote auf belastbarer Datenbasis anpassen.",
            ],
            [
              "Messung & Reporting",
              "Kosten und Conversions einordnen. Qualifizierte Anfragen und tatsächliche Kunden einbeziehen, wenn die Daten vorliegen.",
            ],
          ],
          [
            [
              "Offer & search intent",
              "Understand the business, offer, audience and customer economics. Structure keywords and intent by relevance.",
            ],
            [
              "Structure & setup",
              "Build campaigns, ad groups, ads and negative keywords. Validate conversion tracking before launch.",
            ],
            [
              "Launch & optimization",
              "Analyze search terms, exclude irrelevant queries and adjust budget and bids using reliable data.",
            ],
            [
              "Measurement & reporting",
              "Interpret costs and conversions. Include qualified inquiries and actual customers when data is available.",
            ],
          ],
          [
            [
              "Пропозиція та пошуковий намір",
              "Зрозуміти бізнес, пропозицію, аудиторію й економіку клієнта. Структурувати ключові слова за релевантністю.",
            ],
            [
              "Структура та налаштування",
              "Побудувати кампанії, групи, оголошення й мінус-слова. Перевірити відстеження конверсій до старту.",
            ],
            [
              "Запуск та оптимізація",
              "Аналізувати пошукові запити, виключати нерелевантні та коригувати бюджет і ставки на основі даних.",
            ],
            [
              "Вимірювання та звітність",
              "Оцінювати витрати й конверсії. Враховувати цільові запити та реальних клієнтів за наявності даних.",
            ],
          ],
          [
            [
              "Предложение и поисковый запрос",
              "Понять бизнес, предложение, аудиторию и экономику клиента. Структурировать ключевые слова по релевантности.",
            ],
            [
              "Структура и настройка",
              "Построить кампании, группы, объявления и минус-слова. Проверить отслеживание конверсий до старта.",
            ],
            [
              "Запуск и оптимизация",
              "Анализировать поисковые запросы, исключать нерелевантные и корректировать бюджет и ставки по данным.",
            ],
            [
              "Измерение и отчётность",
              "Оценивать расходы и конверсии. Учитывать целевые запросы и реальных клиентов при наличии данных.",
            ],
          ],
        ),
  };
}
