import { createClient, Client } from '@supabase/supabase-js';

const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

const supabase = createClient("https://yaofdtbolwahysbykgam.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhb2ZkdGJvbHdhaHlzYnlrZ2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgxODk1NzYsImV4cCI6MjAxMzc2NTU3Nn0.yvqUGPkQfNIXvnilB9L0jhOosv4UjLNG2ZAkE2yPdOQ");

export default supabase; 