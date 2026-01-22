'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Edit2, Trash2, X, Clock, DollarSign } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
}

interface Specialist {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  category_id: string;
  is_active: boolean;
  image_url: string | null;
  service_categories?: ServiceCategory | null;
}

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category_id: string;
  is_active: boolean;
  image_url: string;
}

const emptyFormData: ServiceFormData = {
  name: '',
  description: '',
  price: 0,
  duration_minutes: 60,
  category_id: '',
  is_active: true,
  image_url: '',
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(emptyFormData);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    const [servicesRes, categoriesRes, specialistsRes] = await Promise.all([
      supabase.from('services').select('*, service_categories(*)').order('name'),
      supabase.from('service_categories').select('*').order('name'),
      supabase.from('specialists').select('*').eq('is_active', true).order('name'),
    ]);

    if (servicesRes.data) setServices(servicesRes.data);
    if (categoriesRes.data) setCategories(categoriesRes.data);
    if (specialistsRes.data) setSpecialists(specialistsRes.data);

    setLoading(false);
  };

  const openAddModal = () => {
    setEditingService(null);
    setFormData(emptyFormData);
    setShowModal(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price,
      duration_minutes: service.duration_minutes,
      category_id: service.category_id,
      is_active: service.is_active,
      image_url: service.image_url || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const supabase = getSupabaseClient();

    const serviceData = {
      name: formData.name,
      description: formData.description || null,
      price: formData.price,
      duration_minutes: formData.duration_minutes,
      category_id: formData.category_id,
      is_active: formData.is_active,
      image_url: formData.image_url || null,
    };

    let error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = supabase as any;
    if (editingService) {
      const result = await db.from('services').update(serviceData).eq('id', editingService.id);
      error = result.error;
    } else {
      const result = await db.from('services').insert(serviceData);
      error = result.error;
    }

    if (error) {
      console.error('Error saving service:', error);
      alert('Fehler beim Speichern');
    } else {
      setShowModal(false);
      loadData();
    }

    setSaving(false);
  };

  const toggleActive = async (service: Service) => {
    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('services')
      .update({ is_active: !service.is_active })
      .eq('id', service.id);

    if (error) {
      console.error('Error toggling service:', error);
    } else {
      loadData();
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm('Möchten Sie diese Behandlung wirklich löschen?')) return;

    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('services').delete().eq('id', id);

    if (error) {
      console.error('Error deleting service:', error);
      alert('Fehler beim Löschen');
    } else {
      loadData();
    }
  };

  const groupedServices = services.reduce((acc, service) => {
    const category = service.service_categories?.name || 'Sonstige';
    if (!acc[category]) acc[category] = [];
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light" style={{ color: charcoal }}>
            <span className="italic" style={{ color: blush }}>Behandlungen</span> verwalten
          </h1>
          <p className="mt-1" style={{ color: `${charcoal}66` }}>
            {services.length} Behandlungen in {Object.keys(groupedServices).length} Kategorien
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium"
          style={{ backgroundColor: blush }}
        >
          <Plus size={20} />
          <span>Neue Behandlung</span>
        </button>
      </div>

      {/* Services List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
            <p style={{ color: charcoal }}>Behandlungen werden geladen...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category}>
              <h2 className="text-xl font-medium mb-4" style={{ color: charcoal }}>
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryServices.map((service) => (
                  <div
                    key={service.id}
                    className={`bg-white rounded-xl p-5 shadow-sm ${!service.is_active ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-medium" style={{ color: charcoal }}>
                        {service.name}
                      </h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-gray-100"
                          style={{ color: `${charcoal}66` }}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
                          style={{ color: '#f87171' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {service.description && (
                      <p className="text-sm mb-3 line-clamp-2" style={{ color: `${charcoal}66` }}>
                        {service.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1" style={{ color: `${charcoal}66` }}>
                          <Clock size={14} />
                          {service.duration_minutes} Min.
                        </span>
                        <span className="font-medium" style={{ color: blush }}>
                          CHF {service.price}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleActive(service)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {service.is_active ? 'Aktiv' : 'Inaktiv'}
                      </button>
                    </div>
                  </div>
                ))}
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
                {editingService ? 'Behandlung bearbeiten' : 'Neue Behandlung'}
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
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: cream }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                    Dauer (Min.) *
                  </label>
                  <input
                    type="number"
                    required
                    min="15"
                    step="15"
                    value={formData.duration_minutes}
                    onChange={(e) => setFormData({ ...formData, duration_minutes: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border-2"
                    style={{ borderColor: cream }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: charcoal }}>
                  Kategorie *
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2"
                  style={{ borderColor: cream }}
                >
                  <option value="">Kategorie wählen...</option>
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
                  Behandlung ist aktiv und buchbar
                </label>
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
                  {saving ? 'Speichern...' : editingService ? 'Aktualisieren' : 'Erstellen'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
