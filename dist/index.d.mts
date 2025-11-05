import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    /** Destination URL */
    href: string;
    /** If true, require exact pathname match to mark active (defaults to false) */
    exact?: boolean;
    /** Class applied when the link is active */
    activeClassName?: string;
    /** Additional classes for the link */
    className?: string;
    /** Rendered children (text, icons, etc.) */
    children: React.ReactNode;
}
declare function NavLink({ href, exact, activeClassName, className, children, ...rest }: NavLinkProps): react_jsx_runtime.JSX.Element;
declare namespace NavLink {
    var displayName: string;
}

export { NavLink, type NavLinkProps };
