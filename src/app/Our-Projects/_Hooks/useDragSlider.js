// src/hooks/useDragSlider.js
"use client";

import { useRef, useCallback, useEffect } from "react";

export const useDragSlider = (containerRef, afterRef, handleRef) => {
  const dragging = useRef(false);

  const setPos = useCallback(
    (clientX) => {
      if (!containerRef.current || !afterRef.current || !handleRef.current)
        return;

      const rect = containerRef.current.getBoundingClientRect();
      const pct = Math.min(
        Math.max(((clientX - rect.left) / rect.width) * 100, 2),
        98,
      );
      afterRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handleRef.current.style.left = `${pct}%`;
    },
    [containerRef, afterRef, handleRef],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onDown = (e) => {
      dragging.current = true;
      const clientX = e.clientX ?? e.touches[0].clientX;
      setPos(clientX);
    };

    const onMove = (e) => {
      if (dragging.current) {
        const clientX = e.clientX ?? e.touches[0].clientX;
        setPos(clientX);
      }
    };

    const onUp = () => {
      dragging.current = false;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);

    // Set initial position to 50%
    const initialX =
      el.getBoundingClientRect().left + el.getBoundingClientRect().width * 0.5;
    setPos(initialX);

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [containerRef, setPos]);
};
