'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Mail, Phone, Check, Trash2, Eye } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading contacts:', error);
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('contact_submissions')
      .update({ is_read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking as read:', error);
      return;
    }

    loadContacts();
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Möchten Sie diese Nachricht wirklich löschen?')) return;

    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting contact:', error);
      return;
    }

    loadContacts();
    if (selectedContact?.id === id) {
      setSelectedContact(null);
    }
  };

  const openContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    if (!contact.is_read) {
      markAsRead(contact.id);
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === 'unread') return !contact.is_read;
    if (filter === 'read') return contact.is_read;
    return true;
  });

  const unreadCount = contacts.filter((c) => !c.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light" style={{ color: charcoal }}>
            <span className="italic" style={{ color: blush }}>Kontaktanfragen</span>
          </h1>
          <p className="mt-1" style={{ color: `${charcoal}66` }}>
            {unreadCount > 0 ? `${unreadCount} ungelesene Nachrichten` : 'Alle Nachrichten gelesen'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: filter === f ? blush : 'white',
              color: filter === f ? 'white' : charcoal,
            }}
          >
            {f === 'all' ? 'Alle' : f === 'unread' ? 'Ungelesen' : 'Gelesen'}
            {f === 'unread' && unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-white" style={{ color: blush }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-3">
          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="animate-pulse">
                <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
                <p style={{ color: charcoal }}>Laden...</p>
              </div>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <MessageSquare size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
              <p style={{ color: `${charcoal}66` }}>Keine Nachrichten gefunden</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => openContact(contact)}
                className={`bg-white rounded-xl p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedContact?.id === contact.id ? 'ring-2' : ''
                }`}
                style={{
                  borderLeft: !contact.is_read ? `4px solid ${blush}` : 'none',
                  outlineColor: selectedContact?.id === contact.id ? blush : undefined,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`truncate ${!contact.is_read ? 'font-semibold' : 'font-medium'}`}
                      style={{ color: charcoal }}
                    >
                      {contact.name}
                    </p>
                    <p className="text-sm truncate" style={{ color: `${charcoal}66` }}>
                      {contact.subject || 'Kein Betreff'}
                    </p>
                    <p className="text-xs mt-1" style={{ color: `${charcoal}50` }}>
                      {new Date(contact.created_at).toLocaleDateString('de-CH', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {!contact.is_read && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0 ml-2" style={{ backgroundColor: blush }} />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-medium" style={{ color: charcoal }}>
                    {selectedContact.subject || 'Kein Betreff'}
                  </h2>
                  <p className="text-sm" style={{ color: `${charcoal}66` }}>
                    {new Date(selectedContact.created_at).toLocaleDateString('de-CH', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <button
                  onClick={() => deleteContact(selectedContact.id)}
                  className="p-2 rounded-lg transition-colors hover:bg-red-50"
                  style={{ color: '#f87171' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-xl" style={{ backgroundColor: cream }}>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white">
                    <Mail size={16} style={{ color: blush }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>Name</p>
                    <p className="font-medium" style={{ color: charcoal }}>{selectedContact.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white">
                    <Mail size={16} style={{ color: blush }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>E-Mail</p>
                    <a href={`mailto:${selectedContact.email}`} className="font-medium" style={{ color: blush }}>
                      {selectedContact.email}
                    </a>
                  </div>
                </div>
                {selectedContact.phone && (
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-white">
                      <Phone size={16} style={{ color: blush }} />
                    </div>
                    <div>
                      <p className="text-xs" style={{ color: `${charcoal}66` }}>Telefon</p>
                      <a href={`tel:${selectedContact.phone}`} className="font-medium" style={{ color: blush }}>
                        {selectedContact.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: cream }}>
                <p className="text-sm font-medium mb-2" style={{ color: `${charcoal}66` }}>Nachricht</p>
                <p className="whitespace-pre-wrap" style={{ color: charcoal }}>
                  {selectedContact.message}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <a
                  href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject || 'Ihre Anfrage'}`}
                  className="flex-1 py-3 rounded-xl font-medium text-white text-center"
                  style={{ backgroundColor: blush }}
                >
                  Antworten
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="px-6 py-3 rounded-xl font-medium border-2 text-center"
                    style={{ borderColor: blush, color: blush }}
                  >
                    Anrufen
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Eye size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
              <p style={{ color: `${charcoal}66` }}>
                Wählen Sie eine Nachricht aus der Liste
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
