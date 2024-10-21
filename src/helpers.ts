const hashMap = new Map();

export const createHashCode = ({
  styleString,
  component = "",
  key = "",
}: {
  styleString: string;
  component: string;
  key: string;
}) => {
  let hash = 0;
  const combinedStr = styleString + component + key;

  // Generate the initial hash based on the style string and identifier
  for (let i = 0; i < combinedStr.length; i++) {
    const char = combinedStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Ensure it's a 32-bit integer
  }

  let originalHash = hash.toString(36);
  let uniqueHash = originalHash;
  let counter = 1;

  // Check for hash collisions
  while (hashMap.has(uniqueHash) && hashMap.get(uniqueHash) !== styleString) {
    uniqueHash = `${originalHash}-${counter++}`;
  }

  hashMap.set(uniqueHash, styleString);

  return uniqueHash;
};

export const sanitizeStyles = (styles: string): string => {
  // Replace dangerous characters or content if needed
  return styles.replace(/<\/?[^>]+(>|$)/g, "").trim();
};
