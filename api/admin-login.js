import crypto from 'node:crypto'

const TOKEN_TTL_MS = 1000 * 60 * 60 * 6 // 6 saat

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }

  const secret = process.env.ADMIN_PASSWORD
  if (!secret) {
    res.status(500).json({ error: 'ADMIN_PASSWORD env değişkeni tanımlı değil' })
    return
  }

  const { password } = req.body ?? {}

  if (typeof password !== 'string' || password.length === 0) {
    res.status(400).json({ error: 'şifre gerekli' })
    return
  }

  const a = Buffer.from(password)
  const b = Buffer.from(secret)
  const isMatch = a.length === b.length && crypto.timingSafeEqual(a, b)

  if (!isMatch) {
    res.status(401).json({ error: 'şifre hatalı' })
    return
  }

  const expires = Date.now() + TOKEN_TTL_MS
  const payload = String(expires)
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex')

  res.status(200).json({ token: `${payload}.${signature}` })
}
