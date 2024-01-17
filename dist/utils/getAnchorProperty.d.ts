export declare function getAnchorProperty<T extends HTMLAnchorElement | SVGAElement, K extends keyof T, P extends T[K]>(a: T, key: K): P extends SVGAnimatedString ? string : P;
