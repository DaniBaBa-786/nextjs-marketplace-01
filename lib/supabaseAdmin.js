// Admin client config, used by the dashboard to read every seller's data.
export const supabaseAdmin = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};
