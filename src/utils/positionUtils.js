export function getOrdinalNumber(position) {
  const ordinalSuffixes = ["th", "st", "nd", "rd"];
  const remainderOfHundred = position % 100;

  const ordinalSuffix =
    remainderOfHundred >= 11 && remainderOfHundred <= 13
      ? "th"
      : ordinalSuffixes[Math.min(remainderOfHundred % 10, 4)] || "th";
  return `${position}${ordinalSuffix}`;
}
