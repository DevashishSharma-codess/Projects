import { useEffect, useRef } from "react";

/**
 * AsciiHandsBackground Configuration
 * Samples a real image into interactive halftone dots with hover ripple & shimmer animations.
 */
const CONFIG = {
  dotSpacingDesktop: 7,
  dotSpacingMobile: 12,
  mode: "dots", // "dots" | "ascii"
  asciiRamp: " .:-=+*#%@",
  dotMaxRadius: 3.8,
  animationSpeed: 0.0018,
  shimmerAmplitude: 0.45,
  rippleRadius: 140,
  rippleStrength: 18,
  assembleDuration: 1400, // ms
  dotColorRgb: "23, 19, 15", // Dark ink dots on white canvas
};

// Default high-contrast Creation of Adam / reaching hands image asset
const DEFAULT_HANDS_IMAGE =
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1920&q=85";

export function AsciiHandsBackground({
  imageSrc = DEFAULT_HANDS_IMAGE,
  mode = CONFIG.mode,
  className = "absolute inset-0 pointer-events-none",
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const assembleStartRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    const buildParticlesFromImage = (imgData, width, height, spacing) => {
      const particles = [];
      const data = imgData.data;

      for (let y = 0; y < height; y += spacing) {
        for (let x = 0; x < width; x += spacing) {
          const index = (y * width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];

          // Compute grayscale luminance (0 to 1)
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          // Invert so darker pixels (hand details) produce larger dots against white canvas
          const density = 1 - brightness;

          if (density > 0.08 && a > 20) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 240 + 30;
            particles.push({
              targetX: x,
              targetY: y,
              startX: x + Math.cos(angle) * dist,
              startY: y + Math.sin(angle) * dist,
              baseRadius: density * CONFIG.dotMaxRadius,
              brightness: density,
              asciiChar:
                CONFIG.asciiRamp[
                  Math.floor(density * (CONFIG.asciiRamp.length - 1))
                ],
              phase: (x + y) * 0.04,
            });
          }
        }
      }
      particlesRef.current = particles;
      assembleStartRef.current = Date.now();
    };

    const handleResize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      canvas.width = width;
      canvas.height = height;

      const isMobile = width < 768;
      const spacing = isMobile
        ? CONFIG.dotSpacingMobile
        : CONFIG.dotSpacingDesktop;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;

      img.onload = () => {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = width;
        offCanvas.height = height;
        const offCtx = offCanvas.getContext("2d");

        // Contain/cover scale the image into canvas center
        const imgAspect = img.width / img.height;
        const canvasAspect = width / height;
        let renderW = width;
        let renderH = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
          renderH = width / imgAspect;
          offsetY = (height - renderH) / 2;
        } else {
          renderW = height * imgAspect;
          offsetX = (width - renderW) / 2;
        }

        offCtx.fillStyle = "#ffffff";
        offCtx.fillRect(0, 0, width, height);
        offCtx.drawImage(img, offsetX, offsetY, renderW, renderH);

        const imgData = offCtx.getImageData(0, 0, width, height);
        buildParticlesFromImage(imgData, width, height, spacing);
      };
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const time = Date.now();
      const elapsed = time - assembleStartRef.current;
      const assembleProgress = Math.min(
        1,
        elapsed / CONFIG.assembleDuration
      );
      // Ease-out cubic assembly
      const ease = 1 - Math.pow(1 - assembleProgress, 3);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      ctx.font = "11px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interpolate assemble position
        let px = p.startX + (p.targetX - p.startX) * ease;
        let py = p.startY + (p.targetY - p.startY) * ease;

        // Mouse hover ripple displacement
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.hypot(dx, dy);
        let radiusBoost = 0;

        if (dist < CONFIG.rippleRadius && dist > 0) {
          const factor = 1 - dist / CONFIG.rippleRadius;
          const force = factor * CONFIG.rippleStrength;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
          radiusBoost = factor * 1.6;
        }

        // Breathing sine wave shimmer
        const shimmer =
          Math.sin(time * CONFIG.animationSpeed + p.phase) *
          CONFIG.shimmerAmplitude;
        const finalRadius = Math.max(
          0.3,
          p.baseRadius + shimmer + radiusBoost
        );
        const opacity = Math.min(
          0.88,
          Math.max(0.1, p.brightness * 0.8 + radiusBoost * 0.25)
        );

        if (mode === "ascii") {
          ctx.fillStyle = `rgba(${CONFIG.dotColorRgb}, ${opacity.toFixed(2)})`;
          ctx.fillText(p.asciiChar, px, py);
        } else {
          ctx.beginPath();
          ctx.arc(px, py, finalRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${CONFIG.dotColorRgb}, ${opacity.toFixed(2)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imageSrc, mode]);

  return <canvas ref={canvasRef} className={className} />;
}

export default AsciiHandsBackground;
