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

  const { token, products } = req.body ?? {}

  if (!verifyToken(token, adminSecret)) {
    res.status(401).json({ error: 'yetkisiz veya süresi dolmuş oturum' })
    return
  }

  if (!Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: 'yayınlanacak ürün yok' })
    return
  }

  for (const p of products) {
    if (!p || typeof p.brandId !== 'string' || typeof p.name !== 'string' || typeof p.description !== 'string') {
      res.status(400).json({ error: 'geçersiz ürün verisi' })
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
    const currentProducts = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'))

    const timestamp = Date.now()
    const newProducts = products.map((p, i) => ({
      id: `user-${timestamp}-${i}`,
      brandId: p.brandId,
      name: p.name,
      description: p.description,
      ...(p.code ? { code: p.code } : {}),
      ...(p.image ? { image: p.image } : {}),
    }))

    const updatedProducts = [...currentProducts, ...newProducts]
    const newContent = Buffer.from(JSON.stringify(updatedProducts, null, 2) + '\n').toString('base64')

    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${DATA_PATH}`,
      {
        method: 'PUT',
        headers: ghHeaders,
        body: JSON.stringify({
          message: `Katalog: ${newProducts.length} yeni ürün eklendi`,
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

    res.status(200).json({ ok: true, added: newProducts.length })
  } catch (err) {
    res.status(500).json({ error: 'beklenmeyen hata', detail: String(err) })
  }
}
