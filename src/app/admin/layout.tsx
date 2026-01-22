'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Buchungen', href: '/admin/bookings', icon: Calendar },
  { name: 'Behandlungen', href: '/admin/services', icon: Package },
  { name: 'Produkte', href: '/admin/products', icon: ShoppingBag },
  { name: 'Kunden', href: '/admin/customers', icon: Users },
  { name: 'Kontaktanfragen', href: '/admin/contacts', icon: MessageSquare },
  { name: 'Bewertungen', href: '/admin/reviews', icon: Star },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/auth');
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: cream }}>
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
          <p style={{ color: charcoal }}>Laden...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: cream }}>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm p-4 flex items-center justify-between">
        <Link href="/admin" className="font-semibold text-lg" style={{ color: charcoal }}>
          Glow <span style={{ color: blush }}>Admin</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ color: charcoal }}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b" style={{ borderColor: cream }}>
            <Link href="/admin" className="text-2xl font-light" style={{ color: charcoal }}>
              Glow <span className="italic" style={{ color: blush }}>Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
                style={{ color: charcoal }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${blush}20`;
                  e.currentTarget.style.color = blush;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = charcoal;
                }}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t" style={{ borderColor: cream }}>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: blush }}
              >
                {user?.firstName?.[0] || 'A'}
              </div>
              <div>
                <p className="font-medium text-sm" style={{ color: charcoal }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs" style={{ color: `${charcoal}66` }}>
                  Administrator
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ color: `${charcoal}99` }}
              >
                <Settings size={18} />
                <span>Zur Website</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors"
                style={{ color: `${charcoal}99` }}
              >
                <LogOut size={18} />
                <span>Abmelden</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
