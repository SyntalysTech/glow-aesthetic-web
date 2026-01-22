-- Booking status enum
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  specialist_id UUID REFERENCES public.specialists(id) ON DELETE SET NULL,
  -- Store denormalized data for historical records
  service_name TEXT NOT NULL,
  service_price DECIMAL(10,2) NOT NULL,
  specialist_name TEXT,
  -- Booking details
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  -- Customer info (in case no user account)
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  -- Status and notes
  status booking_status DEFAULT 'pending',
  notes TEXT,
  admin_notes TEXT,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (
    auth.uid() = user_id
    OR customer_email = (SELECT email FROM public.profiles WHERE id = auth.uid())
  );

-- Users can create bookings
CREATE POLICY "Authenticated users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update own pending bookings (cancel)
CREATE POLICY "Users can cancel own pending bookings" ON public.bookings
  FOR UPDATE USING (
    (auth.uid() = user_id OR customer_email = (SELECT email FROM public.profiles WHERE id = auth.uid()))
    AND status = 'pending'
  );

-- Admins can do everything
CREATE POLICY "Admins can manage all bookings" ON public.bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update status timestamps
CREATE OR REPLACE FUNCTION public.handle_booking_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
    NEW.confirmed_at = NOW();
  END IF;
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    NEW.cancelled_at = NOW();
  END IF;
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_booking_status
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_booking_status_change();

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_specialist_id_idx ON public.bookings(specialist_id);
CREATE INDEX IF NOT EXISTS bookings_booking_date_idx ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings(status);
CREATE INDEX IF NOT EXISTS bookings_customer_email_idx ON public.bookings(customer_email);

-- View for available time slots (helper)
CREATE OR REPLACE VIEW public.booked_slots AS
SELECT
  specialist_id,
  booking_date,
  start_time,
  end_time
FROM public.bookings
WHERE status IN ('pending', 'confirmed')
  AND booking_date >= CURRENT_DATE;
