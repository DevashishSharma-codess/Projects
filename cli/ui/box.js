import { colors } from "./theme.js";

// Simple boxed message display
export function showBox(title, message) {
  console.log("\n" + colors.primary("┌─ " + title + " " + "─".repeat(Math.max(10, 45 - title.length))));
  if (Array.isArray(message)) {
    message.forEach(line => console.log(colors.primary("│ ") + line));
  } else {
    console.log(colors.primary("│ ") + message);
  }
  console.log(colors.primary("└" + "─".repeat(48)) + "\n");
}
