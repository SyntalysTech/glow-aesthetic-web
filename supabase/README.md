# Supabase Database Setup

## Running Migrations

### Option 1: Via Supabase Dashboard (Recommended for initial setup)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor**
3. Run each migration file in order:
   - `20250122000001_create_profiles.sql`
   - `20250122000002_create_specialists.sql`
   - `20250122000003_create_services.sql`
   - `20250122000004_create_bookings.sql`
   - `20250122000005_create_products.sql`
   - `20250122000006_create_orders.sql`
   - `20250122000007_create_contact_reviews.sql`

### Option 2: Via Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref dlfcnqlsmqynzyeqzszw

# Run migrations
supabase db push
```

## Database Schema

### Tables

- **profiles** - Extended user profiles (links to auth.users)
- **specialists** - Team members who perform treatments
- **service_categories** - Categories for services (Wimpern, Gesicht, etc.)
- **services** - Available treatments/services
- **service_specialists** - Junction table linking services to specialists
- **bookings** - Customer appointments
- **product_categories** - Categories for shop products
- **products** - Shop products
- **orders** - Customer orders
- **order_items** - Items in each order
- **contact_submissions** - Contact form submissions
- **reviews** - Customer reviews

### Default Admin Setup

After running migrations, create an admin user:

1. Register a new user through the app
2. In Supabase SQL Editor, run:
```sql
UPDATE public.profiles
SET is_admin = TRUE
WHERE email = 'your-admin@email.com';
```

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:
- Users can view/edit their own data
- Admins can view/edit all data
- Public data (services, products, reviews) is viewable by everyone
- Contact form submissions can be created by anyone (for anonymous submissions)

## Environment Variables

Make sure these are set in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://dlfcnqlsmqynzyeqzszw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
