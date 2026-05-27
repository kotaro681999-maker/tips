import { createClient } from '@supabase/supabase-js'

 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: staffs, error } = await supabase
    .from('staffs')
    .select('*')
    .eq('is_active', true)

  if (error) {
    return <div>エラー: {error.message}</div>
  }
  
  return (
    <main style={{ padding: 20 }}>
      <h1>スタッフ一覧（デモ）</h1>
      <ul>
        {staffs?.map((staff) => (
          <li key={staff.id}>
            <strong>{staff.name}</strong>
            <p>{staff.description}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
