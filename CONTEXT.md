# JadenRaats.com - Project Context

## Vision

A free utility website for anyone interested in AI. Not a portfolio. Not a sales funnel. Just useful tools and practical guides.

**Positioning**: "I build things with AI that actually work. Here's how."

## Core Values

- **Utility first**: Every page provides immediate value
- **No friction**: No signup, no ads, no upsells
- **Honesty**: Direct, practical tone. Builder to builder
- **Open**: Show your work, share real examples

## Site Structure

```
Homepage (/)
├── Hero: "I build things with AI that actually work"
├── Tool Grid (6 items)
│   ├── Live Tools
│   │   ├── Website Health Checker (/tools/website-health)
│   │   └── ROI Calculator (/tools/roi-calculator)
│   └── Coming Soon (placeholders)
│       ├── FloorQuote Estimator
│       ├── AI Tool Finder
│       ├── Prompt Tester
│       └── Quick Prototyper
└── CTA: "See What I'm Building"

Projects/Blog (/projects or /writing)
├── Things I've made with AI
├── Experiments & learnings
├── Real examples with code
└── CTA: "Try the Tools"
```

## Key Copy

### Homepage Hero

> "I build things with AI that actually work"

> "These are tools and experiments I've built while exploring what's possible with AI. No signup required. No hidden features. Just useful stuff and real examples."

### Tone

- Direct, practical, no-nonsense
- Avoid: Startup hype, consultant-speak, academic theory, AI buzzwords
- Use: Short sentences, clear value, real examples, honest about limitations
- Speaking as: Builder to builder, experimenter to curious person

## Technical Details

### Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **TypeScript** (type safety)

### Deployment

- **Platform**: Vercel
- **Domain**: jadenraats.com
- **CI/CD**: GitHub → Vercel auto-deploy
- **Analytics**: Vercel Web Analytics (optional)

### Design System

**Colors**:
- Primary: Orange (#F97316)
- Secondary: Sky Blue (#0EA5E9)
- Neutral: Dark to light gray
- Status: Green, Yellow, Red, Blue

**Typography**:
- Display: Poppins (bold, friendly)
- Body: Inter (neutral, legible)
- Mono: System (code)

**Spacing**: 8pt grid (8px, 16px, 24px, 32px, etc.)

**Components**:
- `.card` - Content container
- `.btn`, `.btn-primary`, `.btn-secondary` - Buttons
- `.badge` - Status indicators
- `.input` - Form inputs

## What NOT to Add

❌ Email capture / lead magnet
❌ Signup / authentication
❌ Payment / premium tier
❌ Consulting CTA / sales funnel
❌ Blog / content marketing
❌ Portfolio / case studies
❌ Obsidian vault integration
❌ Complex animations (keep it fast)

## File Organization

The project is now located in `~/Code Projects/jadenraats-com/` to optimize performance by isolating it from the user home directory.

```bash
/Users/jadenraats/Code Projects/jadenraats-com/
├── src/                # Next.js pages & layouts
│   ├── app/            # App router components
│   └── components/     # UI components
├── .gitignore          # Performance: excludes non-project folders
├── .antigravityignore  # Performance: excludes non-project folders
├── CONTEXT.md          # This file
└── ...                 # Other config files
```

## Adding New Features

### Adding a New Tool

1. **Create component** in `src/components/tools/NewTool.tsx`
2. **Create page** in `src/app/tools/new-tool/page.tsx`
3. **Update homepage** in `src/app/page.tsx` - add to tools array
4. **Deploy**: `git push` (Vercel auto-deploys)

### Updating Copy

1. Edit relevant `.tsx` file
2. Keep tone consistent (direct, practical)
3. Test on mobile
4. Deploy

### Styling Changes

1. Update `tailwind.config.ts` for theme changes
2. Update `src/app/globals.css` for global styles
3. Use Tailwind classes in components
4. Avoid inline CSS

## Performance Notes

- ✅ Already optimized for speed
- ✅ Lazy loading on images
- ✅ CSS purged by Tailwind
- ✅ JavaScript code-split by Next.js
- ✅ Dark mode efficient (native CSS)
- ✅ Project isolated from home directory
- ✅ Custom ignore files for IDE performance

**Lighthouse target**: 90+ on all metrics

## SEO

- ✅ Metadata in layout.tsx
- ✅ Open Graph tags for social sharing
- ✅ Semantic HTML
- ✅ Mobile-responsive

**To improve**:
- Add JSON-LD structured data
- Create sitemap.xml
- Add robots.txt
- Monitor Core Web Vitals

## Analytics & Monitoring

- Enable Vercel Web Analytics
- Track tool usage
- Monitor page performance
- Watch for errors in console

**Metrics to track**:
- Tool usage (which tools are most popular)
- Time on site
- Conversion (guide clicks)
- Errors or issues

## Common Tasks

### Deploy Changes

```bash
git add .
git commit -m "Update: [description]"
git push origin main
# Vercel auto-deploys
```

### Test Locally

```bash
npm run dev
# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Lint & Check

```bash
npm run lint
# Fix: eslint . --fix
```

## Future Roadmap

**Phase 1 (Done)**
- ✅ Homepage & tool grid
- ✅ Website Health Checker
- ✅ ROI Calculator
- ✅ Guide page
- ✅ Placeholder tools

**Phase 2 (Next)**
- [ ] Connect real APIs for checkers
- [ ] Implement remaining tools
- [ ] Add analytics
- [ ] Add testimonials/social proof

**Phase 3 (Later)**
- [ ] Email notifications for tool results
- [ ] Tool result history (local storage)
- [ ] Advanced filtering/options
- [ ] More tools based on user feedback

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Lucide Icons**: https://lucide.dev
- **Vercel Docs**: https://vercel.com/docs

## Questions to Remember

- **Why this over portfolio?** → Utility > authority signaling
- **Why free?** → Build trust through usefulness, not marketing
- **Why no signup?** → Remove friction, maximize usage
- **Why dark mode?** → Modern default, easier on eyes
- **Why AI focus?** → It's what I'm building with, show real examples not just theory
- **Who's this for?** → Anyone curious about AI applications, builders, experimenters

---

**Built by**: Jaden Raats
**Last Updated**: 2026-01-17
**Status**: Production Ready (Optimized)
