// Authentication and user management with localStorage

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
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'glow_auth';
const USERS_KEY = 'glow_users';

// Get current user
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const authData = localStorage.getItem(AUTH_KEY);
  if (!authData) return null;
  return JSON.parse(authData);
};

// Get all users (for login validation)
const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users
const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register new user
export const register = (data: {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();

  // Check if email already exists
  if (users.find(u => u.email === data.email)) {
    return { success: false, error: 'Diese E-Mail-Adresse wird bereits verwendet' };
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Store password separately (in real app, this would be hashed on backend)
  const passwords = JSON.parse(localStorage.getItem('glow_passwords') || '{}');
  passwords[data.email] = data.password;
  localStorage.setItem('glow_passwords', JSON.stringify(passwords));

  // Set as current user
  localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));

  return { success: true, user: newUser };
};

// Login user
export const login = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  const users = getUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'Benutzer nicht gefunden' };
  }

  // Verify password
  const passwords = JSON.parse(localStorage.getItem('glow_passwords') || '{}');
  if (passwords[email] !== password) {
    return { success: false, error: 'Falsches Passwort' };
  }

  // Set as current user
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  return { success: true, user };
};

// Logout user
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Update user profile
export const updateUser = (updates: Partial<User>): { success: boolean; user?: User; error?: string } => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: 'Nicht angemeldet' };
  }

  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);

  if (userIndex === -1) {
    return { success: false, error: 'Benutzer nicht gefunden' };
  }

  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  saveUsers(users);

  // Update current user
  localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));

  return { success: true, user: updatedUser };
};
