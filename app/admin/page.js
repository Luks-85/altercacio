import { supabase } from '@/lib/supabase'
import AdminClient from './AdminClient'

export default async function Admin() {
  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .order('numero', { ascending: false })

  const { data: arguments_ } = await supabase
    .from('arguments')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminClient questions={questions} args={arguments_} />
}