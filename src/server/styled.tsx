import { createElement } from "react";
import { addServerStyles } from "./helpers";

export const styled =
  (
    Component: React.ComponentType<any> | keyof JSX.IntrinsicElements,
    css: string | ((props: any) => string)
  ) =>
  (props: any) => {
    const id = `_${crypto.randomUUID()}`;
    const styles = `.${id} {${typeof css === "function" ? css(props) : css}}`;

    // Collect styles on the server
    if (typeof window === "undefined") {
      addServerStyles(styles);
    }

    // Create the element dynamically
    return createElement(
      typeof Component === "string" ? Component : "div",
      { className: id, ...props },
      typeof Component === "string" ? props.children : <Component {...props} />
    );
  };
