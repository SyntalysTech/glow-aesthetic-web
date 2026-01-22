// Authentication with Supabase
import { getSupabaseClient } from './supabase';
import type { Profile } from './supabase/types';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
  };
  isAdmin: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Convert Supabase profile to User
const profileToUser = (profile: Profile): User => ({
  id: profile.id,
  email: profile.email,
  firstName: profile.first_name || '',
  lastName: profile.last_name || '',
  phone: profile.phone || '',
  dateOfBirth: undefined,
  address: profile.address ? {
    street: profile.address,
    city: profile.city || '',
    postalCode: profile.postal_code || '',
  } : undefined,
  isAdmin: profile.is_admin,
  createdAt: profile.created_at,
});

// Get current user profile
export const getCurrentUser = async (): Promise<User | null> => {
  const supabase = getSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) return null;

  return profileToUser(profile);
};

// Register new user
export const register = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}): Promise<{ success: boolean; user?: User; error?: string }> => {
  const supabase = getSupabaseClient();

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
      },
    },
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      return { success: false, error: 'Diese E-Mail-Adresse wird bereits verwendet' };
    }
    return { success: false, error: authError.message };
  }

  if (!authData.user) {
    return { success: false, error: 'Registrierung fehlgeschlagen' };
  }

  // Update profile with additional info (trigger should have created it)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: profileError } = await (supabase as any)
    .from('profiles')
    .update({
      first_name: data.firstName,
      last_name: data.lastName,
      phone: data.phone,
    })
    .eq('id', authData.user.id);

  if (profileError) {
    console.error('Profile update error:', profileError);
  }

  // Fetch the complete profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (!profile) {
    return { success: true, user: {
      id: authData.user.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    }};
  }

  return { success: true, user: profileToUser(profile) };
};

// Login user
export const login = async (
  email: string,
  password: string
): Promise<{ success: boolean; user?: User; error?: string }> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('Invalid login')) {
      return { success: false, error: 'E-Mail oder Passwort falsch' };
    }
    return { success: false, error: error.message };
  }

  if (!data.user) {
    return { success: false, error: 'Anmeldung fehlgeschlagen' };
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single();

  if (!profile) {
    return { success: false, error: 'Profil nicht gefunden' };
  }

  return { success: true, user: profileToUser(profile) };
};

// Logout user
export const logout = async (): Promise<void> => {
  const supabase = getSupabaseClient();
  await supabase.auth.signOut();
};

// Update user profile
export const updateUser = async (
  updates: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
    };
  }>
): Promise<{ success: boolean; user?: User; error?: string }> => {
  const supabase = getSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: 'Nicht angemeldet' };
  }

  const updateData: Record<string, unknown> = {};
  if (updates.firstName !== undefined) updateData.first_name = updates.firstName;
  if (updates.lastName !== undefined) updateData.last_name = updates.lastName;
  if (updates.phone !== undefined) updateData.phone = updates.phone;
  if (updates.address) {
    updateData.address = updates.address.street;
    updateData.city = updates.address.city;
    updateData.postal_code = updates.address.postalCode;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('profiles')
    .update(updateData)
    .eq('id', user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  // Fetch updated profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) {
    return { success: false, error: 'Profil nicht gefunden' };
  }

  return { success: true, user: profileToUser(profile) };
};

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user?.isAdmin ?? false;
};
