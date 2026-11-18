# Kolkata Local Tours

A fast, static tourism website built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com). It has no backend or database: enquiries go to WhatsApp (or to email through Web3Forms).

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
npm run preview    # preview the built site
```

## Where to edit things

| What | File |
|---|---|
| Business name, phone, WhatsApp, email | `src/config.ts` |
| Tours (one Markdown file per tour) | `src/content/tours/*.md` |
| Tour fields (price, duration, etc.) | `src/content.config.ts` |
| Brand colours and fonts | `src/styles/global.css` (`@theme` block) |
| Home / About / Contact pages | `src/pages/*.astro` |
| Header, footer, cards, form | `src/components/*.astro` |
| Photos | `public/images/` |

### Add a new tour
1. Copy any file in `src/content/tours/`, for example `mayapur-day-trip.md`, and give it a new name. The file name becomes the URL (`/tours/<file-name>`).
2. Edit the fields at the top (title, price, category…) and the description below them.
3. Optional: put a photo in `public/images/` and set `image: /images/your-photo.jpg`.

`category` must be one of `City Tour`, `Day Trip` or `Weekend Trip`. You can add more in `src/content.config.ts`. If a field is wrong, the build tells you exactly which one.

### Enquiries by email (optional)
By default, the enquiry form opens WhatsApp with the details already filled in. To receive enquiries by email instead, get a free access key from https://web3forms.com and paste it into `web3formsKey` in `src/config.ts`.

## Deploy for free (Cloudflare Pages)
1. Push this folder to a GitHub repository.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, then pick the repo.
3. Build command: `npm run build`. Output directory: `dist`.
4. Every push redeploys automatically. Set the final URL as `site` in `astro.config.mjs`.

Netlify and Vercel work the same way.

## Before going live: checklist
- [ ] Real WhatsApp number, phone and email in `src/config.ts`
- [ ] Your own story on the About page
- [ ] Real tour prices and photos (the sample prices are placeholders)
- [ ] `site` URL in `astro.config.mjs`
- [ ] Create a free Google Business Profile that links to the site
