# BlackPro Homes website

Next.js (App Router) + TypeScript + Tailwind CSS, exported as a static site.

```bash
npm install        # once
npm run dev        # local preview at http://localhost:3000
npm run build      # production build -> /out (upload this folder)
```

All words, prices, listings and images come from the **`/content`** and **`/public/media`** folders. You never need to edit the components to add or change items.

Anything still waiting on real details is written as **`[ADD …]`** or marked `"sample": true`. Search the project for `[ADD` and `"sample": true` before launch.

---

## 1. Business details

Edit **`content/site.json`**:

| Field | What to put |
|---|---|
| `contact.phone` | Phone number as you want it shown, e.g. `+234 801 234 5678` |
| `contact.phoneHref` | The same number with no spaces, for tap-to-call, e.g. `+2348012345678` |
| `contact.whatsapp` | WhatsApp number in international format, **digits only**, e.g. `2348012345678` |
| `contact.whatsappDisplay` | WhatsApp number as shown on the page |
| `contact.email`, `contact.address`, `hours` | As shown on the site |
| `socials.*` | Full profile URLs. Leave `""` to hide an icon. `instagramHandle` without the `@` |
| `analytics.gaMeasurementId` | Your Google Analytics 4 ID (`G-XXXXXXX`). Leave `""` to turn analytics off |
| `url` | The live domain, e.g. `https://www.blackprohomes.com` (used for SEO and the sitemap) |

Home page wording, stats, testimonials and partner names are in **`content/home.json`**.

## 2. Where images and video go

```
public/media/
├─ brand/                      logo-white.png, logo-black.png, og-default.jpg (social share image)
├─ hero/                       hero-poster.jpg, hero.mp4, hero.webm
├─ shortlets/<apartment-slug>/ 01.jpg, 02.jpg, …
├─ interiors/<project-slug>/   01.jpg, 02.jpg, …, before.jpg
├─ furniture/<category>/       <product-slug>.jpg
├─ furniture/fit-outs/         office fit-out photos
└─ partners/                   client/partner logos (SVG or PNG)
```

A **slug** is the item's name in lowercase with hyphens, e.g. `lekki-signature-suite`.

### Recommended sizes and formats

| Image | Size (px) | Format | Notes |
|---|---|---|---|
| Hero poster | 2400 × 1350 or larger | JPG | Shown while the video loads, and to visitors on Data Saver |
| Hero video | 1920 × 1080, 10–20 s loop, **under 6 MB** | MP4 (H.264) **and** WebM | No sound needed (it plays muted). Keep it calm and slow |
| Apartment / project photos | 2000 px on the long side | JPG, quality ~80 | Landscape for galleries; the **first** photo is the cover |
| Before/after pair | Same size and same camera angle | JPG | Matching framing makes the slider work |
| Product photos | 1600 × 1600 (square) | JPG | Plain or softly styled background |
| Logos | — | SVG preferred, else PNG with transparency | |
| Social share image | 1200 × 630 | JPG | `brand/og-default.jpg` |

You don't need to make smaller versions yourself. `npm run build` automatically creates optimised WebP copies in several sizes, so phones download small files. Please don't upload images larger than about 3–4 MB each.

### Adding the hero video

1. Put `hero.mp4` and `hero.webm` in `public/media/hero/`.
2. In `content/home.json`, set `"videoMp4": "/media/hero/hero.mp4"` and `"videoWebm": "/media/hero/hero.webm"`.

The video only starts after the page has loaded, so it doesn't slow the first view.

## 3. Add a short-let apartment

1. Create `public/media/shortlets/<slug>/` and add `01.jpg`, `02.jpg`, … (01 is the cover).
2. Copy any file in `content/shortlets/`, rename it to `<slug>.json`, and edit it:
   - `slug` must match the file name exactly.
   - `pricePerNight` is a plain number in naira, e.g. `250000`.
   - `images` lists each photo with an `alt` description (used by screen readers and Google).
   - `featured: true` shows it in the Home page carousel.
   - `mapQuery` is the text used for the Google Map, e.g. `"Lekki Phase 1, Lagos, Nigeria"`.
   - Delete the `"sample": true` line.
3. Run `npm run build`. The new apartment page appears at `/shortlets/<slug>/`.

## 4. Add an interior design project

1. Create `public/media/interiors/<slug>/` with `01.jpg` (cover), more photos, and optionally `before.jpg`.
2. Copy a file in `content/interiors/` to `<slug>.json` and edit it:
   - `category` is `"residential"` or `"commercial"`.
   - `beforeAfter` is optional. Remove the whole block if you have no before photo.
3. To choose which project appears in the Home page before/after slider, set `portfolio.beforeAfterProject` in `content/home.json` to its slug.

## 5. Add a furniture product

1. Put the photo in `public/media/furniture/<category>/<slug>.jpg`.
2. Copy a file in `content/furniture/products/` to `<slug>.json` and edit it:
   - `category` must be one of the slugs in `content/furniture/categories.json`. Add a new category there first if needed.
   - `priceFrom` is a number in naira, or `null` to show "Price on request".
   - `featured: true` shows it on the Home page.

Office fit-out projects are listed in `content/furniture/fit-outs.json`.

## 6. If the build fails

The build checks every content file. If something is missing or mistyped, it stops and names the file and field, for example:

```
Invalid content in content/shortlets/lekki-signature-suite.json:
✖ Invalid input: expected number, received string
  → at pricePerNight
```

Fix that line and run `npm run build` again. Common causes: a missing comma, a price written with quotes or a `₦` sign, or a `slug` that doesn't match the file name.

---

Placeholder photos are from Unsplash (free licence) and are listed in `public/media/PLACEHOLDER-CREDITS.txt`. Replace them with your own photography before launch.
