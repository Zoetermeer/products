import { useEffect, useState } from 'react'
import type { Product } from './types'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const r = await fetch('/api/products')
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const data: Product[] = await r.json()
        if (!cancelled) setProducts(data)
      } catch (e) {
        if (!cancelled) setError((e as Error).message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  async function handleCreate(e?: React.FormEvent) {
    e?.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Please enter a product name')
      return
    }
    setError(null)
    setCreating(true)
    try {
      const r = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      })
      if (!r.ok) {
        throw new Error(msg)
      }
      const created: Product = await r.json()
      setProducts(prev => [created, ...prev])
      setName('')
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setCreating(false)
    }
  }

  return (
    <main>
      <h1>
        Products
      </h1>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="New product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={creating}
          style={{
            padding: '0.6rem 0.8rem',
            borderRadius: 10,
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />
        <button
          type="submit"
          disabled={creating}
          onClick={handleCreate}
        >
          {creating ? 'Creating…' : 'Create'}
        </button>
      </form>

      {error && (
        <div>
          {error}
        </div>
      )}

      <section>
        <h2>
          Products
        </h2>

        {loading ? (
          <p>Loading…</p>
        ) : products.length === 0 ? (
          <p>(none)</p>
        ) : (
          <ul>
            {products.map(p => (
              <li key={p.id}>
                <span>{p.name}</span>
                <span>
                  {p.id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}