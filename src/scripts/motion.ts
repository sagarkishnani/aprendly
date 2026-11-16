const EASE = "cubic-bezier(.16,1,.3,1)";

const REVEAL_FROM: Record<string, string> = {
  up: "translate3d(0,56px,0)",
  rise: "translate3d(0,105%,0)",
  scale: "scale(.9)",
  left: "translate3d(-56px,0,0)",
  right: "translate3d(56px,0,0)",
  fade: "none",
};

type MotionElement = HTMLElement & {
  __revealState?: 1 | 2;
  __marqueeX?: number;
  __marqueePaused?: boolean;
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function isAwaitingHydration(el: Element) {
  return el.closest("astro-island[ssr]") !== null;
}

function all(selector: string): MotionElement[] {
  return Array.from(document.querySelectorAll<MotionElement>(selector)).filter((el) => !isAwaitingHydration(el));
}

function delayOf(el: HTMLElement): number {
  return parseInt(el.dataset.delay || "0", 10) || 0;
}

function prepareReveal(el: MotionElement) {
  const variant = el.dataset.reveal || "up";
  el.__revealState = 1;
  el.style.transition = "none";
  el.style.opacity = variant === "rise" ? "1" : "0";
  el.style.transform = REVEAL_FROM[variant] || REVEAL_FROM.up;
  if (variant !== "rise") el.style.filter = "blur(10px)";
}

function playReveal(el: MotionElement) {
  el.__revealState = 2;
  const delay = `${delayOf(el)}ms`;
  el.style.transition = `opacity 1s ${EASE} ${delay}, transform 1.2s ${EASE} ${delay}, filter 1s ${EASE} ${delay}`;
  el.style.opacity = "1";
  el.style.transform = "none";
  el.style.filter = "none";
  window.setTimeout(() => {
    el.style.transition = "";
    el.style.transform = "";
    el.style.filter = "";
  }, 1400 + delayOf(el));
}

function updateReveals(viewportHeight: number) {
  for (const el of all("[data-reveal]")) {
    if (el.__revealState === 2) continue;
    if (!el.__revealState) {
      prepareReveal(el);
      continue;
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) playReveal(el);
  }
}

function updateParallax(viewportHeight: number) {
  for (const el of all("[data-speed]")) {
    const rect = el.parentElement!.getBoundingClientRect();
    const offset = rect.top + rect.height / 2 - viewportHeight / 2;
    el.style.transform = `translate3d(0,${(-offset * parseFloat(el.dataset.speed || "0")).toFixed(1)}px,0)`;
  }
  for (const el of all("[data-zoomin]")) {
    const rect = el.parentElement!.getBoundingClientRect();
    const progress = clamp01((viewportHeight - rect.top) / (viewportHeight + rect.height));
    el.style.transform = `scale(${(1 + 0.22 * (1 - progress)).toFixed(4)})`;
  }
  for (const el of all("[data-grow]")) {
    const rect = el.parentElement!.getBoundingClientRect();
    const eased = easeOutCubic(clamp01((viewportHeight - rect.top) / (viewportHeight * 0.85)));
    el.style.transform = `scale(${(0.86 + 0.14 * eased).toFixed(4)})`;
    el.style.borderRadius = `${(56 - 24 * eased).toFixed(1)}px`;
  }
}

function updateZoomSections(viewportHeight: number) {
  for (const section of all("[data-zoom]")) {
    const rect = section.getBoundingClientRect();
    const progress = clamp01(-rect.top / (rect.height - viewportHeight));
    const eased = easeOutCubic(clamp01(progress / 0.7));
    const target = section.querySelector<HTMLElement>("[data-zoom-target]");
    if (target) {
      target.style.transform = `scale(${(0.5 + 0.5 * eased).toFixed(4)}) translateY(${(18 * (1 - eased)).toFixed(2)}%)`;
      target.style.borderRadius = `${(48 * (1 - eased)).toFixed(1)}px`;
    }
    const fadeIn = section.querySelector<HTMLElement>("[data-zoom-fade]");
    if (fadeIn) fadeIn.style.opacity = clamp01((progress - 0.55) / 0.25).toFixed(3);
    const fadeOut = section.querySelector<HTMLElement>("[data-zoom-pre]");
    if (fadeOut) {
      fadeOut.style.opacity = (1 - clamp01(progress / 0.3)).toFixed(3);
      fadeOut.style.transform = `translateY(${(-60 * progress).toFixed(1)}px)`;
    }
  }
}

function updateStackCards(viewportHeight: number) {
  for (const card of all("[data-stack-card]")) {
    const next = card.nextElementSibling as HTMLElement | null;
    const inner = card.firstElementChild as HTMLElement | null;
    if (!inner) continue;
    if (!next || !next.hasAttribute("data-stack-card")) {
      inner.style.transform = "";
      inner.style.filter = "";
      continue;
    }
    const top = parseFloat(card.dataset.top || "110");
    const progress = clamp01((viewportHeight - next.getBoundingClientRect().top) / (viewportHeight - top));
    inner.style.transform = `scale(${(1 - 0.07 * progress).toFixed(4)})`;
    inner.style.filter = `brightness(${(1 - 0.35 * progress).toFixed(3)})`;
  }
}

function updateFloaters() {
  const seconds = performance.now() / 1000;
  all("[data-float]").forEach((el, index) => {
    const amplitude = parseFloat(el.dataset.float || "12") || 12;
    el.style.translate = `0 ${(Math.sin(seconds * 1.4 + index) * amplitude).toFixed(2)}px`;
    el.style.rotate = `${(Math.sin(seconds * 1.1 + index) * 3).toFixed(2)}deg`;
  });
}

function updateLiquidBars(viewportHeight: number) {
  for (const box of all("[data-liquid]")) {
    const rect = box.getBoundingClientRect();
    const progress = clamp01((viewportHeight * 0.95 - rect.top) / (rect.height * 0.95));
    box.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar, index) => {
      const eased = easeInOutCubic(clamp01((progress - index * 0.08) / 0.5));
      const fullHeight = parseFloat(bar.dataset.h || "72");
      const minHeight = 72;
      const slant = (46 * (1 - eased)).toFixed(1);
      bar.style.height = `${(minHeight + (fullHeight - minHeight) * eased).toFixed(1)}px`;
      bar.style.clipPath = `polygon(0 ${slant}px,100% 0,100% 100%,0 100%)`;
      bar.style.borderRadius = `${(8 + 20 * eased).toFixed(1)}px`;
      bar.style.transform = `translateY(${(90 * (1 - eased)).toFixed(1)}px)`;
      const body = bar.querySelector<HTMLElement>("[data-bar-body]");
      if (body) {
        const opacity = clamp01((eased - 0.55) / 0.4);
        body.style.opacity = opacity.toFixed(3);
        body.style.transform = `translateY(${(24 * (1 - opacity)).toFixed(1)}px)`;
      }
    });
  }
}

