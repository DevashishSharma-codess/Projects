#!/usr/bin/env node

import { Command } from "commander";
import { uppercase, lowercase ,wordCount , palindrome   } from "./commands/string.js";
const program = new Command();

program
  .name("tool")
  .description("Utility CLI")
  .version("1.0.0");


program
  .command("uppercase")
  .argument("<text>")
  .action(uppercase);

program
  .command("lowercase")
  .argument("<text>")
  .action(lowercase);

program
  .command("wordcount")
  .argument("<text>")
  .action(wordCount);

program
  .command("palindrome")
  .argument("<text>")
  .action(palindrome);

program.parse(process.argv);