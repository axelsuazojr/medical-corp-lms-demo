import 'server-only'

export async function payloadFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const base = process.env.INTERNAL_API_URL
  if (!base) throw new Error('INTERNAL_API_URL no configurado')
  const token = process.env.INTERNAL_SERVICE_TOKEN
  const res = await fetch(`${base.replace(/\/$/, '')}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      accept: 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  })
  if (!res.ok) throw new Error(`Backend respondió ${res.status}`)
  return res.json() as Promise<T>
}
