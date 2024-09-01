import { useEffect } from "react";
import { createElement } from "react";

export const styled =
  (
    Component: React.ComponentType<any> | keyof JSX.IntrinsicElements,
    css: string | ((props: any) => string)
  ) =>
  (props: any) => {
    const id = `_${crypto.randomUUID()}`;
    const styles = `.${id} {${typeof css === "function" ? css(props) : css}}`;

    useEffect(() => {
      const styleTag = document.getElementById(
        "dynamic-styles"
      ) as HTMLStyleElement | null;
      if (styleTag) {
        styleTag.textContent += styles;
      } else {
        const newStyleTag = document.createElement("style");
        newStyleTag.id = "dynamic-styles";
        newStyleTag.textContent = styles;
        document.head.appendChild(newStyleTag);
      }

      // Cleanup
      return () => {
        if (styleTag) {
          styleTag.textContent =
            styleTag.textContent?.replace(styles, "") || "";
        }
      };
    }, [styles]);

    return createElement(
      typeof Component === "string" ? Component : "div",
      { className: id, ...props },
      typeof Component === "string" ? props.children : <Component {...props} />
    );
  };
