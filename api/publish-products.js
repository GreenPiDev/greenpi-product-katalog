import crypto from 'node:crypto'

const GITHUB_OWNER = 'GreenPiDev'
const GITHUB_REPO = 'greenpi-product-katalog'
const GITHUB_BRANCH = 'main'
const DATA_PATH = 'src/data/userProducts.json'

function verifyToken(token, secret) {
  if (typeof token !== 'string') return false
  const [payload, signature] = token.split('.')
  if (!payload || !signature) return false

  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false

  return Number(payload) > Date.now()
}

function applyUpdate(product, patch) {
  const next = { ...product }
  if (typeof patch.brandId === 'string' && patch.brandId) next.brandId = patch.brandId
  if (typeof patch.name === 'string' && patch.name.trim()) next.name = patch.name.trim()
  if (typeof patch.description === 'string' && patch.description.trim()) {
    next.description = patch.description.trim()
  }
  if (typeof patch.code === 'string') {
    if (patch.code.trim()) next.code = patch.code.trim()
    else delete next.code
  }
  if (typeof patch.image === 'string' && patch.image.trim()) next.image = patch.image.trim()
  return next
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const adminSecret = process.env.ADMIN_PASSWORD
  const ghToken = process.env.GH_ADMIN_TOKEN

  if (!adminSecret || !ghToken) {
    res.status(500).json({ error: 'sunucu env değişkenleri eksik' })
    return
  }

  const { token, create = [], update = [], delete: deleteIds = [] } = req.body ?? {}

  if (!verifyToken(token, adminSecret)) {
    res.status(401).json({ error: 'yetkisiz veya süresi dolmuş oturum' })
    return
  }

  if (!Array.isArray(create) || !Array.isArray(update) || !Array.isArray(deleteIds)) {
    res.status(400).json({ error: 'geçersiz istek biçimi' })
    return
  }

  if (create.length === 0 && update.length === 0 && deleteIds.length === 0) {
    res.status(400).json({ error: 'yayınlanacak değişiklik yok' })
    return
  }

  for (const p of create) {
    if (!p || typeof p.brandId !== 'string' || typeof p.name !== 'string' || typeof p.description !== 'string') {
      res.status(400).json({ error: 'geçersiz yeni ürün verisi' })
      return
    }
  }

  for (const p of update) {
    if (!p || typeof p.id !== 'string') {
      res.status(400).json({ error: 'geçersiz düzenleme verisi' })
      return
    }
  }

  const ghHeaders = {
    Authorization: `Bearer ${ghToken}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'greenpi-katalog-admin',
    'Content-Type': 'application/json',
  }

  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_PATH}?ref=${GITHUB_BRANCH}`,
      { headers: ghHeaders },
    )

    if (!getRes.ok) {
      const detail = await getRes.text()
      res.status(502).json({ error: 'github okuma hatası', detail })
      return
    }

    const fileData = await getRes.json()
    let products = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'))

    if (deleteIds.length > 0) {
      const deleteSet = new Set(deleteIds)
      products = products.filter((p) => !deleteSet.has(p.id))
    }

    if (update.length > 0) {
      const updateMap = new Map(update.map((p) => [p.id, p]))
      products = products.map((p) => {
        const patch = updateMap.get(p.id)
        return patch ? applyUpdate(p, patch) : p
      })
    }

    const timestamp = Date.now()
    const newProducts = create.map((p, i) => ({
      id: `user-${timestamp}-${i}`,
      brandId: p.brandId,
      name: p.name,
      description: p.description,
      ...(p.code ? { code: p.code } : {}),
      ...(p.image ? { image: p.image } : {}),
    }))

    products = [...products, ...newProducts]

    const newContent = Buffer.from(JSON.stringify(products, null, 2) + '\n').toString('base64')

    const messageParts = []
    if (newProducts.length) messageParts.push(`${newProducts.length} eklendi`)
    if (update.length) messageParts.push(`${update.length} düzenlendi`)
    if (deleteIds.length) messageParts.push(`${deleteIds.length} silindi`)

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_PATH}`,
      {
        method: 'PUT',
        headers: ghHeaders,
        body: JSON.stringify({
          message: `Katalog: ${messageParts.join(', ')}`,
          content: newContent,
          sha: fileData.sha,
          branch: GITHUB_BRANCH,
        }),
      },
    )

    if (!putRes.ok) {
      const detail = await putRes.text()
      res.status(502).json({ error: 'github yazma hatası', detail })
      return
    }

    res.status(200).json({
      ok: true,
      created: newProducts.length,
      updated: update.length,
      deleted: deleteIds.length,
    })
  } catch (err) {
    res.status(500).json({ error: 'beklenmeyen hata', detail: String(err) })
  }
}
