# Create Your Moments - Phase 1 Ready Build

This build is prepared for the Phase 1 business model:

- Birthday Treasure Box
- Love Story Journey
- Valentine Week Love Unlock
- Anniversary Time Capsule
- Friendship Adventure
- Family Blessing Letter
- Premium Hindu Wedding / Engagement Card

## Pricing

- Standard 30 days: ₹79
- Standard 60 days: ₹149
- Wedding / Engagement 90 days: ₹449

## New integrations included

### Supabase
Environment variables are already added to `.env` and `.env.example`:

```env
VITE_SUPABASE_URL="https://jrwjxwmpwgellfhllzps.supabase.co"
VITE_SUPABASE_ANON_KEY="sb_publishable_OAW5VGxViMlIAHsTHY_E1Q_CnRUXyCo"
```

Frontend saves:
- contact form submissions to `contact_messages`
- create moment draft to `moment_drafts`
- checkout lead to `checkout_leads`

Run the SQL in:

```text
supabase/schema.sql
```

inside Supabase SQL Editor.

### Email sending
The contact form uses the EmailJS pattern from your ReadyGO project.

Current defaults:

```env
VITE_EMAILJS_SERVICE_ID="service_xkxzc4n"
VITE_EMAILJS_TEMPLATE_ID="template_2m9jcng"
VITE_EMAILJS_PUBLIC_KEY="vKEy0T4LoYEzfCAeL"
VITE_SUPPORT_EMAIL="support@createyourmoment.com"
```

Make sure the EmailJS template sends to `support@createyourmoment.com`.

### Razorpay
Razorpay is not integrated yet. Checkout page now saves checkout leads and has a "Simulate Payment Success" button. Later connect Razorpay order creation + signature verification from backend/serverless.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Build was tested successfully.
