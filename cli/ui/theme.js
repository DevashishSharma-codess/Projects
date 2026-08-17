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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const bannerLines = [
  "████████╗███╗   ██╗ █████╗  ██████╗████████╗   ██████╗ ███╗   ██╗",
  "██╔═════╝████╗  ██║██╔══██╗██╔════╝╚══██╔══╝  ██╔═══██╗████╗  ██║",
  "██████╗  ██╔██╗ ██║███████║██║        ██║     ██║   ██║██╔██╗ ██║",
  "██╔═══╝  ██║╚██╗██║██╔══██║██║        ██║     ██║   ██║██║╚██╗██║",
  "████████╗██║ ╚████║██║  ██║╚██████╗   ██║     ╚██████╔╝██║ ╚████║",
  "╚═══════╝╚═╝  ╚═══╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝      ╚═════╝ ╚═╝  ╚═══╝"
];

const catFrames = [
  [
    cat("      /\\_/\\    "),
    cat("     ( -.- )   "),
    cat("      > ^ <    "),
    cat("     /  ~  \\   "),
    cat("    (   :   )  "),
    cat("     \\__|_/    ")
  ],
  [
    cat("      /\\_/\\    "),
    cat("     ( o.o )  🐾"),
    cat("      > ^ <    "),
    cat("     /  S  \\   "),
    cat("    (   :   )  "),
    cat("     \\__|_/    ")
  ],
  [
    cat("      /\\_/\\    "),
    cat("     ( ^.^ ) 💻"),
    cat("      > w <    "),
    cat("     /  ~  \\   "),
    cat("    (   :   )  "),
    cat("     \\__|_/    ")
  ],
  [
    cat("      /\\_/\\    "),
    cat("     ( o.~ ) ⚡"),
    cat("      > ^ <    "),
    cat("     /  S  \\   "),
    cat("    (   :   )  "),
    cat("     \\__|_/    ")
  ],
  [
    cat("      /\\_/\\    "),
    cat("     ( o.o )   "),
    cat("      > ^ <    "),
    cat("     /  ~  \\   "),
    cat("    (   :   )  "),
    cat("     \\__|_/    ")
  ]
];

const typingTexts = [
  "  🐱 e...",
  "  🐱 e-n-a-c...",
  "  🐱 e-n-a-c-t--o-n...",
  "  🐱 E N A C T - O N  C L I",
  "  🐱 ENACT-ON CLI • Modular Task Utility v3.0.4"
];

const revealRatios = [0.2, 0.45, 0.7, 0.9, 1.0];

/**
 * Cat ASCII Art + Big ENACT-ON Text Banner Side-by-Side (Static)
 */
export function printBigBanner() {
  console.log("");
  for (let i = 0; i < 6; i++) {
    console.log(`${catFrames[4][i]} ${c(bannerLines[i])}`);
  }
  console.log(`\n  ${colors.secondary("🐱 ENACT-ON CLI")} ${colors.muted("• Modular Task Utility v3.0.4")}`);
  console.log(`  ${colors.primary("──────────────────────────────────────────────────────────────────────────")}\n`);
}

/**
 * Animated Cat ASCII + Typewriter ENACT-ON Banner (Ultra-Fast & Cross-Platform Safe)
 */
export async function printAnimatedBanner() {
  try {
    if (!process.stdout.isTTY || process.env.CI) {
      printBigBanner();
      return;
    }

    console.log("");

    // 1. Ultra-fast reveal of Cat ASCII & ENACT-ON logo lines (6ms per line)
    for (let i = 0; i < 6; i++) {
      console.log(`${catFrames[i < 5 ? i : 4][i]} ${c(bannerLines[i])}`);
      await sleep(6);
    }

    // 2. Ultra-fast typewriter subtext (3ms per char)
    const fullSubtext = "🐱 ENACT-ON CLI • Modular Task Utility v1.0.0";
    process.stdout.write("\n  ");
    for (let i = 0; i < fullSubtext.length; i++) {
      const char = fullSubtext[i];
      if (i < 14) {
        process.stdout.write(colors.secondary(char));
      } else {
        process.stdout.write(colors.muted(char));
      }
      await sleep(3);
    }

    // 3. Render divider line
    console.log(`\n  ${colors.primary("──────────────────────────────────────────────────────────────────────────")}\n`);
  } catch (err) {
    printBigBanner();
  }
}


export const bannerText = "ENACT-ON CLI";


