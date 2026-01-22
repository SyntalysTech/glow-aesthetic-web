'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface Review {
  id: string;
  name: string;
  email: string | null;
  rating: number;
  comment: string | null;
  service_id: string | null;
  is_approved: boolean;
  created_at: string;
  services?: { name: string } | null;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('reviews')
      .select('*, services(name)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading reviews:', error);
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const updateReview = async (id: string, isApproved: boolean) => {
    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('reviews')
      .update({ is_approved: isApproved })
      .eq('id', id);

    if (error) {
      console.error('Error updating review:', error);
    } else {
      loadReviews();
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm('Möchten Sie diese Bewertung wirklich löschen?')) return;

    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('reviews').delete().eq('id', id);

    if (error) {
      console.error('Error deleting review:', error);
    } else {
      loadReviews();
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === 'pending') return !review.is_approved;
    if (filter === 'approved') return review.is_approved;
    return true;
  });

  const pendingCount = reviews.filter((r) => !r.is_approved).length;
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light" style={{ color: charcoal }}>
            <span className="italic" style={{ color: blush }}>Bewertungen</span> verwalten
          </h1>
          <p className="mt-1" style={{ color: `${charcoal}66` }}>
            {reviews.length} Bewertungen • Durchschnitt: {avgRating} ⭐
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-3xl font-semibold" style={{ color: charcoal }}>{reviews.length}</p>
          <p className="text-sm" style={{ color: `${charcoal}66` }}>Gesamt</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-3xl font-semibold" style={{ color: '#22c55e' }}>
            {reviews.filter((r) => r.is_approved).length}
          </p>
          <p className="text-sm" style={{ color: `${charcoal}66` }}>Genehmigt</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-3xl font-semibold" style={{ color: '#f59e0b' }}>{pendingCount}</p>
          <p className="text-sm" style={{ color: `${charcoal}66` }}>Ausstehend</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star size={24} fill={blush} color={blush} />
            <p className="text-3xl font-semibold" style={{ color: charcoal }}>{avgRating}</p>
          </div>
          <p className="text-sm" style={{ color: `${charcoal}66` }}>Durchschnitt</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'pending', 'approved'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: filter === f ? blush : 'white',
              color: filter === f ? 'white' : charcoal,
            }}
          >
            {f === 'all' ? 'Alle' : f === 'pending' ? 'Ausstehend' : 'Genehmigt'}
            {f === 'pending' && pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white" style={{ color: blush }}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
            <p style={{ color: charcoal }}>Bewertungen werden geladen...</p>
          </div>
        </div>
      ) : filteredReviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Star size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
          <p style={{ color: `${charcoal}66` }}>Keine Bewertungen gefunden</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl p-6 shadow-sm ${!review.is_approved ? 'border-l-4' : ''}`}
              style={{ borderLeftColor: !review.is_approved ? '#f59e0b' : undefined }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                      style={{ backgroundColor: blush }}
                    >
                      {review.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: charcoal }}>{review.name}</p>
                      <p className="text-xs" style={{ color: `${charcoal}66` }}>
                        {new Date(review.created_at).toLocaleDateString('de-CH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? blush : 'transparent'}
                        color={blush}
                      />
                    ))}
                    {review.services && (
                      <span className="ml-2 text-sm" style={{ color: `${charcoal}66` }}>
                        • {review.services.name}
                      </span>
                    )}
                  </div>

                  {review.comment && (
                    <p className="text-sm" style={{ color: charcoal }}>
                      "{review.comment}"
                    </p>
                  )}

                  <div className="mt-3 flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        review.is_approved
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {review.is_approved ? 'Genehmigt' : 'Ausstehend'}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2">
                  {!review.is_approved && (
                    <button
                      onClick={() => updateReview(review.id, true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                      style={{ backgroundColor: '#22c55e' }}
                    >
                      <Check size={16} />
                      <span className="hidden sm:inline">Genehmigen</span>
                    </button>
                  )}
                  {review.is_approved && (
                    <button
                      onClick={() => updateReview(review.id, false)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: cream, color: charcoal }}
                    >
                      <X size={16} />
                      <span className="hidden sm:inline">Ablehnen</span>
                    </button>
                  )}
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: '#fee', color: '#f87171' }}
                  >
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Löschen</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
