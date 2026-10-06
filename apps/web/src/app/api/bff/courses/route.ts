import { NextResponse } from 'next/server'
import { courses } from '@/lib/demo-data'
import { getSession } from '@/lib/session'
import { payloadFetch } from '@/lib/backend'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  if (process.env.DEMO_MODE === 'true') {
    return NextResponse.json({ docs: courses, source: 'demo' })
  }

  try {
    const data = await payloadFetch('/api/courses?limit=50&depth=1')
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 })
  }
}
