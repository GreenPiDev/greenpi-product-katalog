import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { lowVoltageBrands, mediumVoltageGroups } from '../data/brands'
import type { Lang, LocalizedText } from '../i18n/types'
import { uploadImage } from './uploadToCloudinary'
import styles from './AdminApp.module.css'

const PRODUCT_LANG_TABS: { code: Lang; label: string; required?: boolean }[] = [
  { code: 'tr', label: 'Türkçe', required: true },
  { code: 'en', label: 'İngilizce' },
  { code: 'ru', label: 'Rusça' },
  { code: 'ar', label: 'Arapça' },
]

function emptyLocalized(): LocalizedText {
  return { tr: '', en: '', ru: '', ar: '' }
}

function trimLocalized(text: LocalizedText): LocalizedText {
  return { tr: text.tr.trim(), en: text.en.trim(), ru: text.ru.trim(), ar: text.ar.trim() }
}

function LocalizedProductFields({
  name,
  description,
  onNameChange,
  onDescriptionChange,
}: {
  name: LocalizedText
  description: LocalizedText
  onNameChange: (lang: Lang, value: string) => void
  onDescriptionChange: (lang: Lang, value: string) => void
}) {
  const [activeLang, setActiveLang] = useState<Lang>('tr')
  const activeTab = PRODUCT_LANG_TABS.find((tab) => tab.code === activeLang)!

  return (
    <div className={styles.localizedFields}>
      <div className={styles.langTabs}>
        {PRODUCT_LANG_TABS.map((tab) => {
          const filled = Boolean(name[tab.code]?.trim())
          return (
            <button
              key={tab.code}
              type="button"
              className={`${styles.langTab} ${activeLang === tab.code ? styles.langTabActive : ''}`}
              onClick={() => setActiveLang(tab.code)}
            >
              {tab.label}
              {tab.required ? ' *' : filled ? '' : ' ○'}
            </button>
          )
        })}
      </div>

      <label className={styles.label}>
        {`Ürün Adı (${activeTab.label})`}
        <input
          className={styles.input}
          required={activeTab.required}
          value={name[activeLang]}
          onChange={(e) => onNameChange(activeLang, e.target.value)}
        />
      </label>

      <label className={styles.label}>
        {`Açıklama (${activeTab.label})`}
        <textarea
          className={styles.textarea}
          rows={3}
          value={description[activeLang]}
          onChange={(e) => onDescriptionChange(activeLang, e.target.value)}
        />
      </label>
    </div>
  )
}

const TOKEN_KEY = 'gp_admin_token'
const DRAFT_KEY = 'gp_admin_draft'
const EDITS_KEY = 'gp_admin_edits'
const DELETES_KEY = 'gp_admin_deletes'
const ORDER_KEY = 'gp_admin_order'
const VISIBILITY_KEY = 'gp_admin_visibility'
const BRAND_VISIBILITY_KEY = 'gp_admin_brand_visibility'

const RAW_PRODUCTS_URL =
  'https://raw.githubusercontent.com/GreenPiDev/greenpi-product-katalog/main/src/data/userProducts.json'
const RAW_BRAND_VISIBILITY_URL =
  'https://raw.githubusercontent.com/GreenPiDev/greenpi-product-katalog/main/src/data/brandVisibility.json'

type DraftProduct = {
  draftId: string
  brandId: string
  brandName: string
  name: LocalizedText
  description: LocalizedText
  code: string
  image: string
  isVisible: boolean
}

type ExistingProduct = {
  id: string
  brandId: string
  name: LocalizedText
  description: LocalizedText
  code?: string
  image?: string
  isVisible?: boolean
}

type EditPatch = {
  brandId: string
  name: LocalizedText
  description: LocalizedText
  code: string
  image: string
}

const brandOptions = [
  ...lowVoltageBrands.map((b) => ({ id: b.id, name: b.name.tr })),
  ...mediumVoltageGroups.map((g) => ({ id: g.id, name: `Orta Gerilim — ${g.name.tr}` })),
]

