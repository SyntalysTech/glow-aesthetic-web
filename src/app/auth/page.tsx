'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

const blush = '#baaeb1';
const blushDark = '#a69c9e';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register({ email, password, firstName, lastName, phone });
      }

      if (result.success) {
        router.push('/profile');
      } else {
        setError(result.error || 'Ein Fehler ist aufgetreten');
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20" style={{ backgroundColor: cream }}>
        <div className="max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-light mb-4" style={{ color: charcoal }}>
              {isLogin ? 'Willkommen' : 'Konto Erstellen'}
              <span className="italic" style={{ color: blush }}> zurück</span>
            </h1>
            <p style={{ color: `${charcoal}99` }}>
              {isLogin ? 'Melden Sie sich an, um fortzufahren' : 'Erstellen Sie Ihr Glow Aesthetics Konto'}
            </p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 sm:p-10"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
          >
            {error && (
              <div
                className="mb-6 p-4 rounded-xl text-sm"
                style={{ backgroundColor: '#fee', color: '#c33' }}
              >
                {error}
              </div>
            )}

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                E-Mail
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: blush }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors"
                  style={{
                    borderColor: cream,
                    backgroundColor: cream,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                  placeholder="ihre@email.com"
                />
              </div>
            </div>

            {/* Register fields */}
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                      Vorname
                    </label>
                    <div className="relative">
                      <User
                        size={20}
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ color: blush }}
                      />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors"
                        style={{
                          borderColor: cream,
                          backgroundColor: cream,
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                      Nachname
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                      style={{
                        borderColor: cream,
                        backgroundColor: cream,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                    Telefon
                  </label>
                  <div className="relative">
                    <Phone
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      style={{ color: blush }}
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors"
                      style={{
                        borderColor: cream,
                        backgroundColor: cream,
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                Passwort
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ color: blush }}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 transition-colors"
                  style={{
                    borderColor: cream,
                    backgroundColor: cream,
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-medium text-white flex items-center justify-center gap-2 transition-all"
              style={{ backgroundColor: blush }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
            >
              {loading ? (
                <span>Laden...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Anmelden' : 'Registrieren'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Toggle */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-sm"
                style={{ color: blush }}
              >
                {isLogin ? 'Noch kein Konto? Registrieren' : 'Bereits ein Konto? Anmelden'}
              </button>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm" style={{ color: `${charcoal}66` }}>
                Zurück zur Startseite
              </Link>
            </div>
          </motion.form>
        </motion.div>
        </div>
      </div>
    </>
  );
}
