export function scrollToElement(target) {
  if (typeof window === "undefined") return;

  const targetId = typeof target === "string" ? target.replace("#", "") : null;
  const el = targetId ? document.getElementById(targetId) : target;

  if (!el) {
    window.scrollTo(0, 0);
    return;
  }

  // Calculate destination offset in current document
  const top = el.getBoundingClientRect().top + window.scrollY - 60;

  // Jump scroll directly to target position, preventing ScrollTrigger pin mutations from aborting navigation
  window.scrollTo(0, top);

  // If GSAP ScrollTrigger is registered, refresh positions to align pinned elements seamlessly
  if (typeof window !== "undefined" && window.ScrollTrigger) {
    try {
      window.ScrollTrigger.refresh();
    } catch (e) {
      // Ignore if ScrollTrigger not ready
    }
  }
}
