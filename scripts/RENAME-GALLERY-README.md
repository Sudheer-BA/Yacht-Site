# Gallery Image Rename Script

Renames gallery images to a simple format: **`1-yacht.jpg`**, **`2-yacht.jpg`**, etc.

## Output format

- `1-yacht.jpg`
- `2-yacht.jpg`
- `3-yacht.jpg`
- … (preserves leading number, uses `.jpg` / `.jpeg` / `.png` / `.webp`)

## Workflow (recommended)

### 1. Dry run (preview only)

```bash
node scripts/rename-gallery.js
```

Shows what would be renamed without changing any files.

### 2. Test with 3–4 images

```bash
node scripts/rename-gallery.js --test
```

Runs a dry run on the **first 4** images only. Review the output.

### 3. Execute test (apply to 4 images)

```bash
node scripts/rename-gallery.js --test --execute
```

Actually renames the first 4 images. Use this to verify before a full run.

### 4. Full execute

```bash
node scripts/rename-gallery.js --execute
```

Renames all gallery images.

## Options

| Option      | Description                          |
|------------|--------------------------------------|
| (none)     | Dry run – preview only               |
| `--test`   | Limit to first 4 images              |
| `--execute`| Apply renames                        |

## Target folder

`images/gallery/` (default). Use `--dir <path>` to test on another folder:

```bash
node scripts/rename-gallery.js --dir images/gallery-test --test --execute
```

## Supported extensions

`.jpg`, `.jpeg`, `.png`, `.webp`
