import { supabase } from '@/lib/supabase'
import QuestionCard from './QuestionCard'

export const revalidate = 0

export default async function Home() {
  const { data: question } = await supabase
    .from('questions')
    .select('*')
    .eq('active', true)
    .single()

  return <QuestionCard question={question} />
}