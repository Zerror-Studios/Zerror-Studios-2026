const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

/* ================= CONFIG ================= */

// Input & Output
const INPUT_DIR = path.join(__dirname, "./public/images/work");
const OUTPUT_DIR = path.join(__dirname, "./public/compressed");

// Output settings
const OUTPUT_FORMAT = "png"; // webp | avif | jpeg
const MAX_SIZE_KB = 100; // per image size limit
const MIN_QUALITY = 30;
const START_QUALITY = 80;
const QUALITY_STEP = 5;

// Supported input formats
const INPUT_EXTENSIONS = [".png", ".jpg", ".jpeg"];

/* ========================================== */

const MAX_SIZE_BYTES = MAX_SIZE_KB * 1024;

async function compressImage(inputPath, outputPath) {
  let quality = START_QUALITY;
  let buffer;

  while (quality >= MIN_QUALITY) {
    buffer = await sharp(inputPath)
      [OUTPUT_FORMAT]({ quality })
      .toBuffer();

    if (buffer.length <= MAX_SIZE_BYTES) break;
    quality -= QUALITY_STEP;
  }

  await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.promises.writeFile(outputPath, buffer);

  console.log(
    `✅ ${outputPath} → ${Math.round(buffer.length / 1024)}KB (q:${quality})`
  );
}

async function processFolder(folder) {
  const items = await fs.promises.readdir(folder);

  for (const item of items) {
    const fullPath = path.join(folder, item);
    const stat = await fs.promises.stat(fullPath);

    if (stat.isDirectory()) {
      await processFolder(fullPath);
      continue;
    }

    const ext = path.extname(item).toLowerCase();
    if (!INPUT_EXTENSIONS.includes(ext)) continue;

    const relativePath = path.relative(INPUT_DIR, fullPath);
    const outputPath = path.join(
      OUTPUT_DIR,
      relativePath.replace(ext, `.${OUTPUT_FORMAT}`)
    );

    await compressImage(fullPath, outputPath);
  }
}

(async () => {
  try {
    console.log("🚀 Optimizing images...");
    await processFolder(INPUT_DIR);
    console.log("🎉 All images optimized!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();