function brandName(brandId: string) {
  return brandOptions.find((b) => b.id === brandId)?.name ?? brandId
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

type BrandOrder = Record<string, string[]>

function buildOrder(products: ExistingProduct[]): BrandOrder {
  const grouped: BrandOrder = {}
  for (const p of products) {
    if (!grouped[p.brandId]) grouped[p.brandId] = []
    grouped[p.brandId].push(p.id)
  }
  return grouped
}

function reconcileOrder(prev: BrandOrder, products: ExistingProduct[]): BrandOrder {
  const fresh = buildOrder(products)
  const merged: BrandOrder = {}
  for (const brandId of Object.keys(fresh)) {
    const freshIds = new Set(fresh[brandId])
    const kept = (prev[brandId] ?? []).filter((id) => freshIds.has(id))
    const newIds = fresh[brandId].filter((id) => !kept.includes(id))
    merged[brandId] = [...kept, ...newIds]
  }
  return merged
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY))
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  // Yeni ürün taslağı
  const [draft, setDraft] = useState<DraftProduct[]>(() => loadJson(DRAFT_KEY, []))
  const [brandId, setBrandId] = useState(brandOptions[0].id)
  const [name, setName] = useState<LocalizedText>(emptyLocalized())
  const [description, setDescription] = useState<LocalizedText>(emptyLocalized())
  const [code, setCode] = useState('')
  const [visibleOnCreate, setVisibleOnCreate] = useState(true)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formError, setFormError] = useState('')
  const [uploading, setUploading] = useState(false)

  // Mevcut ürünler + bekleyen düzenleme/silme
  const [existingProducts, setExistingProducts] = useState<ExistingProduct[]>([])
  const [loadingExisting, setLoadingExisting] = useState(false)
  const [existingError, setExistingError] = useState('')
  const [edits, setEdits] = useState<Record<string, EditPatch>>(() => loadJson(EDITS_KEY, {}))
  const [deletedIds, setDeletedIds] = useState<string[]>(() => loadJson(DELETES_KEY, []))
  const [order, setOrder] = useState<BrandOrder>(() => loadJson(ORDER_KEY, {}))
  const [originalOrder, setOriginalOrder] = useState<BrandOrder>({})
  const [visibility, setVisibility] = useState<Record<string, boolean>>(() => loadJson(VISIBILITY_KEY, {}))

  // Marka görünürlüğü
  const [brandVisibilityRemote, setBrandVisibilityRemote] = useState<Record<string, boolean>>({})
  const [brandVisibilityOverrides, setBrandVisibilityOverrides] = useState<Record<string, boolean>>(() =>
    loadJson(BRAND_VISIBILITY_KEY, {}),
  )
  const [loadingBrandVisibility, setLoadingBrandVisibility] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditPatch | null>(null)
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState('')
  const [editUploading, setEditUploading] = useState(false)
  const [editError, setEditError] = useState('')

  const [publishing, setPublishing] = useState(false)
  const [publishMessage, setPublishMessage] = useState('')
  const [publishError, setPublishError] = useState('')

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [draft])

  useEffect(() => {
    localStorage.setItem(EDITS_KEY, JSON.stringify(edits))
  }, [edits])

  useEffect(() => {
    localStorage.setItem(DELETES_KEY, JSON.stringify(deletedIds))
  }, [deletedIds])

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order))
  }, [order])

  useEffect(() => {
    localStorage.setItem(VISIBILITY_KEY, JSON.stringify(visibility))
  }, [visibility])

  useEffect(() => {
    localStorage.setItem(BRAND_VISIBILITY_KEY, JSON.stringify(brandVisibilityOverrides))
  }, [brandVisibilityOverrides])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('')
      return
    }
    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  useEffect(() => {
    if (!editImageFile) {
      setEditImagePreview('')
      return
    }
    const url = URL.createObjectURL(editImageFile)
    setEditImagePreview(url)
    return () => URL.revokeObjectURL(url)
  }, [editImageFile])

  useEffect(() => {
    if (token) {
      loadExistingProducts()
      loadBrandVisibility()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const selectedBrandName = useMemo(() => brandName(brandId), [brandId])

  async function loadExistingProducts() {
    setLoadingExisting(true)
    setExistingError('')
    try {
      const res = await fetch(`${RAW_PRODUCTS_URL}?t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('Ürünler yüklenemedi')
      const data = (await res.json()) as ExistingProduct[]
      setExistingProducts(data)
      setOrder((prev) => reconcileOrder(prev, data))
      setOriginalOrder(buildOrder(data))
    } catch {
      setExistingError('Mevcut ürünler yüklenemedi')
    } finally {
      setLoadingExisting(false)
    }
  }

  async function loadBrandVisibility() {
    setLoadingBrandVisibility(true)
    try {
      const res = await fetch(`${RAW_BRAND_VISIBILITY_URL}?t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('Marka görünürlüğü yüklenemedi')
      const data = (await res.json()) as Record<string, boolean>
      setBrandVisibilityRemote(data)
    } catch {
      setBrandVisibilityRemote({})
    } finally {
      setLoadingBrandVisibility(false)
    }
  }

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

    if (!name.tr.trim() || !description.tr.trim()) {
      setFormError('Türkçe ürün adı ve açıklama zorunlu')
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
        name: trimLocalized(name),
        description: trimLocalized(description),
        code: code.trim(),
        image: imageUrl,
        isVisible: visibleOnCreate,
      }

      setDraft((prev) => [...prev, item])
      setName(emptyLocalized())
      setDescription(emptyLocalized())
      setCode('')
      setImageFile(null)
      setVisibleOnCreate(true)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Görsel yüklenemedi')
    } finally {
      setUploading(false)
    }
  }

  function removeDraftItem(draftId: string) {
    setDraft((prev) => prev.filter((p) => p.draftId !== draftId))
  }

  function startEdit(product: ExistingProduct) {
    const patch = edits[product.id]
    setEditingId(product.id)
    setEditError('')
    setEditImageFile(null)
    setEditForm({
      brandId: patch?.brandId ?? product.brandId,
      name: patch?.name ?? product.name,
      description: patch?.description ?? product.description,
      code: patch?.code ?? product.code ?? '',
      image: patch?.image ?? product.image ?? '',
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm(null)
    setEditImageFile(null)
  }

  async function saveEdit() {
    if (!editingId || !editForm) return
    if (!editForm.name.tr.trim() || !editForm.description.tr.trim()) {
      setEditError('Türkçe ürün adı ve açıklama zorunlu')
      return
    }

    setEditUploading(true)
    setEditError('')
    try {
      let image = editForm.image
      if (editImageFile) {
        image = await uploadImage(editImageFile)
      }

      setEdits((prev) => ({
        ...prev,
        [editingId]: {
          brandId: editForm.brandId,
          name: trimLocalized(editForm.name),
          description: trimLocalized(editForm.description),
          code: editForm.code.trim(),
          image,
        },
      }))
      cancelEdit()
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Görsel yüklenemedi')
    } finally {
      setEditUploading(false)
    }
  }

  function discardEditPatch(id: string) {
    setEdits((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  function toggleDelete(id: string) {
    setDeletedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function effectiveVisible(product: ExistingProduct) {
    return visibility[product.id] ?? product.isVisible ?? true
  }

  function toggleVisibility(product: ExistingProduct) {
    const next = !effectiveVisible(product)
    setVisibility((prev) => {
      const copy = { ...prev }
      if (next === (product.isVisible ?? true)) {
        delete copy[product.id]
      } else {
        copy[product.id] = next
      }
      return copy
    })
  }

  function effectiveBrandVisible(id: string) {
    return brandVisibilityOverrides[id] ?? brandVisibilityRemote[id] ?? true
  }

  function toggleBrandVisibility(id: string) {
    const next = !effectiveBrandVisible(id)
    setBrandVisibilityOverrides((prev) => {
      const copy = { ...prev }
      if (next === (brandVisibilityRemote[id] ?? true)) {
        delete copy[id]
      } else {
        copy[id] = next
      }
      return copy
    })
  }

  function moveProduct(brandId: string, id: string, direction: 'up' | 'down') {
    setOrder((prev) => {
      const list = prev[brandId] ?? []
      const index = list.indexOf(id)
      const swapWith = direction === 'up' ? index - 1 : index + 1
      if (index === -1 || swapWith < 0 || swapWith >= list.length) return prev
      const next = [...list]
      ;[next[index], next[swapWith]] = [next[swapWith], next[index]]
      return { ...prev, [brandId]: next }
    })
  }

  const orderChanged = useMemo(
    () => JSON.stringify(order) !== JSON.stringify(originalOrder),
    [order, originalOrder],
  )

  const pendingCount =
    draft.length +
    Object.keys(edits).length +
    deletedIds.length +
    Object.keys(visibility).length +
    Object.keys(brandVisibilityOverrides).length +
    (orderChanged ? 1 : 0)

  async function handlePublish() {
    if (!token || pendingCount === 0) return
    setPublishing(true)
    setPublishError('')
    setPublishMessage('')

    try {
      const updateMap = new Map<string, Record<string, unknown>>()
      for (const [id, patch] of Object.entries(edits)) {
        updateMap.set(id, { id, ...patch })
      }
      for (const [id, visible] of Object.entries(visibility)) {
        if (deletedIds.includes(id)) continue
        updateMap.set(id, { ...(updateMap.get(id) ?? { id }), isVisible: visible })
      }

      const res = await fetch('/api/publish-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          create: draft.map(({ brandId, name, description, code, image, isVisible }) => ({
            brandId,
            name,
            description,
            code: code || undefined,
            image: image || undefined,
            isVisible,
          })),
          update: Array.from(updateMap.values()),
          delete: deletedIds,
          reorder: orderChanged
            ? brandOptions.flatMap((b) => (order[b.id] ?? []).filter((id) => !deletedIds.includes(id)))
            : [],
          brandVisibility: brandVisibilityOverrides,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          setPublishError('Oturum süresi doldu, lütfen tekrar giriş yapın. Değişiklikleriniz korunuyor.')
          handleLogout()
          return
        }
        setPublishError(data.error ?? 'Yayınlama başarısız')
        return
      }

      setDraft([])
      setEdits({})
      setDeletedIds([])
      setVisibility({})
      setBrandVisibilityOverrides({})
      setPublishMessage(
        `${data.created} eklendi, ${data.updated} düzenlendi, ${data.deleted} silindi. Site birkaç dakika içinde güncellenecek.`,
      )
      loadExistingProducts()
      loadBrandVisibility()
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
          <h1 className={styles.title}>Ürün Yönetimi</h1>
          <button type="button" className={styles.linkButton} onClick={handleLogout}>
            Çıkış yap
          </button>
        </header>

        <section>
          <h2 className={styles.subtitle}>Marka Görünürlüğü</h2>

          {loadingBrandVisibility && <p className={styles.empty}>Yükleniyor...</p>}

          <ul className={styles.existingList}>
            {brandOptions.map((brand) => {
              const visible = effectiveBrandVisible(brand.id)
              const pending = Object.prototype.hasOwnProperty.call(brandVisibilityOverrides, brand.id)

              return (
                <li
                  key={brand.id}
                  className={`${styles.existingItem} ${!visible ? styles.existingItemDeleted : ''}`}
                >
                  <div className={styles.existingRow}>
                    <div className={styles.draftMeta}>
                      <span className={styles.draftName}>{brand.name}</span>
                      {!visible && (
                        <span className={styles.pendingBadge}>{pending ? 'Gizlenecek' : 'Gizli'}</span>
                      )}
                    </div>
                    <div className={styles.existingActions}>
                      <button type="button" className={styles.linkButton} onClick={() => toggleBrandVisibility(brand.id)}>
                        {visible ? 'Gizle' : 'Göster'}
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h2 className={styles.subtitle}>Yeni Ürün Ekle</h2>
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

            <LocalizedProductFields
              name={name}
              description={description}
              onNameChange={(lang, value) => setName((prev) => ({ ...prev, [lang]: value }))}
              onDescriptionChange={(lang, value) => setDescription((prev) => ({ ...prev, [lang]: value }))}
            />

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

            <label className={styles.label} style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={visibleOnCreate}
                onChange={(e) => setVisibleOnCreate(e.target.checked)}
              />
              Katalogda görünür olsun
            </label>

            {formError && <p className={styles.error}>{formError}</p>}

            <button type="submit" className={styles.primaryButton} disabled={uploading}>
              {uploading ? 'Yükleniyor...' : 'Taslağa Ekle'}
            </button>
          </form>

          <div className={styles.draftSection}>
            <h3 className={styles.subtitle}>Yeni Ürün Taslağı ({draft.length})</h3>

            {draft.length === 0 ? (
              <p className={styles.empty}>Henüz taslağa ürün eklenmedi.</p>
            ) : (
              <ul className={styles.draftList}>
                {draft.map((p) => (
                  <li key={p.draftId} className={styles.draftItem}>
                    {p.image && <img src={p.image} alt="" className={styles.draftThumb} />}
                    <div className={styles.draftMeta}>
                      <span className={styles.draftBrand}>{p.brandName}</span>
                      <span className={styles.draftName}>{p.name.tr}</span>
                      {!p.isVisible && <span className={styles.pendingBadge}>Gizli</span>}
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
          </div>
        </section>

        <section>
          <h2 className={styles.subtitle}>Mevcut Ürünler ({existingProducts.length})</h2>

          {loadingExisting && <p className={styles.empty}>Yükleniyor...</p>}
          {existingError && <p className={styles.error}>{existingError}</p>}

          {!loadingExisting && !existingError && existingProducts.length === 0 && (
            <p className={styles.empty}>Henüz yayınlanmış ürün yok.</p>
          )}

          {(() => {
            const productById = new Map(existingProducts.map((p) => [p.id, p]))

            return brandOptions.map((brand) => {
              const ids = (order[brand.id] ?? []).filter((id) => productById.has(id))
              if (ids.length === 0) return null

              return (
                <div key={brand.id} className={styles.brandGroup}>
                  <h3 className={styles.brandGroupTitle}>{brand.name}</h3>
                  <ul className={styles.existingList}>
                    {ids.map((id, i) => {
                      const product = productById.get(id)!
                      const patch = edits[product.id]
                      const display = patch ? { ...product, ...patch } : product
                      const isDeleted = deletedIds.includes(product.id)
                      const isEditing = editingId === product.id
                      const visible = effectiveVisible(product)
                      const visibilityPending = Object.prototype.hasOwnProperty.call(visibility, product.id)

                      return (
                        <li
                          key={product.id}
                          className={`${styles.existingItem} ${isDeleted || !visible ? styles.existingItemDeleted : ''}`}
                        >
                          <div className={styles.existingRow}>
                            <div className={styles.orderControls}>
                              <button
                                type="button"
                                className={styles.orderButton}
                                disabled={isDeleted || i === 0}
                                onClick={() => moveProduct(brand.id, product.id, 'up')}
                                aria-label="Yukarı taşı"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className={styles.orderButton}
                                disabled={isDeleted || i === ids.length - 1}
                                onClick={() => moveProduct(brand.id, product.id, 'down')}
                                aria-label="Aşağı taşı"
                              >
                                ↓
                              </button>
                            </div>
                            {display.image && <img src={display.image} alt="" className={styles.draftThumb} />}
                            <div className={styles.draftMeta}>
                              <span className={styles.draftName}>{display.name.tr}</span>
                              {patch && !isEditing && (
                                <span className={styles.pendingBadge}>Düzenleme bekliyor</span>
                              )}
                              {!visible && (
                                <span className={styles.pendingBadge}>
                                  {visibilityPending ? 'Gizlenecek' : 'Gizli'}
                                </span>
                              )}
                              {isDeleted && <span className={styles.pendingBadge}>Silinecek</span>}
                            </div>
                            <div className={styles.existingActions}>
                              {!isDeleted && (
                                <button
                                  type="button"
                                  className={styles.linkButton}
                                  onClick={() => toggleVisibility(product)}
                                >
                                  {visible ? 'Gizle' : 'Göster'}
                                </button>
                              )}
                              {!isDeleted && (
                                <button
                                  type="button"
                                  className={styles.linkButton}
                                  onClick={() => startEdit(product)}
                                >
                                  Düzenle
                                </button>
                              )}
                              {patch && !isDeleted && (
                                <button
                                  type="button"
                                  className={styles.linkButton}
                                  onClick={() => discardEditPatch(product.id)}
                                >
                                  Düzenlemeyi İptal Et
                                </button>
                              )}
                              <button
                                type="button"
                                className={styles.linkButton}
                                onClick={() => toggleDelete(product.id)}
                              >
                                {isDeleted ? 'Geri Al' : 'Sil'}
                              </button>
                            </div>
                          </div>

                          {isEditing && editForm && (
                    <div className={styles.editForm}>
                      <label className={styles.label}>
                        Marka / Kategori
                        <select
                          className={styles.input}
                          value={editForm.brandId}
                          onChange={(e) => setEditForm({ ...editForm, brandId: e.target.value })}
                        >
                          {brandOptions.map((b) => (
                            <option key={b.id} value={b.id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <LocalizedProductFields
                        name={editForm.name}
                        description={editForm.description}
                        onNameChange={(lang, value) =>
                          setEditForm({ ...editForm, name: { ...editForm.name, [lang]: value } })
                        }
                        onDescriptionChange={(lang, value) =>
                          setEditForm({ ...editForm, description: { ...editForm.description, [lang]: value } })
                        }
                      />

                      <label className={styles.label}>
                        Ürün Kodu (opsiyonel)
                        <input
                          className={styles.input}
                          value={editForm.code}
                          onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                        />
                      </label>

                      <label className={styles.label}>
                        Yeni Görsel (opsiyonel, boş bırakılırsa mevcut görsel korunur)
                        <input
                          type="file"
                          accept="image/*"
                          className={styles.input}
                          onChange={(e) => setEditImageFile(e.target.files?.[0] ?? null)}
                        />
                      </label>

                      {(editImagePreview || editForm.image) && (
                        <img src={editImagePreview || editForm.image} alt="" className={styles.preview} />
                      )}

                      {editError && <p className={styles.error}>{editError}</p>}

                      <div className={styles.existingActions}>
                        <button
                          type="button"
                          className={styles.primaryButton}
                          disabled={editUploading}
                          onClick={saveEdit}
                        >
                          {editUploading ? 'Yükleniyor...' : 'Değişikliği Kaydet'}
                        </button>
                        <button type="button" className={styles.linkButton} onClick={cancelEdit}>
                          İptal
                        </button>
                      </div>
                    </div>
                  )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })
          })()}
        </section>

        <section className={styles.draftSection}>
          {publishError && <p className={styles.error}>{publishError}</p>}
          {publishMessage && <p className={styles.success}>{publishMessage}</p>}

          <button
            type="button"
            className={styles.publishButton}
            disabled={pendingCount === 0 || publishing}
            onClick={handlePublish}
          >
            {publishing ? 'Yayınlanıyor...' : `Değişiklikleri Yayınla (${pendingCount})`}
          </button>
        </section>
      </div>
    </div>
  )
}
