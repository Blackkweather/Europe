# European Era – Next.js 14 Website Rebuild

Modern, high-performance rebuild of [European Era](https://europeanera.eu/) using Next.js 14+ (App Router). All textual content is verbatim from the PRD; design and stack are new.

## File tree

```
Europe arena/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Commitment.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Testimonials.tsx
│   └── WhatsAppFab.tsx
├── lib/
│   ├── constants.ts
│   └── utils.ts
├── public/
│   └── images/
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Dependencies (package.json snippet)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "react-hook-form": "^7.49.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "lucide-react": "^0.300.0",
    "embla-carousel-react": "^8.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

## Run the project locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Build for production**

```bash
npm run build
npm start
```

## Tech stack

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** (icons)
- **Framer Motion** (subtle animations)
- **React Hook Form + Zod** (contact form)
- **Embla Carousel** (testimonials)

Contact data is centralized in `lib/constants.ts`; phone, email, and WhatsApp links are used in the main Contact section, footer, and optional WhatsApp FAB.
