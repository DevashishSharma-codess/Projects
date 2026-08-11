import { useState, useEffect } from "react";
import { getGPUTier } from "detect-gpu";

export function useDeviceTier() {
  const [tierInfo, setTierInfo] = useState({
    tier: "high", // 'high' | 'mid' | 'low'
    isLowTier: false,
    reducedMotion: false,
    gpuTier: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function detect() {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const concurrency = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 4;

      let gpuResult = null;
      try {
        gpuResult = await getGPUTier();
      } catch (err) {
        console.warn("GPU tier detection fallback:", err);
      }

      const gpuTierNum = gpuResult?.tier ?? 2;

      let tier = "high";
      if (gpuTierNum <= 1 || concurrency <= 2 || memory <= 2) {
        tier = "low";
      } else if (gpuTierNum === 2 || concurrency <= 4 || memory <= 4) {
        tier = "mid";
      }

      if (isMounted) {
        setTierInfo({
          tier,
          isLowTier: tier === "low",
          reducedMotion,
          gpuTier: gpuResult,
        });
      }
    }

    detect();
    return () => {
      isMounted = false;
    };
  }, []);

  return tierInfo;
}