function updateTimelines(viewportHeight: number) {
  for (const timeline of all("[data-timeline]")) {
    const rect = timeline.getBoundingClientRect();
    const progress = clamp01((viewportHeight * 0.55 - rect.top) / rect.height);
    const fill = timeline.querySelector<HTMLElement>("[data-tl-fill]");
    if (fill) fill.style.height = `${(progress * 100).toFixed(2)}%`;
    timeline.querySelectorAll<HTMLElement>("[data-tl-step]").forEach((step) => {
      const reached = (step.offsetTop + 40) / rect.height <= progress + 0.001;
      step.style.opacity = reached ? "1" : "0.28";
      step.style.transform = reached ? "none" : "translateY(16px)";
      const dot = step.querySelector<HTMLElement>("[data-tl-dot]");
      if (dot) {
        dot.style.background = reached ? "#F43870" : "#3A2C66";
        dot.style.transform = reached ? "scale(1)" : "scale(.6)";
      }
    });
  }
}

function updateMarquees() {
  for (const track of all("[data-marquee]")) {
    if (track.__marqueePaused) continue;
    track.__marqueeX = (track.__marqueeX || 0) - parseFloat(track.dataset.marquee || "0.5");
    const half = track.scrollWidth / 2;
    if (half && -track.__marqueeX >= half) track.__marqueeX += half;
    track.style.transform = `translate3d(${track.__marqueeX}px,0,0)`;
  }
}

function frame() {
  const viewportHeight = window.innerHeight;
  updateReveals(viewportHeight);
  updateParallax(viewportHeight);
  updateZoomSections(viewportHeight);
  updateStackCards(viewportHeight);
  updateFloaters();
  updateLiquidBars(viewportHeight);
  updateTimelines(viewportHeight);
  updateMarquees();
  requestAnimationFrame(frame);
}

function pauseMarqueesOnHover(event: MouseEvent) {
  for (const track of all("[data-marquee][data-pause]")) {
    track.__marqueePaused = track.contains(event.target as Node);
  }
}

export function startMotion() {
  const win = window as Window & { __aprendlyMotion?: boolean };
  if (win.__aprendlyMotion) return;
  win.__aprendlyMotion = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.addEventListener("mouseover", pauseMarqueesOnHover);
  requestAnimationFrame(frame);
}
