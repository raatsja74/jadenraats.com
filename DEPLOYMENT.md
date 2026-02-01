# Deployment Guide - JadenRaats.com

## Quick Start (Vercel)

The easiest way to deploy is to Vercel:

```bash
npm install -g vercel
vercel
```

Follow the prompts. It will:
1. Create a new Vercel project
2. Deploy your code
3. Give you a live URL

Then connect your domain in Vercel's dashboard.

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: JadenRaats.com production build"
git branch -M main
git remote add origin https://github.com/yourusername/jadenraats.com.git
git push -u origin main
```

### 2. Connect Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click Deploy

### 3. Configure Domain

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your domain (jadenraats.com)
4. Follow DNS instructions:
   - A record: `76.76.21.21`
   - CNAME (www): `cname.vercel-dns.com`

### 4. Enable Analytics (Optional)

In Vercel project settings:
- Enable Web Analytics
- Enable Speed Insights

## Environment Variables

Currently no environment variables are needed. If you add API integrations:

1. Create `.env.local` locally
2. Add variables: `NEXT_PUBLIC_API_KEY=xxx`
3. In Vercel dashboard, go to Settings → Environment Variables
4. Add the same variables there

## Continuous Deployment

Every time you push to GitHub main branch, Vercel auto-deploys. No extra steps needed.

## Database & API Integration

When you're ready to connect real APIs:

1. Add environment variables to Vercel
2. Update components in `src/components/tools/`
3. Create API routes in `src/app/api/` if needed
4. Deploy (automatic on git push)

## Troubleshooting

### Build fails

Check the build logs in Vercel dashboard. Common issues:
- TypeScript errors: Fix in `src/` files
- Missing dependencies: Run `npm install`, push again
- Memory limit: Usually not an issue with this app

### Page looks broken

- Clear browser cache (Ctrl+Shift+Del)
- Check browser console for errors (F12)
- Verify styles loaded: check `tailwind.config.ts`

### Can't connect domain

- Wait 24-48 hours for DNS to propagate
- Verify DNS records in your domain provider
- Use `nslookup` to check: `nslookup jadenraats.com`

## Performance Optimization

The site is already optimized, but you can:

1. **Images**: Use Next.js `<Image>` component (already done)
2. **Fonts**: Load from Google Fonts (already done)
3. **CSS**: Tailwind purges unused styles (already configured)
4. **JavaScript**: Next.js code-splits automatically

To check performance:
- Lighthouse audit: Right-click → Inspect → Lighthouse
- Vercel Speed Insights: Dashboard → Analytics tab

## Adding Features Later

To add more tools:

1. Create new component in `src/components/tools/YourTool.tsx`
2. Create page in `src/app/tools/your-tool/page.tsx`
3. Update homepage tool grid in `src/app/page.tsx`
4. Deploy: `git push`

## Monitoring & Maintenance

1. **Weekly**: Check analytics in Vercel
2. **Monthly**: Review error logs
3. **Quarterly**: Update dependencies: `npm outdated`
4. **As needed**: Update content and tools

## Rollback

If something breaks after deploy:

```bash
# View deployment history
vercel list

# Rollback to previous deployment
vercel rollback
```

Or manually redeploy from GitHub by clicking "Deploy" in Vercel dashboard.

## Support

- Next.js docs: https://nextjs.org/docs
- Vercel docs: https://vercel.com/docs
- Tailwind docs: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion
