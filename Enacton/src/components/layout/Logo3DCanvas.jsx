import { useEffect, useRef } from "react";

export const Logo3DCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = false;

    // High-DPI Canvas Buffer Sizing
    let cssWidth = 0;
    let cssHeight = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 3);

    // Mouse Tracking for dynamic interactive 3D tilt
    let currentTiltX = 0;
    let currentTiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const updateCanvasDimensions = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      cssWidth = rect.width || canvas.clientWidth || 320;
      cssHeight = rect.height || canvas.clientHeight || 240;
      dpr = Math.min(window.devicePixelRatio || 1, 3);

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    };

    updateCanvasDimensions();

    // STATIC 3D Core Octahedron Vertices
    const BASE_VERTICES = [
      [0, -1.3, 0], // Top
      [0, 1.3, 0],  // Bottom
      [-1.15, 0, 0], // Left
      [1.15, 0, 0],  // Right
      [0, 0, 1.15],  // Front
      [0, 0, -1.15], // Back
    ];

    const FACETS = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], // Top 4 pyramids
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5], // Bottom 4 pyramids
    ];

    // Fixed Static Base Angles for the Central 3D Logo
    const STATIC_ANGLE_X = 0.28;
    const STATIC_ANGLE_Y = 0.45;

    // Physics Lerp States
    let spinSpeed = 0.7;
    let targetSpinSpeed = 0.7;
    let hoverScale = 1;
    let targetScale = 1;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltX = ny * 0.25;
      targetTiltY = nx * 0.35;
    };

    const handleMouseEnter = (e) => {
      targetSpinSpeed = 1.5;
      targetScale = 1.12;
      handleMouseMove(e);
    };

    const handleMouseLeave = () => {
      targetSpinSpeed = 0.7;
      targetScale = 1.0;
      targetTiltX = 0;
      targetTiltY = 0;
    };

    const handleResize = () => {
      updateCanvasDimensions();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    let lastTimeStamp = performance.now();

    // High-Resolution 128x128 Sphere Sprite for 3D spheres
    const SPHERE_COLORS = [
      { stop: 0, color: "#FFFFFF" },
      { stop: 0.35, color: "#F8FAFC" },
      { stop: 0.65, color: "#CBD5E1" },
      { stop: 0.9, color: "#64748B" },
      { stop: 1, color: "#334155" },
    ];

    const spriteCanvas = document.createElement("canvas");
    spriteCanvas.width = 128;
    spriteCanvas.height = 128;
    const sCtx = spriteCanvas.getContext("2d");
    if (sCtx) {
      sCtx.imageSmoothingEnabled = true;
      sCtx.imageSmoothingQuality = "high";
      const sr = 56;
      const scx = 64;
      const scy = 64;
      const sGrad = sCtx.createRadialGradient(
        scx - sr * 0.35,
        scy - sr * 0.35,
        sr * 0.05,
        scx,
        scy,
        sr
      );
      SPHERE_COLORS.forEach(({ stop, color }) => sGrad.addColorStop(stop, color));
      sCtx.beginPath();
      sCtx.arc(scx, scy, sr, 0, Math.PI * 2);
      sCtx.fillStyle = sGrad;
      sCtx.fill();
      sCtx.strokeStyle = "rgba(15, 23, 42, 0.35)";
      sCtx.lineWidth = 2.5;
      sCtx.stroke();
    }

    const startLoop = () => {
      if (!animationFrameId && isVisible) {
        lastTimeStamp = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // IntersectionObserver to run loop ONLY when canvas is visible on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(canvas);

    // High-Precision Delta Render Loop (Smooth 60/120/144 FPS)
    const render = (now) => {
      if (!isVisible) return;

      const delta = Math.min((now - lastTimeStamp) / 1000, 0.05);
      lastTimeStamp = now;

      // Frame-rate independent exponential lerping
      const lerpFactor = 1 - Math.exp(-12 * delta);
      spinSpeed += (targetSpinSpeed - spinSpeed) * lerpFactor;
      hoverScale += (targetScale - hoverScale) * lerpFactor;
      currentTiltX += (targetTiltX - currentTiltX) * lerpFactor;
      currentTiltY += (targetTiltY - currentTiltY) * lerpFactor;

      time += delta * spinSpeed * 0.85;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const cx = cssWidth / 2;
      const cy = cssHeight / 2;
      const baseRadius = Math.min(cssWidth, cssHeight) * 0.32 * hoverScale;
      const focalLength = 450;

      const angleX = STATIC_ANGLE_X + currentTiltX;
      const angleY = STATIC_ANGLE_Y + currentTiltY;

      // Project function for STATIC core with dynamic tilt
      const projectStatic = ([x, y, z]) => {
        let x1 = x * Math.cos(angleY) + z * Math.sin(angleY);
        let z1 = -x * Math.sin(angleY) + z * Math.cos(angleY);

        let y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
        let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

        const scale = focalLength / (focalLength + z2 * 45);
        return {
          x: cx + x1 * baseRadius * scale,
          y: cy + y2 * baseRadius * scale,
          z: z2,
          scale,
        };
      };

      const projectedCore = BASE_VERTICES.map(projectStatic);

      const sortedFacets = FACETS.map((facet) => {
        const avgZ = (projectedCore[facet[0]].z + projectedCore[facet[1]].z + projectedCore[facet[2]].z) / 3;
        return { facet, avgZ };
      }).sort((a, b) => b.avgZ - a.avgZ);

      const TOTAL_DOTS = 21;
      const orbitRadius = 1.72;
      const projectedDots = [];

      for (let i = 0; i < TOTAL_DOTS; i++) {
        const angle = (i / TOTAL_DOTS) * Math.PI * 2 + time;
        const x3d = Math.cos(angle) * orbitRadius;
        const y3d = Math.sin(angle) * 0.28;
        const z3d = Math.sin(angle) * orbitRadius;

        const proj = projectStatic([x3d, y3d, z3d]);
        projectedDots.push({
          x: proj.x,
          y: proj.y,
          z: proj.z,
          scale: proj.scale,
        });
      }

      const backDots = projectedDots.filter((d) => d.z > 0).sort((a, b) => b.z - a.z);
      const frontDots = projectedDots.filter((d) => d.z <= 0).sort((a, b) => b.z - a.z);

      const renderSphere = ({ x, y, scale }) => {
        const size = 11.2 * scale;
        ctx.drawImage(spriteCanvas, x - size / 2, y - size / 2, size, size);
      };

      backDots.forEach(renderSphere);

      sortedFacets.forEach(({ facet, avgZ }) => {
        const p1 = projectedCore[facet[0]];
        const p2 = projectedCore[facet[1]];
        const p3 = projectedCore[facet[2]];

        const brightness = Math.max(0.2, Math.min(0.95, 0.52 + (avgZ * 0.32)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        const colorVal = Math.floor(brightness * 245);
        ctx.fillStyle = `rgba(${colorVal}, ${colorVal}, ${colorVal + 15}, 0.98)`;
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      frontDots.forEach(renderSphere);

      ctx.restore();

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="relative w-56 h-44 sm:w-72 sm:h-56 md:w-80 md:h-60 cursor-pointer mx-auto gpu-layer transition-transform duration-300 ease-out"
      style={{ transform: "translateZ(0)", willChange: "transform" }}
      title="Hover over 3D logo to accelerate the 21 orbiting white 3D spheres"
    />
  );
};

export default Logo3DCanvas;

