import chalk from "chalk";

// EnactOn Theme Colors
export const colors = {
  primary: chalk.hex("#00C0FF").bold,     // EnactOn Cyan / Sky Blue
  secondary: chalk.hex("#FF5500").bold,   // EnactOn Orange / Pink
  accent: chalk.hex("#FFE600").bold,      // Cyber Yellow
  success: chalk.hex("#00FF66").bold,     // Neon Green
  warning: chalk.hex("#FF9900").bold,     // Amber
  error: chalk.hex("#FF3333").bold,       // Crimson Red
  muted: chalk.hex("#6C7A89"),            // Slate Gray
  white: chalk.white.bold,
  catColor: chalk.hex("#00C0FF").bold    // Bright Cat Orange
};

const c = colors.primary;
const cat = colors.catColor;

/**
 * Cat ASCII Art + Big ENACT-ON Text Banner Side-by-Side
 */
export function printBigBanner() {
  console.log("");
  console.log(`${cat("      /\\_/\\    ")} ${c("████████╗███╗   ██╗ █████╗  ██████╗████████╗   ██████╗ ███╗   ██╗")}`);
  console.log(`${cat("     ( o.o )   ")} ${c("██╔═════╝████╗  ██║██╔══██╗██╔════╝╚══██╔══╝  ██╔═══██╗████╗  ██║")}`);
  console.log(`${cat("      > ^ <    ")} ${c("██████╗  ██╔██╗ ██║███████║██║        ██║     ██║   ██║██╔██╗ ██║")}`);
  console.log(`${cat("     /  ~  \\   ")} ${c("██╔═══╝  ██║╚██╗██║██╔══██║██║        ██║     ██║   ██║██║╚██╗██║")}`);
  console.log(`${cat("    (   :   )  ")} ${c("████████╗██║ ╚████║██║  ██║╚██████╗   ██║     ╚██████╔╝██║ ╚████║")}`);
  console.log(`${cat("     \\__|_/    ")} ${c("╚═══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝      ╚═════╝ ╚═╝  ╚═══╝")}`);
  console.log(`\n  ${colors.secondary("🐱 ENACT-ON CLI")} ${colors.muted("• Modular Task Utility v1.0.0")}`);
  console.log(`  ${colors.primary("──────────────────────────────────────────────────────────────────────────")}\n`);
}

export const bannerText = "ENACT-ON CLI";
