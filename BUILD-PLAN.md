# Yacht Rental Site — Build Plan

## Where We Stand

### Current State
- **Template**: Canvas (Bootstrap-based corporate template)
- **Main file**: `index.html.html` (~2,019 lines)
- **No 11ty**: No `package.json`, no build setup
- **Heavy dependencies**: 
  - `style.css` (~33k lines)
  - `include/rs-plugin` (2,755 files)
  - 50+ JS modules (jQuery, Swiper, Flexslider, etc.)
  - Mega menus, shopping cart, search, blogroll — none needed for yacht site

### What We Can Reuse
| Asset | Location | Use |
|-------|----------|-----|
| Hero slider images | `images/slider/swiper/` (1.jpg, 2.jpg, 3.jpg, etc.) | Placeholder until yacht photos |
| Video | `images/videos/explore.mp4` + `explore.webm` | Hero or gallery video |
| Testimonial images | `images/testimonials/` (1–10.jpg) | Client reviews section |
| Parallax/hero images | `images/parallax/`, `images/slider/` | Gallery placeholders |
| Logo | `images/logo.png`, `images/logo-dark.png` | Replace with yacht branding |
| Swiper CSS/JS | `css/swiper.css`, `js/plugins.swiper.js` | Hero slider (if we keep it) |

### What We're Building
- **5 pages**: Home, About, Gallery, Reviews, Contact
- **11ty** for layouts and maintainability
- **Simple design**: Modern, minimal, media-focused
- **No backend**: Formspree or Netlify Forms for contact

---

## Step-by-Step Plan

### Phase 1: Setup (Day 1 — ~2–3 hours)

#### Step 1.1: Create 11ty project structure
```
yacht-site/                    (new folder, or use current)
├── _includes/
│   ├── layout.njk            # Base HTML layout
│   ├── header.njk            # Nav + logo
│   └── footer.njk            # Footer
├── css/
│   └── main.css              # Our custom CSS (fresh, minimal)
├── js/
│   └── main.js               # Minimal JS
├── images/                    # Copy/curate from existing
├── index.njk                  # Home
├── about.njk
├── gallery.njk
├── reviews.njk
├── contact.njk
├── .eleventy.js               # 11ty config
├── package.json
└── BUILD-PLAN.md              # This file
```

#### Step 1.2: Initialize 11ty
- Run `npm init -y`
- Run `npm install @11ty/eleventy`
- Create `.eleventy.js` with input/output paths
- Add scripts: `"build": "eleventy"`, `"dev": "eleventy --serve"`

#### Step 1.3: Create base layout
- `_includes/layout.njk`: `<!DOCTYPE html>`, `<head>`, `<body>`, `{{ content }}`
- Include meta, viewport, one font (e.g. Inter or similar)
- Link to `css/main.css`

---

### Phase 2: Core Pages (Day 2 — ~3–4 hours)

#### Step 2.1: Header & footer
- `_includes/header.njk`: Logo, nav links (Home, About, Gallery, Reviews, Contact)
- `_includes/footer.njk`: Copyright, social links, minimal
- No search, no cart, no mega menus

#### Step 2.2: Home page
- Hero: Full-width image or simple Swiper (3 slides)
- Short intro text (1–2 sentences)
- CTA button → Contact or Gallery
- Reuse: `images/slider/swiper/1.jpg`, `2.jpg`, `3.jpg` as placeholders

#### Step 2.3: About page
- One hero image
- 2–3 short paragraphs
- Optional: one team/owner photo

#### Step 2.4: Gallery page
- Grid of 6–12 images (3–4 columns)
- Use `images/parallax/` or `images/slider/swiper/` as placeholders
- Optional: lightbox on click (vanilla JS or tiny lib)

#### Step 2.5: Reviews page
- Simple list or carousel of 3–5 client testimonials
- Each: quote, name, optional photo
- Use `images/testimonials/` for placeholder avatars

#### Step 2.6: Contact page
- Form: Name, Email, Message
- Formspree: `action="https://formspree.io/f/xxxxx"`
- Optional: phone, address as static text

---

### Phase 3: Design & Polish (Day 3 — ~2–3 hours)

#### Step 3.1: CSS architecture
- CSS variables: `--color-primary`, `--font-body`, `--spacing`, etc.
- Mobile-first responsive
- Clean typography (1–2 font families)

#### Step 3.2: Hero options
- **Option A**: Single full-screen image (simplest)
- **Option B**: Swiper slider (reuse from template, trim JS)
- **Option C**: Background video (explore.mp4)

#### Step 3.3: Responsive & accessibility
- Test on mobile
- Ensure forms have labels
- Add `alt` to all images

---

### Phase 4: Assets & Optimization (Day 4 — ~1–2 hours)

#### Step 4.1: Image curation
- Copy only needed images to `images/` (hero, gallery, testimonials)
- Replace placeholders with real yacht photos when ready

#### Step 4.2: Trim dependencies
- No Bootstrap, no jQuery (unless Swiper needs it)
- If using Swiper: include only `swiper.min.js` + `swiper.min.css`
- Or: replace with CSS-only or vanilla JS slider

#### Step 4.3: Performance
- Lazy load images: `loading="lazy"`
- Compress images (TinyPNG, Squoosh)
- Minify CSS for production

---

### Phase 5: Final Steps (Day 5 — ~1 hour)

#### Step 5.1: Testing
- Run `npm run build` → check `_site/` output
- Open each page in browser
- Test contact form (Formspree)

#### Step 5.2: Deploy
- Push to GitHub
- Deploy to Netlify/Vercel (drag `_site` folder or connect repo)
- Or: upload `_site/` contents to any static host

---

## Decision Points

| Decision | Options | Recommendation |
|----------|---------|----------------|
| **Hero** | Image / Swiper / Video | Start with single image; add Swiper if you want slides |
| **Contact form** | Formspree / Netlify Forms | Formspree (no host lock-in) |
| **Swiper** | Keep / Remove | Remove for simplicity; use CSS or vanilla JS if needed |
| **Bootstrap** | Keep / Remove | Remove; write minimal custom CSS |
| **Folder** | New `yacht-site/` / Use current | New folder keeps template intact for reference |

---

## File Checklist

- [ ] `package.json` + 11ty installed
- [ ] `.eleventy.js` config
- [ ] `_includes/layout.njk`
- [ ] `_includes/header.njk`
- [ ] `_includes/footer.njk`
- [ ] `index.njk` (Home)
- [ ] `about.njk`
- [ ] `gallery.njk`
- [ ] `reviews.njk`
- [ ] `contact.njk`
- [ ] `css/main.css`
- [ ] `js/main.js` (if needed)
- [ ] Formspree form ID configured

---

## Estimated Timeline

| Phase | Time |
|-------|------|
| Phase 1: Setup | 2–3 hours |
| Phase 2: Core pages | 3–4 hours |
| Phase 3: Design | 2–3 hours |
| Phase 4: Assets | 1–2 hours |
| Phase 5: Final | ~1 hour |
| **Total** | **~10–13 hours** (2–3 days) |

---

## Next Action

When ready to start: **Begin with Phase 1, Step 1.1** — create the folder structure and run `npm init` + `npm install @11ty/eleventy`.
