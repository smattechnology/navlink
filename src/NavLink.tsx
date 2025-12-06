"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// --------------------
// Types
// --------------------

export interface NavLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  exact?: boolean;
  activeClassName?: string;
  className?: string;
  children: React.ReactNode;
}

// --------------------
// NavProgressManager
// --------------------

type ProgressCallback = () => void;

class NavProgressManager {
  private startListeners: ProgressCallback[] = [];
  private finishListeners: ProgressCallback[] = [];

  start() {
    this.startListeners.forEach((cb) => cb());
  }

  finish() {
    this.finishListeners.forEach((cb) => cb());
  }

  onStart(cb: ProgressCallback) {
    this.startListeners.push(cb);
  }

  onFinish(cb: ProgressCallback) {
    this.finishListeners.push(cb);
  }
}

export const progressManager = new NavProgressManager();

// --------------------
// Helper constants/functions for NavLink
// --------------------

const EXTERNAL_LINK_REGEX = /^(https?:)?\/\//;
const DEFAULT_CLASSES =
  "inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none";
const DEFAULT_ACTIVE_CLASSES =
  "text-sky-600 font-semibold bg-sky-50 dark:bg-sky-950/20";

const normalizePath = (path: string): string => {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};

const isExternalLink = (href: string): boolean =>
  EXTERNAL_LINK_REGEX.test(href);

const getPathnameFromExternalUrl = (url: string): string => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

// --------------------
// NavLink Component
// --------------------

export function NavLink({
  href,
  exact = false,
  activeClassName = DEFAULT_ACTIVE_CLASSES,
  className = DEFAULT_CLASSES,
  children,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isExternal = React.useMemo(() => isExternalLink(href), [href]);

  const isActive = React.useMemo(() => {
    if (!pathname || isExternal) return false;

    const currentPath = normalizePath(pathname);
    const targetPath = href.startsWith("/")
      ? normalizePath(href)
      : normalizePath(getPathnameFromExternalUrl(href));

    if (exact) return currentPath === targetPath;

    if (targetPath === "/") return currentPath === "/";

    return (
      currentPath === targetPath || currentPath.startsWith(targetPath + "/")
    );
  }, [pathname, href, exact, isExternal]);

  const mergedClassName = React.useMemo(() => {
    const baseClasses = [className];
    if (isActive && pathname !== null) baseClasses.push(activeClassName);
    return baseClasses.filter(Boolean).join(" ").trim();
  }, [className, isActive, activeClassName, pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isExternal) return; // external links behave normally
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)
      return;
    e.preventDefault();
    if (pathname === href) return;
    progressManager.start();
    router.push(href);
  };

  const ariaAttributes = React.useMemo(() => {
    const attributes: {
      "aria-current"?: "page" | undefined;
      "aria-label"?: string;
    } = {
      "aria-current": isActive ? "page" : undefined,
    };

    if (rest["aria-label"]) {
      attributes["aria-label"] = rest["aria-label"];
    }

    return attributes;
  }, [isActive, rest]);

  return (
    <Link
      href={href}
      className={mergedClassName}
      {...ariaAttributes}
      {...rest}
      onClick={handleClick}
      prefetch={true}
    >
      {children}
    </Link>
  );
}

NavLink.displayName = "NavLink";

// --------------------
// useNavigate Hook (FIXED)
// --------------------

export const useNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Pre-check external link ONCE using hook-safe location
  const checkIsExternal = useCallback((href: string) => {
    return isExternalLink(href);
  }, []);

  const navigate = useCallback(
    (href: string, options?: { replace?: boolean; scroll?: boolean }) => {
      const isExternal = checkIsExternal(href);

      // Do nothing for same-page or external links
      if (pathname === href) return;

      // Start progress bar
      if (!isExternal) progressManager.start();

      const { replace = false, scroll = true } = options || {};

      if (replace) router.replace(href, { scroll });
      else router.push(href, { scroll });
    },
    [pathname, router, checkIsExternal]
  );

  return navigate;
};
