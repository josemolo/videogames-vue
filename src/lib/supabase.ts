import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sxekrgccwliugeacvvfw.supabase.co'
const supabaseAnonKey = 'sb_publishable_UIMsPodsaqPWkEIgvNmehA_TWPQzH-j'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
