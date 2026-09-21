import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { lowVoltageBrands } from '../data/brands'
import { uploadImage } from './uploadToCloudinary'
import styles from './AdminApp.module.css'

const TOKEN_KEY = 'gp_admin_token'
const DRAFT_KEY = 'gp_admin_draft'

type DraftProduct = {
  draftId: string
  brandId: string
  brandName: string
  name: string
  description: string
  code: string
  image: string
}

const brandOptions = [
  ...lowVoltageBrands.map((b) => ({ id: b.id, name: b.name })),
  { id: 'medium-voltage', name: 'Orta Gerilim (Markasız)' },
]

function loadDraft(): DraftProduct[] {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as DraftProduct[]) : []
  } catch {
    return []
  }
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [draft, setDraft] = useState<DraftProduct[]>(() => loadDraft())

  const [brandId, setBrandId] = useState(brandOptions[0].id)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [code, setCode] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formError, setFormError] = useState('')
  const [uploading, setUploading] = useState(false)

  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')
  const [publishError, setPublishError] = useState('')

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [draft])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('')
      return
    }
    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const selectedBrandName = useMemo(
    () => brandOptions.find((b) => b.id === brandId)?.name ?? brandId,
    [brandId],
  )

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setLoginError('')
    setLoggingIn(true)
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setLoginError(data.error ?? 'Giriş başarısız')
        return
      }
      sessionStorage.setItem(TOKEN_KEY, data.token)
      setToken(data.token)
      setPassword('')
    } catch {
      setLoginError('Sunucuya ulaşılamadı')
    } finally {
      setLoggingIn(false)
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault()
    setFormError('')

    if (!name.trim() || !description.trim()) {
      setFormError('Ürün adı ve açıklama zorunlu')
      return
    }

    setUploading(true)
    try {
      let imageUrl = ''
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const item: DraftProduct = {
        draftId: crypto.randomUUID(),
        brandId,
        brandName: selectedBrandName,
        name: name.trim(),
        description: description.trim(),
        code: code.trim(),
        image: imageUrl,
      }

      setDraft((prev) => [...prev, item])
      setName('')
      setDescription('')
      setCode('')
      setImageFile(null)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Görsel yüklenemedi')
    } finally {
      setUploading(false)
    }
  }

  function removeDraftItem(draftId: string) {
    setDraft((prev) => prev.filter((p) => p.draftId !== draftId))
  }

  async function handlePublish() {
    if (!token || draft.length === 0) return
    setPublishing(true)
    setPublishError('')
    setPublishMessage('')

    try {
      const res = await fetch('/api/publish-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          products: draft.map(({ brandId, name, description, code, image }) => ({
            brandId,
            name,
            description,
            code: code || undefined,
            image: image || undefined,
          })),
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          setPublishError('Oturum süresi doldu, lütfen tekrar giriş yapın. Taslağınız korunuyor.')
          handleLogout()
          return
        }
        setPublishError(data.error ?? 'Yayınlama başarısız')
        return
      }

      setDraft([])
      setPublishMessage(`${data.added} ürün yayınlandı. Site birkaç dakika içinde güncellenecek.`)
    } catch {
      setPublishError('Sunucuya ulaşılamadı')
    } finally {
      setPublishing(false)
    }
  }

  if (!token) {
    return (
      <div className={styles.page}>
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <h1 className={styles.title}>Green Pi — Ürün Yönetimi</h1>
          <label className={styles.label}>
            Şifre
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </label>
          {loginError && <p className={styles.error}>{loginError}</p>}
          <button type="submit" className={styles.primaryButton} disabled={loggingIn}>
            {loggingIn ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <header className={styles.header}>
          <h1 className={styles.title}>Ürün Ekle</h1>
          <button type="button" className={styles.linkButton} onClick={handleLogout}>
            Çıkış yap
          </button>
        </header>

        <form className={styles.form} onSubmit={handleAddProduct}>
          <label className={styles.label}>
            Marka / Kategori
            <select className={styles.input} value={brandId} onChange={(e) => setBrandId(e.target.value)}>
              {brandOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.label}>
            Ürün Adı
            <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label className={styles.label}>
            Açıklama
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>

          <label className={styles.label}>
            Ürün Kodu (opsiyonel)
            <input className={styles.input} value={code} onChange={(e) => setCode(e.target.value)} />
          </label>

          <label className={styles.label}>
            Ürün Görseli
            <input
              type="file"
              accept="image/*"
              className={styles.input}
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
          </label>

          {imagePreview && <img src={imagePreview} alt="" className={styles.preview} />}

          {formError && <p className={styles.error}>{formError}</p>}

          <button type="submit" className={styles.primaryButton} disabled={uploading}>
            {uploading ? 'Yükleniyor...' : 'Taslağa Ekle'}
          </button>
        </form>

        <section className={styles.draftSection}>
          <h2 className={styles.subtitle}>Taslak ({draft.length})</h2>

          {draft.length === 0 ? (
            <p className={styles.empty}>Henüz taslağa ürün eklenmedi.</p>
          ) : (
            <ul className={styles.draftList}>
              {draft.map((p) => (
                <li key={p.draftId} className={styles.draftItem}>
                  {p.image && <img src={p.image} alt="" className={styles.draftThumb} />}
                  <div className={styles.draftMeta}>
                    <span className={styles.draftBrand}>{p.brandName}</span>
                    <span className={styles.draftName}>{p.name}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => removeDraftItem(p.draftId)}
                  >
                    Sil
                  </button>
                </li>
              ))}
            </ul>
          )}

          {publishError && <p className={styles.error}>{publishError}</p>}
          {publishMessage && <p className={styles.success}>{publishMessage}</p>}

          <button
            type="button"
            className={styles.publishButton}
            disabled={draft.length === 0 || publishing}
            onClick={handlePublish}
          >
            {publishing ? 'Yayınlanıyor...' : `Değişiklikleri Yayınla (${draft.length})`}
          </button>
        </section>
      </div>
    </div>
  )
}
