import sharp from "sharp";
import fs from "fs";
import path from "path";
import minimist from "minimist";

const args = minimist(process.argv.slice(2), {
  default: {
    input: "public",
    output: "public/optimized",
    webpQuality: 80,
    avifQuality: 50,
  },
});

const inputFolder = args.input;
const outputFolder = args.output;
const webpQuality = parseInt(args.webpQuality, 10);
const avifQuality = parseInt(args.avifQuality, 10);

// Ensure output folder exists
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Recursive function to get all files
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// Supported formats
const supportedFormats = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"];

async function optimizeImages() {
  const allFiles = getAllFiles(inputFolder);

  await Promise.all(
    allFiles.map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      const name = path.basename(file, ext);

      if (!supportedFormats.includes(ext)) {
        console.log(`⚠️ Skipped unsupported file: ${file}`);
        return;
      }

      const relativePath = path.relative(inputFolder, path.dirname(file));
      const outputDir = path.join(outputFolder, relativePath);

      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      try {
        // GIF & SVG ko skip karenge (sharp inhe convert karne me best nahi hai)
        if ([".gif", ".svg"].includes(ext)) {
          console.log(`ℹSkipped (no conversion applied): ${file}`);
          return;
        }

        // WebP
        await sharp(file)
          .toFormat("webp", { quality: webpQuality })
          .toFile(path.join(outputDir, `${name}.webp`));
        console.log(`WebP created (${webpQuality}%): ${path.join(relativePath, name)}.webp`);

        // AVIF
        await sharp(file)
          .toFormat("avif", { quality: avifQuality })
          .toFile(path.join(outputDir, `${name}.avif`));
        console.log(`AVIF created (${avifQuality}%): ${path.join(relativePath, name)}.avif`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    })
  );
}

optimizeImages();
