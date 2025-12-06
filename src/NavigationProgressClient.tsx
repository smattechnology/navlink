"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { progressManager } from "./NavLink"; // export your singleton from your package

export const NavigationProgressClient: React.FC<{
  color?: string;
  height?: string;
  duration?: number;
}> = ({ color = "#2563EB", height = "3px", duration = 200 }) => {
  const [width, setWidth] = useState("0%");
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    progressManager.onStart(() => {
      setVisible(true);
      setWidth("0%");
      setTimeout(() => setWidth("40%"), 10);
    });

    progressManager.onFinish(() => {
      setWidth("100%");
      setTimeout(() => {
        setVisible(false);
        setWidth("0%");
      }, duration + 50);
    });
  }, [duration]);

  useEffect(() => {
    progressManager.finish();
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        transition: `width ${duration}ms ease`,
      }}
      className="fixed top-0 left-0 z-[99999]"
    />
  );
};
