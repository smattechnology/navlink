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
import { usePathname } from "next/navigation";
import React from "react";
import { jsx } from "react/jsx-runtime";
var EXTERNAL_LINK_REGEX = /^(https?:)?\/\//;
var DEFAULT_CLASSES = "inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none";
var DEFAULT_ACTIVE_CLASSES = "text-sky-600 font-semibold bg-sky-50 dark:bg-sky-950/20";
var normalizePath = (path) => {
  if (!path || path === "/") return "/";
  const normalized = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalized;
};
var isExternalLink = (href) => {
  return EXTERNAL_LINK_REGEX.test(href);
};
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
  const isExternal = React.useMemo(() => isExternalLink(href), [href]);
  const isActive = React.useMemo(() => {
    if (!pathname || isExternal) return false;
    const currentPath = normalizePath(pathname);
    let targetPath;
    if (href.startsWith("/")) {
      targetPath = normalizePath(href);
    } else {
      targetPath = normalizePath(getPathnameFromExternalUrl(href));
    }
    if (exact) {
      return currentPath === targetPath;
    }
    if (targetPath === "/") {
      return currentPath === "/";
    }
    return currentPath === targetPath || currentPath.startsWith(targetPath + "/");
  }, [pathname, href, exact, isExternal]);
  const mergedClassName = React.useMemo(() => {
    const baseClasses = [className];
    if (isActive && pathname !== null) {
      baseClasses.push(activeClassName);
    }
    return baseClasses.filter(Boolean).join(" ").trim();
  }, [className, isActive, activeClassName, pathname]);
  const ariaAttributes = React.useMemo(() => {
    const attributes = {
      "aria-current": isActive && pathname !== null ? "page" : void 0
    };
    if (rest["aria-label"]) {
      attributes["aria-label"] = rest["aria-label"];
    }
    return attributes;
  }, [isActive, pathname, rest]);
  return /* @__PURE__ */ jsx(
    Link,
    __spreadProps(__spreadValues(__spreadValues({
      href,
      className: mergedClassName
    }, ariaAttributes), rest), {
      prefetch: true,
      children
    })
  );
}
NavLink.displayName = "NavLink";
export {
  NavLink
};
//# sourceMappingURL=index.mjs.map