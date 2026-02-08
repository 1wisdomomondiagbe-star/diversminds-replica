# DiverseMinds Therapy - Deployment Guide

This guide covers deploying the DiverseMinds website to Vercel or Railway.

## Prerequisites

- GitHub account with the repository cloned
- Node.js 18+ installed locally
- MySQL database (can use Railway's built-in MySQL)
- Environment variables from Manus platform

## Environment Variables Required

All of these must be set in your deployment platform:

### Manus OAuth & Core
- `VITE_APP_ID` - Your Manus application ID
- `OAUTH_SERVER_URL` - Manus OAuth server URL
- `VITE_OAUTH_PORTAL_URL` - Manus OAuth portal URL
- `OWNER_OPEN_ID` - Your Manus owner ID
- `OWNER_NAME` - Your name
- `JWT_SECRET` - Random 32+ character string for session signing

### Database
- `DATABASE_URL` - MySQL connection string (format: `mysql://user:password@host:port/database`)

### Manus Built-in APIs
- `BUILT_IN_FORGE_API_URL` - Manus API endpoint
- `BUILT_IN_FORGE_API_KEY` - Manus API key (server-side)
- `VITE_FRONTEND_FORGE_API_URL` - Manus API endpoint (frontend)
- `VITE_FRONTEND_FORGE_API_KEY` - Manus API key (frontend)

### Email Notifications (Optional)
- `GMAIL_USER` - Gmail address for sending emails
- `GMAIL_PASSWORD` - Gmail app-specific password
- `ADMIN_EMAIL` - Email to receive admin notifications

### WhatsApp Notifications (Optional)
- `WHATSAPP_BUSINESS_ACCOUNT_ID` - Meta WhatsApp Business Account ID
- `WHATSAPP_PHONE_NUMBER_ID` - WhatsApp Phone Number ID
- `WHATSAPP_ACCESS_TOKEN` - Meta API access token

### Webhooks (Optional)
- `WEBHOOK_URL` - Webflow webhook endpoint for form submissions

---

## Deployment to Vercel

### Step 1: Connect GitHub to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your `DiverseMinds-repos` repository
5. Click "Import"

### Step 2: Configure Environment Variables
1. In the Vercel dashboard, go to Settings → Environment Variables
2. Add all required environment variables (see list above)
3. Make sure variables are set for Production environment

### Step 3: Configure Build Settings
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

Vercel should auto-detect these from `vercel.json`, but verify they're correct.

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (5-10 minutes)
3. Your site will be live at `your-project.vercel.app`

### Step 5: Configure Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

---

## Deployment to Railway

### Step 1: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `DiverseMinds-repos` repository

### Step 2: Add MySQL Database
1. In Railway dashboard, click "Add Service"
2. Select "MySQL"
3. Railway will create a MySQL instance
4. Copy the `DATABASE_URL` from the MySQL service variables

### Step 3: Configure Environment Variables
1. In your project, click on the web service
2. Go to Variables tab
3. Add all required environment variables:
   - Paste `DATABASE_URL` from MySQL service
   - Add all Manus OAuth variables
   - Add email/WhatsApp credentials if using

### Step 4: Configure Build & Deploy
1. Go to the Deployments tab
2. Verify build command: `pnpm build`
3. Verify start command: `node dist/index.js`
4. Railway should auto-detect from `railway.json`

### Step 5: Deploy
1. Railway will automatically deploy on every GitHub push
2. Monitor logs in the Deployments tab
3. Your site will be live at `your-project.railway.app`

### Step 6: Configure Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Railway

---

## Post-Deployment Setup

### Database Migrations
After deployment, run migrations on the production database:

```bash
# If you have SSH access to the deployment
npm run db:push
```

Or manually run the migration SQL in your production database.

### Testing the Deployment

1. **Test the website**: Visit your deployed URL
2. **Test form submission**: Fill out the intake form
3. **Check database**: Verify submission was saved
4. **Test WhatsApp**: Confirm WhatsApp notification was sent
5. **Test webhook**: Check Webflow received the data

### Monitoring

- **Vercel**: Dashboard shows deployment status, logs, and analytics
- **Railway**: Dashboard shows build logs, runtime logs, and metrics

---

## Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Verify all environment variables are set
- Check build logs for specific errors

### Database Connection Error
- Verify `DATABASE_URL` format is correct
- Ensure database server is accessible from deployment platform
- Check firewall/security group settings

### OAuth Not Working
- Verify `VITE_APP_ID` and `OAUTH_SERVER_URL` are correct
- Check that redirect URL in Manus OAuth settings matches deployment URL
- Clear browser cookies and try again

### Form Submission Not Working
- Check browser console for errors
- Verify database connection
- Check server logs for API errors

---

## Local Development

To test locally before deploying:

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
pnpm db:push

# Start dev server
pnpm dev

# Run tests
pnpm test
```

---

## Updating After Deployment

1. Make changes locally
2. Commit and push to GitHub
3. Vercel/Railway will automatically redeploy
4. Monitor deployment logs for any issues

---

## Support

For issues with:
- **Manus platform**: Contact Manus support
- **Vercel**: Check Vercel documentation or support
- **Railway**: Check Railway documentation or support
- **Code issues**: Check the GitHub repository

---

## Security Checklist

- [ ] All environment variables are set
- [ ] Database password is strong
- [ ] JWT_SECRET is random and long (32+ characters)
- [ ] API keys are kept secret (never commit to GitHub)
- [ ] CORS is configured correctly
- [ ] SSL/HTTPS is enabled (automatic on both platforms)
- [ ] Database backups are configured
- [ ] Monitoring/alerting is set up
