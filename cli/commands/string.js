import { showBox } from "../ui/box.js";
import { colors } from "../ui/theme.js";

// Uppercase conversion
export function uppercase(text) {
  showBox("UPPERCASE", colors.success(text.toUpperCase()));
}

// Lowercase conversion
export function lowercase(text) {
  showBox("LOWERCASE", colors.success(text.toLowerCase()));
}

// Word count & length
export function wordCount(text) {
  const count = text.trim().split(/\s+/).filter(Boolean).length;
  showBox("WORD COUNT", [
    `Input Text: "${text}"`,
    `Total Words:      ${colors.success(count)}`,
    `Total Characters: ${colors.secondary(text.length)}`
  ]);
}

// Palindrome check
export function palindrome(text) {
  const clean = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversed = clean.split("").reverse().join("");
  const isPal = clean === reversed;

  showBox("PALINDROME CHECK", [
    `Input:    ${text}`,
    `Cleaned:  ${clean}`,
    `Reversed: ${reversed}`,
    `Result:   ${isPal ? colors.success("YES - Palindrome!") : colors.error("NO - Not a palindrome")}`
  ]);
}