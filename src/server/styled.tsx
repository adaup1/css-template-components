import { createElement } from "react";
import { addServerStyles } from "./helpers";
import { createHashCode, sanitizeStyles } from "../helpers";

export const styled =
  (
    Component: React.ComponentType<any> | keyof JSX.IntrinsicElements,
    css: string | ((props: any) => string)
  ) =>
  (props: any) => {
    const rawStyles = `${typeof css === "function" ? css(props) : css}`;
    const styles = sanitizeStyles(rawStyles);

    // Auto generate className if className isn't provided
    const className = props.className
      ? props.className
      : `_${createHashCode({
          styleString: styles,
          component: `${Component}`,
          key: props.key ? `${props.key}` : "",
        })}`;

    const styleClass = `.${className} {${styles}}`;

    // Check if we are on the server (no window object)
    if (typeof window === "undefined") {
      // Collect and add styles to the server-side renderer
      addServerStyles(styleClass);
    }

    // Return the dynamically created component with the generated className
    return createElement(
      typeof Component === "string" ? Component : "div",
      { className, ...props },
      typeof Component === "string" ? props.children : <Component {...props} />
    );
  };
