import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    href: string;
    exact?: boolean;
    activeClassName?: string;
    className?: string;
    children: React.ReactNode;
}
declare function NavLink({ href, exact, activeClassName, className, children, ...rest }: NavLinkProps): react_jsx_runtime.JSX.Element;
declare namespace NavLink {
    var displayName: string;
}
declare const useNavigate: () => (href: string, options?: {
    replace?: boolean;
    scroll?: boolean;
}) => void;

declare const NavigationProgressClient: React.FC<{
    color?: string;
    height?: string;
    duration?: number;
}>;

export { NavLink, type NavLinkProps, NavigationProgressClient as NavigationProgress, useNavigate };
