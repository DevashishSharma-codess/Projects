import { useDeviceTier } from "../../hooks/useDeviceTier";

export const Grain = () => {
  const { isLowTier, reducedMotion } = useDeviceTier();

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      data-testid="grain-overlay"
      className="pointer-events-none fixed inset-0 z-[200] opacity-[0.10]"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
        backgroundImage: isLowTier
          ? "radial-gradient(rgba(23, 19, 15, 0.08) 1px, transparent 1px)"
          : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: isLowTier ? "12px 12px" : "auto",
      }}
    />
  );
};


