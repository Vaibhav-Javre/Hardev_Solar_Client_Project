import React from "react";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Shared Hardev Solar Services Logo Component.
 * Uses official brand logo asset with intrinsic aspect ratio preserved (756x330).
 */
export const Logo: React.FC<LogoProps> = ({
  className = "h-11 sm:h-12 w-auto",
  width = 229,
  height = 100,
  priority = false,
}) => {
  return (
    <Image
      src={SITE_CONFIG.logo}
      alt={SITE_CONFIG.companyName}
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
};

export default Logo;
