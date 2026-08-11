import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { scrollToElement } from "../../utils/scroll";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    // Ignore route changes for contact modal or when returning from contact modal
    if (pathname === "/contact" || prevPathname === "/contact") {
      return;
    }

    if (hash) {
      const timer = setTimeout(() => {
        scrollToElement(hash);
      }, 120);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        if (!window.__isProgrammaticScroll) {
          window.scrollTo(0, 0);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToHash;
