-- Product categories
CREATE TABLE IF NOT EXISTS public.product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.product_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Everyone can view active products
CREATE POLICY "Anyone can view active product categories" ON public.product_categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = TRUE);

-- Admins can manage everything
CREATE POLICY "Admins can manage product categories" ON public.product_categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = TRUE
    )
  );

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default product categories
INSERT INTO public.product_categories (name, slug, sort_order) VALUES
  ('Pflege', 'pflege', 1),
  ('Wimpern', 'wimpern', 2),
  ('Augenbrauen', 'augenbrauen', 3),
  ('Körper', 'koerper', 4);

-- Insert default products
INSERT INTO public.products (category_id, name, description, price, image_url, is_bestseller, rating, stock_quantity, sort_order) VALUES
  ((SELECT id FROM public.product_categories WHERE slug = 'wimpern'), 'Lash Serum', 'Wachstumsserum für längere, dichtere Wimpern', 89.00, 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', TRUE, 4.9, 50, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'pflege'), 'Hydrating Face Cream', 'Intensive Feuchtigkeitspflege für jeden Hauttyp', 65.00, 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', TRUE, 4.8, 30, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'pflege'), 'Vitamin C Serum', 'Antioxidatives Serum für strahlende Haut', 79.00, 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', FALSE, 4.9, 25, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'augenbrauen'), 'Brow Growth Serum', 'Natürliches Wachstumsserum für vollere Brauen', 59.00, 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', FALSE, 4.7, 40, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'wimpern'), 'Lash Cleanser', 'Sanfte Reinigung für Wimpernverlängerungen', 29.00, 'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', FALSE, 4.8, 60, 2),
  ((SELECT id FROM public.product_categories WHERE slug = 'koerper'), 'Anti-Cellulite Creme', 'Straffende Körpercreme für glatte Haut', 75.00, 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', FALSE, 4.6, 20, 1),
  ((SELECT id FROM public.product_categories WHERE slug = 'pflege'), 'Retinol Night Cream', 'Anti-Aging Nachtpflege mit Retinol', 95.00, 'https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', TRUE, 4.9, 15, 3),
  ((SELECT id FROM public.product_categories WHERE slug = 'wimpern'), 'Silk Eye Pads', 'Hydrogel-Pads für die Augenpflege', 19.00, 'https://images.pexels.com/photos/5069432/pexels-photo-5069432.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop', FALSE, 4.5, 100, 3);

-- Create indexes
CREATE INDEX IF NOT EXISTS products_category_id_idx ON public.products(category_id);
CREATE INDEX IF NOT EXISTS products_is_active_idx ON public.products(is_active);
CREATE INDEX IF NOT EXISTS products_is_bestseller_idx ON public.products(is_bestseller);
