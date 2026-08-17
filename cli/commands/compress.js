import fs from "fs";
import zlib from "zlib";
import { showBox } from "../ui/box.js";
import { colors } from "../ui/theme.js";

// Compress file using zlib.gzipSync
export function compressFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return console.log(colors.error("File not found: " + filePath));
    }
    const data = fs.readFileSync(filePath);
    const compressed = zlib.gzipSync(data);
    const outputPath = filePath + ".gz";
    
    fs.writeFileSync(outputPath, compressed);

    showBox("FILE COMPRESSED", [
      `Input File:      ${filePath}`,
      `Output File:     ${colors.success(outputPath)}`,
      `Original Size:   ${data.length} bytes`,
      `Compressed Size: ${colors.success(compressed.length + " bytes")}`
    ]);
  } catch (err) {
    console.log(colors.error("Compression Error: " + err.message));
  }
}

// Decompress file using zlib.gunzipSync
export function decompressFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return console.log(colors.error("File not found: " + filePath));
    }
    const data = fs.readFileSync(filePath);
    const decompressed = zlib.gunzipSync(data);
    const outputPath = filePath.endsWith(".gz") ? filePath.slice(0, -3) : filePath + ".decompressed";

    fs.writeFileSync(outputPath, decompressed);

    showBox("FILE DECOMPRESSED", [
      `Input File:        ${filePath}`,
      `Restored File:     ${colors.success(outputPath)}`,
      `Decompressed Size: ${colors.success(decompressed.length + " bytes")}`
    ]);
  } catch (err) {
    console.log(colors.error("Decompression Error: " + err.message));
  }
}
