import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsZ3pzaXdndWN6ZWZsZnBxaWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0Mjg0ODMsImV4cCI6MjA5OTAwNDQ4M30.qDp22oiB154GNuoE9IGgLEKFpzhMfQnJhDOfMmurwPc";
const supabaseKey = "ANON_KEY";

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);