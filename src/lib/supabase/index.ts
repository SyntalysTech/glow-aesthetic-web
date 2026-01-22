// Only export client-side code from index
// Server-side code should be imported directly from './server'
export { createClient, getSupabaseClient } from './client';
export * from './types';
