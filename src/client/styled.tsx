import React, { useEffect, forwardRef, createElement, useMemo } from "react";
import { createHashCode } from "../helpers";

export const styled = (
  Component: React.ComponentType<any> | keyof JSX.IntrinsicElements,
  css: string | ((props: any) => string)
) =>
  forwardRef((props: any, ref: React.Ref<any>) => {
    const styles = useMemo(
      () => (typeof css === "function" ? css(props) : css),
      [props, css]
    );
    const className = useMemo(() => `_${createHashCode(styles)}`, [styles]);
    const styleRule = useMemo(
      () => `.${className} {${styles}}`,
      [className, styles]
    );

    useEffect(() => {
      // Ensure we don't duplicate styles
      const styleTag = document.getElementById(
        "dynamic-styles"
      ) as HTMLStyleElement | null;
      if (styleTag && !styleTag.textContent?.includes(styleRule)) {
        styleTag.textContent += styleRule;
      } else if (!styleTag) {
        const newStyleTag = document.createElement("style");
        newStyleTag.id = "dynamic-styles";
        newStyleTag.textContent = styleRule;
        document.head.appendChild(newStyleTag);
      }

      // Cleanup on unmount or style change
      return () => {
        const styleTag = document.getElementById("dynamic-styles");
        if (styleTag) {
          styleTag.textContent =
            styleTag.textContent?.replace(styleRule, "") || "";
        }
      };
    }, [styleRule]);

    // Return the component with the dynamically generated className and forwarded ref
    return createElement(
      typeof Component === "string" ? Component : "div",
      { className, ref, ...props },
      typeof Component === "string" ? props.children : <Component {...props} />
    );
  });
