import { createClient } from '@supabase/supabase-js'

/*const supabaseUrl = 'https://sxekrgccwliugeacvvfw.supabase.co'
const supabaseAnonKey = 'sb_publishable_UIMsPodsaqPWkEIgvNmehA_TWPQzH-j'*/

/*export const supabase = createClient(supabaseUrl, supabaseAnonKey)*/
console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL)


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)