# enact-on ⚡

> Modular, interactive Node.js CLI tool for file compression, string manipulation, and API integrations.

[![npm version](https://img.shields.io/npm/v/enact-on.svg?style=flat-square)](https://www.npmjs.com/package/enact-on)
[![license](https://img.shields.io/npm/l/enact-on.svg?style=flat-square)](https://github.com/Devashish-Repo/enact-on/blob/main/LICENSE)
[![node version](https://img.shields.io/node/v/enact-on.svg?style=flat-square)](https://nodejs.org)

---

## 🚀 Features

- 🤖 **AI Agent**: Interactive coding & task assistant powered by LangGraph, Gemini & Tavily.
- 🗜️ **File Compression**: Fast Gzip compression and decompression for files.
- 🔠 **String Tools**: Convert case, count words/characters/sentences, check palindromes.
- 🌐 **API Utilities**: Fetch random jokes, weather updates, and daily tech advice.
- 🎨 **Interactive TTY Menu**: Terminal UI powered by `@inquirer/prompts` and `chalk`.
- 💻 **Cross-Platform**: Supports Windows, macOS, and Linux out of the box.
- 🌟 **Gantic Features**: Advanced automation and enhanced workflow capabilities.

---

## ⚡ Quick Start

You can run the CLI instantly without installing anything:

```bash
npx enact-on
```

Or launch the AI Agent directly:

```bash
npx enact-on agent
```

---

## 📦 Installation

To install `enact-on` globally across your system so you can run `enact-on` from any terminal:

```bash
npm install -g enact-on
```

After installing globally, simply type `enact-on` in your command line:

```bash
enact-on
```

### 2. Direct CLI Subcommands

#### 🤖 AI Agent
```bash
# Launch interactive AI Agent session
enact-on agent

# Run AI Agent with an initial prompt or question
enact-on ai "Explore this directory and summarize the contents"
```

#### File Compression
```bash
# Compress a file
enact-on compress myfile.txt

# Decompress a gzip file
enact-on decompress myfile.txt.gz
```

#### String Manipulation
```bash
# Convert to UPPERCASE
enact-on uppercase "hello world"

# Convert to lowercase
enact-on lowercase "HELLO WORLD"

# Word & character count
enact-on wordcount "Quick brown fox jumps over the lazy dog"

# Palindrome check
enact-on palindrome "racecar"
```

#### API Integrations
```bash
# Fetch developer joke
enact-on joke

# Fetch weather (default: London)
enact-on weather Paris

# Fetch daily advice quote
enact-on quote
```

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Devashish-Repo/enact-on.git
   cd enact-on
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Link locally for testing:**
   ```bash
   npm link
   enact-on --help
   ```

---

## 📄 License

[MIT](LICENSE) © Devashish
