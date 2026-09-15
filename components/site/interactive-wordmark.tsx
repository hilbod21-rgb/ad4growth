"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { type Locale } from "@/lib/config";

export function InteractiveWordmark({ lang }: { lang: Locale }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(node);
    const animations: Animation[] = [];
    const priceSelector = '.new-price-grid strong, .service-price-values strong, .pricing-line strong';
    const actionSelector = 'a.button[href*="/contact"], a.header-cta[href*="/contact"]';
    function reactToPrice(event: MouseEvent | FocusEvent) {
      if (!(event.target instanceof Element) ||
          !event.target.closest(`${priceSelector}, ${actionSelector}`) ||
          matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = event.target.closest(`${priceSelector}, ${actionSelector}`);
      if ((event.type === 'pointerover' || event.type === 'focusin') &&
          event.relatedTarget instanceof Node && target?.contains(event.relatedTarget)) return;
      animations.splice(0).forEach(animation => animation.cancel());
      if (node!.closest('header')) {
        const targets = document.querySelectorAll<HTMLElement>(`${priceSelector}, ${actionSelector}`);
        targets.forEach(element => {
          if (element.matches(actionSelector)) {
            animations.push(element.animate([
              { boxShadow: '0 0 0 0 transparent' },
              { boxShadow: '0 0 0 5px color-mix(in srgb, var(--orange) 24%, transparent)', offset: .35 },
              { boxShadow: '0 0 0 0 transparent' }
            ], {duration: 850}));
            const arrow = element.querySelector('span');
            if (arrow) animations.push(arrow.animate([
              {transform:'translate(0,0)'}, {transform:'translate(4px,-4px)'}, {transform:'translate(0,0)'}
            ], {duration:650}));
          } else {
            animations.push(element.animate([
              {transform:'translateY(0) rotate(0)'},
              {transform:'translateY(-4px) rotate(-2deg)'},
              {transform:'translateY(0) rotate(0)'}
            ], {duration:650}));
          }
        });
      }

    }
    document.addEventListener('click', reactToPrice);
    document.addEventListener('pointerover', reactToPrice);
    document.addEventListener('focusin', reactToPrice);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', reactToPrice);
      document.removeEventListener('pointerover', reactToPrice);
      document.removeEventListener('focusin', reactToPrice);
      animations.forEach(animation => animation.cancel());
    };
  }, []);

  function expandWordmark(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const node = event.currentTarget;
    document.documentElement.dataset.logoActive = "true";
    const bounds = node.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    node.querySelectorAll<HTMLElement>(".wordmark-letter").forEach(letter => {
      const dx = letter.offsetLeft + letter.offsetWidth / 2 - x;
      const dy = letter.offsetTop + letter.offsetHeight / 2 - y;
      const distance = Math.hypot(dx, dy);
      const force = Math.max(0, 1 - distance / 95);
      const horizontal = distance < 1 ? 0 : dx / distance;
      const vertical = distance < 1 ? -1 : dy / distance;
      letter.style.transform = `translate(${horizontal * force * 22}px, ${vertical * force * 19}px) rotate(${horizontal * force * 12}deg)`;
    });
  }

  function restore() {
    delete document.documentElement.dataset.logoActive;
    ref.current
      ?.querySelectorAll<HTMLElement>(".wordmark-letter")
      .forEach((letter) => {
        letter.style.transform = "";
      });
  }
  return (
    <Link
      href={`/${lang}`}
      ref={ref}
      className="interactive-wordmark"
      aria-label="AD4GROWTH"
      onPointerMove={expandWordmark}
      onPointerLeave={restore}
      onBlur={restore}
    >
      {Array.from("AD4GROWTH").map((letter, index) => (
        <span
          className="wordmark-letter"
          key={index}
          aria-hidden="true"
          style={{ "--letter-delay": `${index * -0.37}s` } as CSSProperties}
        >
          <span className="wordmark-glyph">{letter}</span>
        </span>
      ))}
    </Link>
  );
}
