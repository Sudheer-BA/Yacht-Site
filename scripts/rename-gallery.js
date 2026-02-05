/**
 * Rename gallery images to simple format: 1-yacht.jpg, 2-yacht.jpg, etc.
 *
 * Usage:
 *   node scripts/rename-gallery.js                    # Dry run (preview only)
 *   node scripts/rename-gallery.js --test             # Test with first 4 images only
 *   node scripts/rename-gallery.js --execute         # Actually rename all files
 *   node scripts/rename-gallery.js --dir <path>       # Use custom folder (for testing)
 */

const fs = require("fs");
const path = require("path");

function getGalleryDir() {
  const args = process.argv.slice(2);
  const dirIdx = args.indexOf("--dir");
  if (dirIdx >= 0 && args[dirIdx + 1]) {
    return path.resolve(process.cwd(), args[dirIdx + 1]);
  }
  return path.join(__dirname, "..", "images", "gallery");
}

const GALLERY_DIR = getGalleryDir();

// Extract leading number from filename: "1-web-or-mls-66' Azimut -108.jpg" -> 1
function getLeadingNumber(filename) {
  const match = filename.match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : null;
}

function getExtension(filename) {
  return path.extname(filename);
}

function main() {
  const args = process.argv.slice(2);
  const isExecute = args.includes("--execute");
  const isTest = args.includes("--test");
  const isDryRun = !isExecute;

  if (!fs.existsSync(GALLERY_DIR)) {
    console.error("Gallery folder not found:", GALLERY_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(GALLERY_DIR).filter((f) => {
    const fullPath = path.join(GALLERY_DIR, f);
    return fs.statSync(fullPath).isFile() && /\.(jpg|jpeg|png|webp)$/i.test(f);
  });

  const renames = [];
  const seenNumbers = new Map();

  for (const file of files) {
    const num = getLeadingNumber(file);
    if (num === null) continue;

    const ext = getExtension(file);
    const newName = `${num}-yacht${ext}`;

    if (seenNumbers.has(num)) {
      console.warn(`Conflict: ${num} used by both "${seenNumbers.get(num)}" and "${file}"`);
    }
    seenNumbers.set(num, file);

    if (file !== newName) {
      renames.push({ from: file, to: newName, num });
    }
  }

  // Sort by number for predictable order
  renames.sort((a, b) => a.num - b.num);

  // Test mode: only first 4
  const toProcess = isTest ? renames.slice(0, 4) : renames;

  if (toProcess.length === 0) {
    console.log("No files to rename.");
    return;
  }

  console.log(isDryRun ? "=== DRY RUN (no changes made) ===" : "=== EXECUTING ===");
  console.log(`Files to rename: ${toProcess.length}${isTest ? " (test mode)" : ""}\n`);

  for (const { from, to, num } of toProcess) {
    const fromPath = path.join(GALLERY_DIR, from);
    const toPath = path.join(GALLERY_DIR, to);

    if (isDryRun) {
      console.log(`  ${from}  ->  ${to}`);
    } else {
      try {
        fs.renameSync(fromPath, toPath);
        console.log(`  OK: ${from}  ->  ${to}`);
      } catch (err) {
        console.error(`  FAIL: ${from}  ->  ${to}`, err.message);
      }
    }
  }

  if (isDryRun && toProcess.length > 0) {
    console.log("\nRun with --execute to apply changes.");
    if (!isTest) {
      console.log("Run with --test to try on 4 images first.");
    }
  }
}

main();
