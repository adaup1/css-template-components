const serverStyles: string[] = [];

export const addServerStyles = (styles: string) => {
  if (typeof window === "undefined") {
    serverStyles.push(styles);
  }
};

export const getServerStyles = () => {
  return serverStyles.join("\n");
};
