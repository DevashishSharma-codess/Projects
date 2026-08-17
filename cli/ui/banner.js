import { printBigBanner, printAnimatedBanner } from "./theme.js";

export { printBigBanner, printAnimatedBanner };

export async function printBanner(animated = true) {
  if (animated) {
    await printAnimatedBanner();
  } else {
    printBigBanner();
  }
}

