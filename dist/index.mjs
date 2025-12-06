"use client";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/NavLink.tsx
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { jsx } from "react/jsx-runtime";
var NavProgressManager = class {
  constructor() {
    this.startListeners = [];
    this.finishListeners = [];
  }
  start() {
    this.startListeners.forEach((cb) => cb());
  }
  finish() {
    this.finishListeners.forEach((cb) => cb());
  }
  onStart(cb) {
    this.startListeners.push(cb);
  }
  onFinish(cb) {
    this.finishListeners.push(cb);
  }
};
var progressManager = new NavProgressManager();
var EXTERNAL_LINK_REGEX = /^(https?:)?\/\//;
var DEFAULT_CLASSES = "inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none";
var DEFAULT_ACTIVE_CLASSES = "text-sky-600 font-semibold bg-sky-50 dark:bg-sky-950/20";
var normalizePath = (path) => {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
};
var isExternalLink = (href) => EXTERNAL_LINK_REGEX.test(href);
var getPathnameFromExternalUrl = (url) => {
  try {
    return new URL(url).pathname;
  } catch (e) {
    return url;
  }
};
function NavLink(_a) {
  var _b = _a, {
    href,
    exact = false,
    activeClassName = DEFAULT_ACTIVE_CLASSES,
    className = DEFAULT_CLASSES,
    children
  } = _b, rest = __objRest(_b, [
    "href",
    "exact",
    "activeClassName",
    "className",
    "children"
  ]);
  const pathname = usePathname();
  const router = useRouter();
  const isExternal = React.useMemo(() => isExternalLink(href), [href]);
  const isActive = React.useMemo(() => {
    if (!pathname || isExternal) return false;
    const currentPath = normalizePath(pathname);
    const targetPath = href.startsWith("/") ? normalizePath(href) : normalizePath(getPathnameFromExternalUrl(href));
    if (exact) return currentPath === targetPath;
    if (targetPath === "/") return currentPath === "/";
    return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
  }, [pathname, href, exact, isExternal]);
  const mergedClassName = React.useMemo(() => {
    const baseClasses = [className];
    if (isActive && pathname !== null) baseClasses.push(activeClassName);
    return baseClasses.filter(Boolean).join(" ").trim();
  }, [className, isActive, activeClassName, pathname]);
  const handleClick = (e) => {
    if (isExternal) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1)
      return;
    e.preventDefault();
    if (pathname === href) return;
    progressManager.start();
    router.push(href);
  };
  const ariaAttributes = React.useMemo(() => {
    const attributes = {
      "aria-current": isActive ? "page" : void 0
    };
    if (rest["aria-label"]) {
      attributes["aria-label"] = rest["aria-label"];
    }
    return attributes;
  }, [isActive, rest]);
  return /* @__PURE__ */ jsx(
    Link,
    __spreadProps(__spreadValues(__spreadValues({
      href,
      className: mergedClassName
    }, ariaAttributes), rest), {
      onClick: handleClick,
      prefetch: true,
      children
    })
  );
}
NavLink.displayName = "NavLink";
var useNavigate = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navigate = (href, options) => {
    if (pathname === href) return;
    progressManager.start();
    const { replace = false, scroll = true } = options || {};
    if (replace) router.replace(href, { scroll });
    else router.push(href, { scroll });
  };
  return navigate;
};

// src/NavigationProgressClient.tsx
import { useEffect as useEffect2, useState as useState2 } from "react";
import { usePathname as usePathname2 } from "next/navigation";
import { jsx as jsx2 } from "react/jsx-runtime";
var NavigationProgressClient = ({ color = "#2563EB", height = "3px", duration = 200 }) => {
  const [width, setWidth] = useState2("0%");
  const [visible, setVisible] = useState2(false);
  const pathname = usePathname2();
  useEffect2(() => {
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
  useEffect2(() => {
    progressManager.finish();
  }, [pathname]);
  if (!visible) return null;
  return /* @__PURE__ */ jsx2(
    "div",
    {
      style: {
        width,
        height,
        backgroundColor: color,
        transition: `width ${duration}ms ease`
      },
      className: "fixed top-0 left-0 z-[99999]"
    }
  );
};
export {
  NavLink,
  NavigationProgressClient as NavigationProgress,
  useNavigate
};
//# sourceMappingURL=index.mjs.map