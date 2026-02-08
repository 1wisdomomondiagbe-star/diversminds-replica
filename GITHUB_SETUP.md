# DiverseMinds Therapy - GitHub Export & Deployment Setup

This document explains how to export this project to GitHub and deploy it.

## Quick Start

### 1. Export to GitHub

The project is ready to be exported to your GitHub account. Follow these steps:

**Option A: Using Manus Management UI (Recommended)**
1. Open the Manus project dashboard
2. Go to Settings → GitHub
3. Click "Export to GitHub"
4. Enter:
   - GitHub Username: `1wisdomomondiagbe-star`
   - Repository Name: `DiverseMinds-repos`
5. Click "Export"
6. Manus will create the repository and push all code

**Option B: Manual GitHub Setup**
1. Create a new repository on GitHub: `https://github.com/1wisdomomondiagbe-star/DiverseMinds-repos`
2. Clone this project locally
3. Push to your GitHub repository:
   ```bash
   git remote set-url origin https://github.com/1wisdomomondiagbe-star/DiverseMinds-repos.git
   git push -u origin main
   ```

### 2. Deploy to Vercel or Railway

Choose one of these platforms:

#### Deploy to Vercel (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables (see DEPLOYMENT.md)
5. Click "Deploy"

#### Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Add MySQL database
4. Add environment variables (see DEPLOYMENT.md)
5. Railway auto-deploys on GitHub push

See **DEPLOYMENT.md** for detailed step-by-step instructions.

---

## Project Structure

```
DiverseMinds-repos/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/           # Utilities (tRPC client, etc.)
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets (logo, etc.)
│   └── index.html         # HTML template
├── server/                # Express backend
│   ├── routers.ts         # tRPC procedures (API endpoints)
│   ├── db.ts              # Database queries
│   ├── storage.ts         # S3 file storage
│   └── _core/             # Framework internals
├── drizzle/               # Database schema & migrations
├── shared/                # Shared types & constants
├── package.json           # Dependencies
├── vercel.json            # Vercel deployment config
├── railway.json           # Railway deployment config
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # Project documentation
```

---

## Key Features

✓ **Pixel-perfect replica** of original DIVERSMINDS design
✓ **Full-stack application** with React frontend + Express backend
✓ **Database integration** with MySQL for storing inquiries
✓ **Form submission** with validation and error handling
✓ **WhatsApp integration** for automated notifications
✓ **Webflow webhook** for CRM integration
✓ **Responsive design** for all devices
✓ **Sticky navigation** with smooth scrolling
✓ **Floating WhatsApp button** for easy contact
✓ **Contact popover** for quick information access
✓ **Multi-step form** for better user experience
✓ **Success animations** with visual feedback

---

## Technology Stack

- **Frontend**: React 19, Tailwind CSS 4, Framer Motion
- **Backend**: Express 4, tRPC 11, Node.js
- **Database**: MySQL with Drizzle ORM
- **Authentication**: Manus OAuth
- **Styling**: Tailwind CSS, shadcn/ui components
- **Testing**: Vitest
- **Deployment**: Vercel or Railway

---

## Environment Variables

See DEPLOYMENT.md for complete list. Key variables:

- `DATABASE_URL` - MySQL connection string
- `JWT_SECRET` - Session signing secret
- `VITE_APP_ID` - Manus OAuth app ID
- `WHATSAPP_ACCESS_TOKEN` - WhatsApp Business API token
- `WEBHOOK_URL` - Webflow webhook endpoint

---

## Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
pnpm db:push

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## API Endpoints

All API endpoints are under `/api/trpc`:

- `POST /api/trpc/intake.submit` - Submit intake form
- `GET /api/trpc/auth.me` - Get current user
- `POST /api/trpc/auth.logout` - Logout user
- `POST /api/trpc/system.notifyOwner` - Send owner notification

---

## Database Schema

### users table
- `id` - Primary key
- `openId` - Manus OAuth ID (unique)
- `name` - User name
- `email` - User email
- `role` - admin | user
- `createdAt`, `updatedAt`, `lastSignedIn` - Timestamps

### intake_submissions table
- `id` - Primary key
- `childName` - Child's name
- `ageRange` - Age group
- `diagnosisStatus` - Diagnosis status
- `observationTimeframe` - When challenges started
- `childNeeds` - JSON array of selected needs
- `selectedServices` - JSON array of selected services
- `deliveryPreference` - Online/Home/School/Hybrid
- `mainGoal` - Parent's main goal
- `parentEmotion` - Parent's emotional state
- `parentName` - Parent's name
- `phone` - Contact phone
- `email` - Contact email
- `location` - Location/city
- `consent` - Consent to contact
- `createdAt` - Submission timestamp

---

## Form Submission Flow

1. User fills out intake form on website
2. Form validates all required fields
3. Data submitted to `/api/trpc/intake.submit`
4. Backend stores in database
5. WhatsApp notification sent to parent
6. Webhook sent to Webflow for CRM
7. Success message shown to user

---

## Testing

Run all tests:
```bash
pnpm test
```

Test coverage includes:
- Form validation
- Database operations
- WhatsApp integration
- Webhook delivery
- Email notifications

---

## Troubleshooting

**Build fails locally?**
- Ensure Node.js 18+ is installed
- Run `pnpm install` again
- Check environment variables

**Database connection error?**
- Verify `DATABASE_URL` format
- Ensure database server is running
- Check firewall/security settings

**Form not submitting?**
- Check browser console for errors
- Verify database is connected
- Check server logs

See DEPLOYMENT.md for more troubleshooting.

---

## Support & Next Steps

1. **Export to GitHub** using Manus UI or manual setup
2. **Deploy to Vercel or Railway** following DEPLOYMENT.md
3. **Configure custom domain** (optional)
4. **Set up monitoring** and backups
5. **Test all features** in production

---

## License

This project is proprietary to DiverseMinds Therapy Ltd.

---

## Contact

For questions about this deployment:
- GitHub: [1wisdomomondiagbe-star/DiverseMinds-repos](https://github.com/1wisdomomondiagbe-star/DiverseMinds-repos)
- Manus Support: [help.manus.im](https://help.manus.im)
