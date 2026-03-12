import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  category: string
}

const products = ref<Product[]>([])

export function useProducts() {
  const products = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error cargando productos:', error)
      return
    }

    products.value = data as Product[]
  }

  onMounted(loadProducts)

  const getByCategory = (category: string) =>
    products.value.filter(p => p.category === category)


  const fetchProducts = async () => {
    loading.value = true
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (err) error.value = err.message
    else products.value = data ?? []

    loading.value = false
  }

  const addProduct = async (product: any) => {
    const { data, error: err } = await supabase
      .from('products')
      .insert([product])
    if (err) throw err
    await fetchProducts()
  }

  const updateProduct = async (id: number, updates: any) => {
    const { error: err } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    if (err) throw err
    await fetchProducts()
  }

  const deleteProduct = async (id: number) => {
    const { error: err } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (err) throw err
    await fetchProducts()
  }

  return { products,loading, error, loadProducts, getByCategory, fetchProducts, addProduct, updateProduct, deleteProduct }
}