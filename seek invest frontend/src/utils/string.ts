export function capitalizeFirstCharacter(inputString: string) {
  // Check if the input is a valid string
  if (typeof inputString !== "string" || inputString.length === 0) {
    return inputString;
  }

  // Capitalize the first character and concatenate the rest of the string
  return (
    inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
  );
}

export function truncateStringIfNeeded(inputString: string, maxLength: number) {
  if (inputString.length > maxLength) {
    return inputString.substring(0, maxLength - 3) + "...";
  }
  return inputString;
}

export const stripCharacters = (str?: string, length = 32) => {
  if (!str) {
    return "";
  }

  return `${str.slice(0, length)}${str.length > length ? "..." : ""}`;
};
