'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface ProductCategory {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  image_url: string | null;
  is_active: boolean;
  is_bestseller: boolean;
  stock_quantity: number;
  rating: number | null;
  product_categories?: ProductCategory | null;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url: string;
  is_active: boolean;
  is_bestseller: boolean;
  stock_quantity: number;
}

const emptyFormData: ProductFormData = {
  name: '',
  description: '',
  price: 0,
  category_id: '',
  image_url: '',
  is_active: true,
  is_bestseller: false,
  stock_quantity: 0,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    const [productsRes, categoriesRes] = await Promise.all([
      supabase.from('products').select('*, product_categories(*)').order('name'),
      supabase.from('product_categories').select('*').order('name'),
    ]);

    if (productsRes.data) setProducts(productsRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);

    setLoading(false);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyFormData);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      category_id: product.category_id || '',
      image_url: product.image_url || '',
      is_active: product.is_active,
      is_bestseller: product.is_bestseller,
      stock_quantity: product.stock_quantity,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const supabase = getSupabaseClient();

    const productData = {
      name: formData.name,
      description: formData.description || null,
      price: formData.price,
      category_id: formData.category_id || null,
      image_url: formData.image_url || null,
      is_active: formData.is_active,
      is_bestseller: formData.is_bestseller,
      stock_quantity: formData.stock_quantity,
    };

    let error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    if (editingProduct) {
      const result = await db.from('products').update(productData).eq('id', editingProduct.id);
      error = result.error;
    } else {
      const result = await db.from('products').insert(productData);
      error = result.error;
    }

    if (error) {
      console.error('Error saving product:', error);
      alert('Fehler beim Speichern');
    } else {
      setShowModal(false);
      loadData();
    }

    setSaving(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Möchten Sie dieses Produkt wirklich löschen?')) return;

    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('products').delete().eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      alert('Fehler beim Löschen');
    } else {
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light" style={{ color: charcoal }}>
            <span className="italic" style={{ color: blush }}>Produkte</span> verwalten
          </h1>
          <p className="mt-1" style={{ color: `${charcoal}66` }}>
            {products.length} Produkte im Shop
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium"
          style={{ backgroundColor: blush }}
        >
          <Plus size={20} />
          <span>Neues Produkt</span>
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
            <p style={{ color: charcoal }}>Produkte werden geladen...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <ShoppingBag size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
          <p style={{ color: `${charcoal}66` }}>Noch keine Produkte vorhanden</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl overflow-hidden shadow-sm ${!product.is_active ? 'opacity-60' : ''}`}
            >
              <div className="aspect-square relative">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: cream }}>
                    <ShoppingBag size={48} style={{ color: `${charcoal}30` }} />
                  </div>
                )}
                {product.is_bestseller && (
                  <span
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: blush }}
                  >
                    Bestseller
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium" style={{ color: charcoal }}>
                    {product.name}
                  </h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-1 rounded transition-colors hover:bg-gray-100"
                      style={{ color: `${charcoal}66` }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-1 rounded transition-colors hover:bg-red-50"
                      style={{ color: '#f87171' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="text-sm mb-3" style={{ color: `${charcoal}66` }}>
                  {product.product_categories?.name || 'Keine Kategorie'}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-semibold" style={{ color: blush }}>
                    CHF {product.price}
                  </span>
                  <span className="text-sm" style={{ color: `${charcoal}66` }}>
                    Lager: {product.stock_quantity}
                  </span>
                </div>

                {product.rating && (
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={14} fill={blush} color={blush} />
                    <span className="text-sm" style={{ color: `${charcoal}66` }}>
                      {product.rating}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light" style={{ color: charcoal }}>
                {editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ color: `${charcoal}66` }}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: cream }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                  Beschreibung
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 resize-none"
                  style={{ borderColor: cream }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                    Preis (CHF) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: cream }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                    Lagerbestand
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: cream }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                  Kategorie
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: cream }}
                >
                  <option value="">Keine Kategorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                  Bild-URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: cream }}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: blush }}
                  />
                  <label htmlFor="is_active" style={{ color: charcoal }}>
                    Produkt ist aktiv und sichtbar
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_bestseller"
                    checked={formData.is_bestseller}
                    onChange={(e) => setFormData({ ...formData, is_bestseller: e.target.checked })}
                    className="w-5 h-5 rounded"
                    style={{ accentColor: blush }}
                  />
                  <label htmlFor="is_bestseller" style={{ color: charcoal }}>
                    Als Bestseller markieren
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl font-medium border-2"
                  style={{ borderColor: cream, color: charcoal }}
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl font-medium text-white"
                  style={{ backgroundColor: blush }}
                >
                  {saving ? 'Speichern...' : editingProduct ? 'Aktualisieren' : 'Erstellen'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
