# Quick Start Checklist

Get jadenraats.com live in 15 minutes.

## Step 1: Install Dependencies (2 minutes)

```bash
cd jadenraats-production
npm install
```

## Step 2: Test Locally (3 minutes)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and verify:
- [ ] Homepage loads with tool grid
- [ ] Website Health Checker works (try entering "google.com")
- [ ] ROI Calculator works (try adjusting sliders)
- [ ] Guide page loads and is readable
- [ ] All links work (header, footer, navigation)
- [ ] Mobile view works (toggle device toolbar in DevTools)

Press `Ctrl+C` to stop the dev server.

## Step 3: Deploy to Vercel (5 minutes)

### Option A: Via Vercel CLI (Easiest)

```bash
npm install -g vercel
vercel
```

Follow the prompts:
- [ ] Create new Vercel project
- [ ] Link to existing GitHub repo (or create new)
- [ ] Accept default settings
- [ ] Wait for deploy to complete
- [ ] Get your live URL

### Option B: Via GitHub + Vercel Web

1. [ ] Push to GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial: JadenRaats.com"
   git push origin main
   ```

2. [ ] Go to [vercel.com](https://vercel.com)
3. [ ] Click "New Project"
4. [ ] Import your GitHub repo
5. [ ] Click "Deploy"
6. [ ] Wait for build to complete

## Step 4: Set Up Domain (3 minutes)

### In Vercel Dashboard

1. [ ] Go to your project settings
2. [ ] Click "Domains"
3. [ ] Add `jadenraats.com`
4. [ ] Add `www.jadenraats.com` as alias

### In Your Domain Provider

Get DNS records from Vercel, then add:
- [ ] A record: `76.76.21.21`
- [ ] CNAME (www): `cname.vercel-dns.com`

DNS propagates in 24-48 hours. Site is live immediately at Vercel's URL.

## Step 5: Enable Analytics (1 minute)

In Vercel project settings:
- [ ] Enable Web Analytics (free)
- [ ] Enable Speed Insights (free)

## Done! 🎉

Your site is now:
- ✅ Live at vercel.app URL
- ✅ Live at jadenraats.com (once DNS propagates)
- ✅ Auto-deploying on every GitHub push
- ✅ Getting analytics

## Common Next Steps

### Add a New Tool

1. Create component in `src/components/tools/MyTool.tsx`
2. Create page in `src/app/tools/my-tool/page.tsx`
3. Update homepage in `src/app/page.tsx` (add to tools array)
4. Push to GitHub: `git push`
5. Vercel auto-deploys ✨

### Update Copy/Text

1. Edit the relevant `.tsx` file
2. Keep tone consistent (see CONTEXT.md)
3. Test locally: `npm run dev`
4. Push to GitHub: `git push`

### Check Performance

- [ ] Lighthouse audit: Right-click page → Inspect → Lighthouse
- [ ] Vercel Analytics: Dashboard → Analytics tab
- [ ] Core Web Vitals: Should be all green

## Troubleshooting

### Build fails after deploy

Check Vercel logs:
1. Go to Vercel project dashboard
2. Click "Deployments"
3. Click on failed deployment
4. Expand build logs
5. Fix error, push again

### Page looks different online

- Clear browser cache: `Ctrl+Shift+Del`
- Hard refresh: `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- Wait 5 minutes for CDN to update

### Can't connect custom domain

- DNS takes 24-48 hours to propagate
- Check DNS records are correct
- Use [whatsmydns.net](https://whatsmydns.net) to verify

## Environment Setup (One-Time)

If this is first time setting up:

```bash
# Install Node.js from nodejs.org (18+ required)
node --version  # Should be v18+

# Install Vercel CLI
npm install -g vercel

# Verify Git is installed
git --version  # Should be installed

# Create GitHub account if needed (github.com)
# Create Vercel account if needed (vercel.com)
```

## Files You'll Edit Most

- `src/app/page.tsx` - Homepage content
- `src/components/Header.tsx` - Navigation
- `src/components/Footer.tsx` - Footer links
- `src/app/globals.css` - Colors/fonts (design system)
- `tailwind.config.ts` - Theme colors

See CONTEXT.md for conventions.

## Need Help?

- **Next.js questions**: https://nextjs.org/docs
- **Tailwind questions**: https://tailwindcss.com/docs
- **Deployment issues**: https://vercel.com/docs
- **Something broken**: Check Vercel build logs

---

**Time to live**: ~15 minutes ⚡
**Maintenance**: ~5 min/week
**Ready to scale**: Yes ✨
