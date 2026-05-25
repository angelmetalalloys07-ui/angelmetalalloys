# Angel Metal & Alloys — Deployment Guide

## Pre-Deployment Checklist (Complete Before Deploying)

### 1. Supabase Setup
- [ ] Create a new Supabase project at https://supabase.com
- [ ] Run `schema.sql` in the **SQL Editor** (Supabase Dashboard → SQL Editor → New Query → paste & run)
- [ ] Run `seed-products.sql` to populate sample product catalog
- [ ] Run `make-admin.sql` to create the admin user record
- [ ] Go to **Authentication → Users** → create user with email `angelmetalalloys07@gmail.com`
- [ ] Confirm user email is verified in the Auth dashboard
- [ ] Note your **Project URL** and both **API Keys** (anon + service_role) from Settings → API

### 2. Cloudinary Setup
- [ ] Create a free account at https://cloudinary.com
- [ ] In **Settings → Upload → Upload presets** → click "Add upload preset"
  - Preset name: `angel-metal-products`
  - Signing mode: **Unsigned**
  - Folder: `angel-metal/products`
  - Allowed formats: `jpg, jpeg, png, webp`
- [ ] Note your **Cloud Name** from the Dashboard

### 3. Resend (Email) Setup
- [ ] Create an account at https://resend.com
- [ ] Add and **verify your domain** (angelmetalalloys.com) under Domains
- [ ] Create an API key and note it
- [ ] Set `RESEND_FROM_EMAIL=inquiries@angelmetalalloys.com`

### 4. Generate Strong JWT Secret
Run this command locally and copy the output:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 5. Prepare All Environment Variables
Fill in `.env.example` values and save as your Vercel env vars (see table below).

---

## Vercel Deployment Steps

```bash
# 1. Push your code to GitHub
git add .
git commit -m "Production ready"
git push origin main

# 2. Install Vercel CLI (if not installed)
npm i -g vercel

# 3. Login
vercel login

# 4. Deploy to production
vercel --prod
```

### Vercel Dashboard Configuration
- [ ] Go to https://vercel.com/dashboard → your project → **Settings → Environment Variables**
- [ ] Add ALL variables from the table below
- [ ] Set **Region** to `bom1` (Bombay/Mumbai) for best India performance
- [ ] Enable **Edge Network** for global CDN

---

## Environment Variables (Add to Vercel Dashboard)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anon key | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) | `eyJ...` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `doudwrrwz` |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Upload preset name | `angel-metal-products` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `915252968...` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `__uiW2Q...` |
| `RESEND_API_KEY` | Resend email API key | `re_...` |
| `RESEND_FROM_EMAIL` | Verified sender email | `inquiries@angelmetalalloys.com` |
| `INQUIRY_NOTIFICATION_EMAIL` | Admin notification recipient | `angelmetalalloys@gmail.com` |
| `ADMIN_SECRET_PASSWORD` | Admin portal master password | `AngelMetal2026!` |
| `JWT_SECRET` | 64-char random hex for JWT signing | `4be1b6c4...` |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | `https://www.angelmetalalloys.com` |

---

## Custom Domain Setup

### Add Domain in Vercel
- [ ] Go to Vercel Dashboard → Project → **Settings → Domains**
- [ ] Add: `angelmetalalloys.com`
- [ ] Add: `www.angelmetalalloys.com`

### DNS Records at Your Domain Registrar

| Type  | Name | Value                      | TTL  |
|-------|------|----------------------------|------|
| A     | @    | `76.76.21.21`              | Auto |
| CNAME | www  | `cname.vercel-dns.com`     | Auto |

> DNS propagation typically takes 1–48 hours.

---

## Post-Deployment Verification Checklist

### Public Site
- [ ] Visit `https://www.angelmetalalloys.com` — homepage loads with video hero ✓
- [ ] Visit `/products` — product catalog renders with images ✓
- [ ] Visit `/products/ss-flanges` — product detail page loads ✓
- [ ] Visit `/contact` — contact form renders ✓
- [ ] Submit a test inquiry on `/contact` — success message shows ✓
- [ ] Admin receives notification email at `angelmetalalloys@gmail.com` ✓
- [ ] Customer receives auto-reply email ✓
- [ ] Visit `/request-quote` — quote form works ✓
- [ ] Visit `/sitemap.xml` — XML sitemap renders ✓
- [ ] Visit `/robots.txt` — correctly points to sitemap ✓

### Admin Portal
- [ ] Visit `/admin/login` — login page loads ✓
- [ ] Login with correct credentials — redirects to dashboard ✓
- [ ] Dashboard shows stats and charts ✓
- [ ] Visit `/admin/products` — product list loads ✓
- [ ] Click **Add Product** → form loads ✓
- [ ] Upload product image via Cloudinary widget ✓
- [ ] Save product → appears in list ✓
- [ ] Visit `/admin/inquiries` — test inquiry appears ✓
- [ ] Logout — redirected to `/admin/login` ✓

### SEO & Performance
- [ ] Run Lighthouse audit → Target: **90+ all categories**
- [ ] Submit sitemap to **Google Search Console**:
  - Go to https://search.google.com/search-console
  - Add property: `https://www.angelmetalalloys.com`
  - Submit sitemap: `https://www.angelmetalalloys.com/sitemap.xml`
- [ ] Set up **Google Analytics 4**:
  - Create GA4 property at https://analytics.google.com
  - Add tracking ID to `src/app/layout.tsx`

---

## Rollback Plan
If deployment has critical issues:
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

---

## Support & Contacts

- **Hosting**: Vercel — https://vercel.com/support
- **Database**: Supabase — https://supabase.com/support
- **Images**: Cloudinary — https://cloudinary.com/support
- **Email**: Resend — https://resend.com/support
