import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputFolder = "public";          // all images are here
const outputFolder = "public/optimized"; 

// Ensure output folder exists
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
}

// Recursive function to get all files in a folder
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

// Get all files in public folder
const allFiles = getAllFiles(inputFolder);

allFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
        const relativePath = path.relative(inputFolder, path.dirname(file));
        const outputDir = path.join(outputFolder, relativePath);

        // Ensure folder exists in output
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // WebP
        sharp(file)
            .toFormat("webp", { quality: 80 })
            .toFile(path.join(outputDir, `${name}.webp`))
            .then(() => console.log(`✅ WebP created: ${path.join(relativePath, name)}.webp`))
            .catch(err => console.error("❌ Error (WebP):", err));

        // AVIF
        sharp(file)
            .toFormat("avif", { quality: 50 })
            .toFile(path.join(outputDir, `${name}.avif`))
            .then(() => console.log(`✅ AVIF created: ${path.join(relativePath, name)}.avif`))
            .catch(err => console.error("❌ Error (AVIF):", err));
    }
});
