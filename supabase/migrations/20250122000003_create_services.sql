-- Create service categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for services and specialists
CREATE TABLE IF NOT EXISTS public.service_specialists (
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  specialist_id UUID REFERENCES public.specialists(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, specialist_id)
);

-- Enable RLS
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_specialists ENABLE ROW LEVEL SECURITY;

-- Everyone can view active categories and services
CREATE POLICY "Anyone can view active categories" ON public.service_categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can view active services" ON public.services
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can view service specialists" ON public.service_specialists
  FOR SELECT USING (TRUE);

-- Admins can manage everything
CREATE POLICY "Admins can manage categories" ON public.service_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can manage service specialists" ON public.service_specialists
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Triggers for updated_at
CREATE TRIGGER update_service_categories_updated_at
  BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.service_categories (name, slug, description, sort_order) VALUES
  ('Wimpern', 'wimpern', 'Wimpernverlängerungen und Lash Lifting', 1),
  ('Gesicht', 'gesicht', 'Gesichtsbehandlungen und Hautpflege', 2),
  ('Körper', 'koerper', 'Körperbehandlungen und Contouring', 3),
  ('Augenbrauen', 'augenbrauen', 'Augenbrauenstyling und Lifting', 4);

-- Insert default services
INSERT INTO public.services (category_id, name, description, duration_minutes, price, sort_order) VALUES
  -- Wimpern
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Classic Wimpernverlängerung', 'Eine Verlängerung pro Naturwimper für einen natürlichen, eleganten Look', 120, 150.00, 1),
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Volume Wimpernverlängerung', 'Mehrere feine Extensions pro Wimper für mehr Fülle und Dramatik', 150, 180.00, 2),
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Mega Volume Wimpernverlängerung', 'Maximale Dichte für einen glamourösen, ausdrucksstarken Look', 180, 200.00, 3),
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Auffüllen Classic', 'Regelmässiges Auffüllen für Classic Extensions', 60, 70.00, 4),
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Auffüllen Volume', 'Regelmässiges Auffüllen für Volume Extensions', 75, 85.00, 5),
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Lash Lifting inkl. Färben', 'Natürlicher Schwung für Ihre eigenen Wimpern', 60, 80.00, 6),
  ((SELECT id FROM public.service_categories WHERE slug = 'wimpern'), 'Wimpern Entfernung', 'Professionelle Entfernung von Extensions', 30, 30.00, 7),
  -- Gesicht
  ((SELECT id FROM public.service_categories WHERE slug = 'gesicht'), 'Préime DermaFacial', 'Premium-Gesichtsbehandlung mit Tiefenreinigung und Hydratation', 60, 150.00, 1),
  ((SELECT id FROM public.service_categories WHERE slug = 'gesicht'), 'Microneedling Gesicht', 'Kollagenstimulation für straffere Haut', 90, 200.00, 2),
  ((SELECT id FROM public.service_categories WHERE slug = 'gesicht'), 'Microneedling Gesicht + Hals', 'Erweiterte Behandlung für Gesicht und Hals', 120, 280.00, 3),
  -- Körper
  ((SELECT id FROM public.service_categories WHERE slug = 'koerper'), 'ICOONE® Körperbehandlung', 'Revolutionäre Technologie für Körperkonturierung', 60, 150.00, 1),
  ((SELECT id FROM public.service_categories WHERE slug = 'koerper'), 'ICOONE® Gesichtsbehandlung', 'Straffung und Lifting für das Gesicht', 45, 120.00, 2),
  ((SELECT id FROM public.service_categories WHERE slug = 'koerper'), 'ICOONE® 5er Paket', 'Paketpreis für 5 Körperbehandlungen', 300, 650.00, 3),
  ((SELECT id FROM public.service_categories WHERE slug = 'koerper'), 'ICOONE® 10er Paket', 'Paketpreis für 10 Körperbehandlungen', 600, 1200.00, 4),
  -- Augenbrauen
  ((SELECT id FROM public.service_categories WHERE slug = 'augenbrauen'), 'Augenbrauen Formen', 'Perfekte Form mit Pinzette und Wachs', 20, 25.00, 1),
  ((SELECT id FROM public.service_categories WHERE slug = 'augenbrauen'), 'Augenbrauen Färben', 'Intensive Farbe für definierte Brauen', 15, 20.00, 2),
  ((SELECT id FROM public.service_categories WHERE slug = 'augenbrauen'), 'Augenbrauen Komplett', 'Formen, Färben & Styling', 45, 55.00, 3),
  ((SELECT id FROM public.service_categories WHERE slug = 'augenbrauen'), 'Brow Lifting', 'Langanhaltende Form für volle Brauen', 45, 65.00, 4),
  ((SELECT id FROM public.service_categories WHERE slug = 'augenbrauen'), 'Brow Lamination', 'Premium-Behandlung mit extra Pflege', 60, 75.00, 5);

-- Link services to specialists
INSERT INTO public.service_specialists (service_id, specialist_id)
SELECT s.id, sp.id
FROM public.services s, public.specialists sp
WHERE (
  (sp.name = 'Sofia' AND s.name LIKE '%Wimpern%')
  OR (sp.name = 'Sofia' AND s.name LIKE '%Lash%')
  OR (sp.name = 'Elena' AND s.name LIKE '%DermaFacial%')
  OR (sp.name = 'Elena' AND s.name LIKE '%Microneedling%')
  OR (sp.name = 'Marina' AND s.name LIKE '%ICOONE%')
);

-- Create indexes
CREATE INDEX IF NOT EXISTS services_category_id_idx ON public.services(category_id);
CREATE INDEX IF NOT EXISTS services_is_active_idx ON public.services(is_active);
