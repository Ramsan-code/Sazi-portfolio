# Sazi Portfolio

Next.js portfolio and admin dashboard for Sazi Balasingam. The app includes public portfolio pages, admin project management, MongoDB models, Cloudinary image uploads, and a Resend-powered contact form.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and fill in real values:

```bash
cp .env.example .env
```

Required variables:

- `MONGODB_URI`
- `MONGODB_DB`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`

3. Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Admin pages are under `/admin`. Mutating API routes require the `sazi_admin_token` session cookie created by `/api/auth/login`.

The category seed endpoint, `/api/seed`, is disabled in production. Keep seeded/admin credentials out of git and rotate any secret that has ever been committed.

## Checks

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
```

## Notes

- Public project pages currently use static data in `src/data/projects.ts`.
- Admin project CRUD uses MongoDB through `/api/project`.
- Uploaded project/profile images are stored in Cloudinary.
