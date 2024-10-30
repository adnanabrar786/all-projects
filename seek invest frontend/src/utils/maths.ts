import Decimal from "decimal.js";

export const formattedNumber = (
  number: number,
  maximumSignificantDigits: number = 4
) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits,
  }).format(number);
};

export const invertFormattedNumber = (number: string) => {
  return number.replace(/,/g, "");
};

export const formattedNumberToDecimal = (number: number | string) => {
  if (typeof number === "string") {
    number = parseInt(number);
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
}).format;

export const handleMillionBillion = (avg_market_cap) => {
  let val = Math.trunc(avg_market_cap) / 1000;

  return val < 1
    ? `${avg_market_cap.toFixed(2)}M`
    : `${(avg_market_cap / 1000).toFixed(2)}B`;
};

export function getSum(list: number[]) {
  const sum = list.reduce(
    (p, c) => new Decimal(p).plus(new Decimal(c)).toNumber(),
    0
  );
  return sum;
}

export const formatContactNumber = (contactNumber: string | undefined) => {
  if (!contactNumber) return `-`;

  const digits = contactNumber.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.substring(0, 3)}) ${digits.substring(
      3,
      6
    )} ${digits.substring(6)}`;
  }
  return `(${digits.substring(1, 4)}) ${digits.substring(
    4,
    7
  )} ${digits.substring(7)}`;
};

export const isLimitedDecimal = (value: string, decimals = 2) => {
  const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
  return regex.test(value);
};

export const normalizeProgressValue = (value: number, isInt?: boolean) => {
  const result = value > 10 ? Math.round(value / 10) : value;
  if (isInt) {
    return parseInt(`${result}`);
  }
  return result;
};

export const formatPhoneNumber = (value) => {
  if (!value) return value; // return early if value is undefined/null

  // Remove all non-digit characters
  const numericValue = value.replace(/\D/g, "");

  // Handle numbers outside the acceptable range
  if (numericValue.length < 10 || numericValue.length > 12) {
    return "Error: Phone number must be between 10 and 12 digits";
  }

  // Apply different formats based on length
  if (numericValue.length === 10) {
    return `(${numericValue.slice(0, 3)}) ${numericValue.slice(
      3,
      6
    )}-${numericValue.slice(6, 10)}`;
  } else if (numericValue.length === 11) {
    return `+${numericValue.slice(0, 1)} (${numericValue.slice(
      1,
      4
    )}) ${numericValue.slice(4, 7)}-${numericValue.slice(7, 11)}`;
  } else if (numericValue.length === 12) {
    return `+${numericValue.slice(0, 2)} (${numericValue.slice(
      2,
      5
    )}) ${numericValue.slice(5, 8)}-${numericValue.slice(8, 12)}`;
  }

  return value; // Return the original value if it doesn't meet the length requirements
};
