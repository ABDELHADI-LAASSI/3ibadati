import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kbwhkcbuydezqmgquwut.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtid2hrY2J1eWRlenFtZ3F1d3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NjY2MjUsImV4cCI6MjA2MjU0MjYyNX0.vyKlwDstMV5hYqWTzawJS2GI6nnipOUCKSdcYdnO7yo';

export const supabase = createClient(supabaseUrl, supabaseKey);
