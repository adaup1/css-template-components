import React from "react";

const addStylesheet = (styles: string) => {
  let styleSheet = document.querySelector(
    'style[data-title="css-selector-components-styles"]'
  ) as HTMLStyleElement | null;

  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.setAttribute("data-title", "css-selector-components-styles");
    document.head.appendChild(styleSheet);
  }

  // Add styles to the stylesheet
  if (styleSheet.sheet) {
    try {
      styleSheet.sheet.insertRule(styles, styleSheet.sheet.cssRules.length);
    } catch (error) {
      console.error("Failed to insert rule:", error);
    }
  } else {
    styleSheet.appendChild(document.createTextNode(styles));
  }
};

export const styled =
  (
    Component: React.ComponentType<any> | keyof JSX.IntrinsicElements,
    css: string | ((props: any) => string)
  ) =>
  (props: any) => {
    const id = `_${crypto.randomUUID()}`;
    const styles = typeof css === "function" ? css(props) : css;

    // Inject styles immediately
    addStylesheet(`.${id} {${styles}}`);

    // Create the element dynamically
    return React.createElement(
      typeof Component === "string" ? Component : "div",
      { className: id, ...props },
      typeof Component === "string" ? props.children : <Component {...props} />
    );
  };
