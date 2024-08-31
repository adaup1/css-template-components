import React from "react";

// Function to add styles to the stylesheet
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

// Higher-order component to apply styles
export const styled =
  (
    Component: React.ComponentType<any> | keyof JSX.IntrinsicElements,
    css: (props: any) => string
  ) =>
  (props: any) => {
    const id = `_${crypto.randomUUID()}`;
    const styles = css(props);

    // Inject styles immediately
    addStylesheet(`.${id} {${styles}}`);

    // Create the element dynamically
    return React.createElement(
      typeof Component === "string" ? Component : "div",
      { className: id, ...props },
      typeof Component === "string" ? props.children : <Component {...props} />
    );
  };
