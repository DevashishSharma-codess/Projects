#!/usr/bin/env node

import { Command } from "commander";
import { compressFile, decompressFile } from "./commands/compress.js";
import { uppercase, lowercase, wordCount, palindrome } from "./commands/string.js";
import { fetchJoke, fetchWeather, fetchQuote } from "./commands/api.js";
import { startInteractiveMenu } from "./commands/interactive.js";

const program = new Command();

program
  .name("enact-on")
  .description("⚡ Modular CLI tool for file compression, string manipulation, and API integrations")
  .version("1.0.0")
  .addHelpText("after", `
Installation & Execution:
  $ npx enact-on                 Run interactive CLI without installing
  $ npm install -g enact-on      Install globally across your system
  $ enact-on                     Run global interactive CLI

Examples:
  $ enact-on joke
  $ enact-on weather Tokyo
  $ enact-on compress document.txt
  $ enact-on uppercase "hello world"
`);

// Subcommand: Interactive Mode
program
  .command("interactive")
  .alias("ui")
  .description("Launch interactive TTY prompt menu")
  .action(async () => {
    await startInteractiveMenu();
  });

// Compression subcommands
program
  .command("compress <file>")
  .description("Compress a file using Gzip (zlib)")
  .action(async (file) => {
    await compressFile(file);
  });

program
  .command("decompress <file>")
  .description("Decompress a gzip (.gz) file")
  .action(async (file) => {
    await decompressFile(file);
  });

// String manipulation subcommands
program
  .command("uppercase <text>")
  .description("Convert text to UPPERCASE")
  .action((text) => uppercase(text));

program
  .command("lowercase <text>")
  .description("Convert text to lowercase")
  .action((text) => lowercase(text));

program
  .command("wordcount <text>")
  .description("Count words, characters, and sentences in text")
  .action((text) => wordCount(text));

program
  .command("palindrome <text>")
  .description("Check if a string is a palindrome")
  .action((text) => palindrome(text));

// API integrations
program
  .command("joke")
  .description("Fetch a random developer joke")
  .action(async () => {
    await fetchJoke();
  });

program
  .command("weather [city]")
  .description("Fetch current weather report for a city")
  .action(async (city = "London") => {
    await fetchWeather(city);
  });

program
  .command("quote")
  .description("Fetch daily advice or tech quote")
  .action(async () => {
    await fetchQuote();
  });

// Default action: launch interactive menu if no subcommands provided
if (process.argv.length <= 2) {
  startInteractiveMenu();
} else {
  program.parse(process.argv);
}