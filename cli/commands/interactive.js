import { select, input } from "@inquirer/prompts";
import { printBigBanner, colors } from "../ui/theme.js";
import { compressFile, decompressFile } from "./compress.js";
import { uppercase, lowercase, wordCount, palindrome } from "./string.js";
import { fetchJoke, fetchWeather, fetchQuote } from "./api.js";

// Interactive menu mode
export async function startInteractiveMenu() {
  printBigBanner();
  console.log(colors.secondary("  ⚡ Select an operation below:\n"));

  while (true) {
    try {
      const choice = await select({
        message: "Choose an operation:",
        choices: [
          { name: "🗜️  Compress File", value: "compress" },
          { name: "📂 Decompress File", value: "decompress" },
          { name: "🔠 Uppercase Text", value: "upper" },
          { name: "🔡 Lowercase Text", value: "lower" },
          { name: "📊 Word Count", value: "wordcount" },
          { name: "🔄 Check Palindrome", value: "palindrome" },
          { name: "😂 Tell Me A Joke", value: "joke" },
          { name: "🌤️  Get Weather", value: "weather" },
          { name: "💡 Get Daily Advice", value: "quote" },
          { name: "❌ Exit", value: "exit" }
        ]
      });

      if (choice === "exit") {
        console.log(colors.success("\nGoodbye!\n"));
        break;
      }

      if (choice === "compress") {
        const file = await input({ message: "Enter file path to compress:" });
        if (file) compressFile(file.trim());
      } else if (choice === "decompress") {
        const file = await input({ message: "Enter file path to decompress:" });
        if (file) decompressFile(file.trim());
      } else if (choice === "upper") {
        const text = await input({ message: "Enter text:" });
        if (text) uppercase(text);
      } else if (choice === "lower") {
        const text = await input({ message: "Enter text:" });
        if (text) lowercase(text);
      } else if (choice === "wordcount") {
        const text = await input({ message: "Enter text:" });
        if (text) wordCount(text);
      } else if (choice === "palindrome") {
        const text = await input({ message: "Enter text:" });
        if (text) palindrome(text);
      } else if (choice === "joke") {
        await fetchJoke();
      } else if (choice === "weather") {
        const city = await input({ message: "Enter city:", default: "London" });
        await fetchWeather(city.trim());
      } else if (choice === "quote") {
        await fetchQuote();
      }

    } catch (err) {
      console.log(colors.muted("\nSession ended.\n"));
      break;
    }
  }
}
