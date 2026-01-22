-- Create specialists table (team members who perform treatments)
CREATE TABLE IF NOT EXISTS public.specialists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  specialties TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;

-- Everyone can view active specialists
CREATE POLICY "Anyone can view active specialists" ON public.specialists
  FOR SELECT USING (is_active = TRUE);

-- Admins can do everything
CREATE POLICY "Admins can manage specialists" ON public.specialists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_specialists_updated_at
  BEFORE UPDATE ON public.specialists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default specialists
INSERT INTO public.specialists (name, role, description, image_url, specialties, sort_order) VALUES
  ('Sofia', 'Gründerin & Wimpern-Spezialistin', 'Mit über 8 Jahren Erfahrung in der Wimpernverlängerung ist Sofia eine wahre Künstlerin ihres Fachs.', 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', ARRAY['Wimpernverlängerung', 'Lash Lifting'], 1),
  ('Elena', 'Gesichts- & Körper-Expertin', 'Elena verbindet traditionelle Techniken mit modernster Technologie für strahlende Ergebnisse.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop', ARRAY['Gesichtsbehandlungen', 'Microneedling'], 2),
  ('Marina', 'Icoone-Technologie-Expertin', 'Als zertifizierte Icoone-Spezialistin sorgt Marina für perfekte Körperkonturierung.', 'https://images.pexels.com/photos/3762940/pexels-photo-3762940.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', ARRAY['ICOONE Laser', 'Körperbehandlungen'], 3);
