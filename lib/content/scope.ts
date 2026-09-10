import type { Locale } from "@/lib/config";
import { tr } from "./copy";
export function scopeCopy(lang: Locale, chat: boolean) {
  return {
    setupTitle: tr(
      lang,
      "SETUP ENTHÄLT",
      "SETUP INCLUDES",
      "НАЛАШТУВАННЯ ВКЛЮЧАЄ",
      "НАСТРОЙКА ВКЛЮЧАЕТ",
    ),
    ongoingTitle: tr(
      lang,
      "LAUFENDES MANAGEMENT",
      "ONGOING MANAGEMENT",
      "ПОСТІЙНЕ УПРАВЛІННЯ",
      "ПОСТОЯННОЕ УПРАВЛЕНИЕ",
    ),
    setup: chat
      ? tr(
          lang,
          [
            "Geschäfts- und Angebotsanalyse",
            "Intent- und Kontextstrategie",
            "Kampagnenarchitektur",
            "Messkonzept und Einrichtung",
            "Konfiguration verfügbarer Kampagnenformate",
            "Erster Start nach Zugangsprüfung",
          ],
          [
            "Business and offer review",
            "Intent and context strategy",
            "Campaign architecture",
            "Measurement planning and setup",
            "Configuration of available campaign formats",
            "Initial launch after access verification",
          ],
          [
            "Аналіз бізнесу та пропозиції",
            "Стратегія наміру й контексту",
            "Архітектура кампаній",
            "Планування та налаштування вимірювання",
            "Налаштування доступних форматів",
            "Перший запуск після перевірки доступу",
          ],
          [
            "Анализ бизнеса и предложения",
            "Стратегия намерения и контекста",
            "Архитектура кампаний",
            "Планирование и настройка измерения",
            "Настройка доступных форматов",
            "Первый запуск после проверки доступа",
          ],
        )
      : tr(
          lang,
          [
            "Geschäfts- und Angebotsanalyse",
            "Suchintention und Keyword-Recherche",
            "Kampagnenarchitektur",
            "Kampagnen- und Anzeigen-Setup",
            "Conversion-Messung einrichten und prüfen",
            "Erster Kampagnenstart",
          ],
          [
            "Business and offer review",
            "Search intent and keyword research",
            "Campaign architecture",
            "Campaign and ad setup",
            "Conversion measurement setup and validation",
            "Initial campaign launch",
          ],
          [
            "Аналіз бізнесу та пропозиції",
            "Дослідження пошукового наміру й ключових слів",
            "Архітектура кампаній",
            "Налаштування кампаній та оголошень",
            "Налаштування та перевірка конверсій",
            "Перший запуск кампанії",
          ],
          [
            "Анализ бизнеса и предложения",
            "Исследование поисковых запросов и ключевых слов",
            "Архитектура кампаний",
            "Настройка кампаний и объявлений",
            "Настройка и проверка конверсий",
            "Первый запуск кампании",
          ],
        ),
    ongoing: chat
      ? tr(
          lang,
          [
            "Kampagnen-Monitoring",
            "Performance-Analyse",
            "Budgetverteilung",
            "Optimierung verfügbarer Stellgrößen",
            "Messung und Datenprüfung",
            "Reporting",
          ],
          [
            "Campaign monitoring",
            "Performance analysis",
            "Budget allocation",
            "Optimization of available controls",
            "Measurement and data validation",
            "Reporting",
          ],
          [
            "Моніторинг кампаній",
            "Аналіз ефективності",
            "Розподіл бюджету",
            "Оптимізація доступних параметрів",
            "Вимірювання та перевірка даних",
            "Звітність",
          ],
          [
            "Мониторинг кампаний",
            "Анализ эффективности",
            "Распределение бюджета",
            "Оптимизация доступных параметров",
            "Измерение и проверка данных",
            "Отчётность",
          ],
        )
      : tr(
          lang,
          [
            "Suchbegriffe analysieren",
            "Negative Keywords pflegen",
            "Budgetverteilung",
            "Gebotsoptimierung",
            "Kampagnenoptimierung",
            "Performance-Monitoring und Reporting",
          ],
          [
            "Search-term analysis",
            "Negative keyword maintenance",
            "Budget allocation",
            "Bidding optimization",
            "Campaign optimization",
            "Performance monitoring and reporting",
          ],
          [
            "Аналіз пошукових запитів",
            "Робота з мінус-словами",
            "Розподіл бюджету",
            "Оптимізація ставок",
            "Оптимізація кампаній",
            "Моніторинг ефективності та звітність",
          ],
          [
            "Анализ поисковых запросов",
            "Работа с минус-словами",
            "Распределение бюджета",
            "Оптимизация ставок",
            "Оптимизация кампаний",
            "Мониторинг эффективности и отчётность",
          ],
        ),
  };
}
