/**
 * Cloudinary teslim dönüşümü: tarayıcının desteklediği en verimli formatı (AVIF/WebP)
 * kaliteyi koruyan otomatik sıkıştırmayla sunar; görseli en fazla 1400px genişliğe
 * indirir (daha küçükse büyütmez). Orijinal dosya Cloudinary'de olduğu gibi kalır.
 */
const CLOUDINARY_TRANSFORM = 'f_auto,q_auto:good,w_1400,c_limit'

function optimizeCloudinary(url: string): string {
  const marker = '/image/upload/'
  const i = url.indexOf(marker)
  if (i === -1) return url
  const rest = url.slice(i + marker.length)
  // Zaten dönüşüm içeren URL'lere dokunma (ör. ".../upload/f_auto,.../v123/...")
  if (!/^v\d+\//.test(rest) && rest.split('/')[0].includes('_')) return url
  return `${url.slice(0, i + marker.length)}${CLOUDINARY_TRANSFORM}/${rest}`
}

/**
 * `public/` içindeki kök-göreli yolları (ör. '/logos/te.png') Vite'ın yapılandırılmış
 * `base` değeriyle (vite.config.ts → '/product-catalog/') birleştirir. Cloudinary
 * URL'lerine otomatik format/kalite dönüşümü ekler; diğer mutlak URL'lere dokunmaz.
 */
export function assetUrl(path?: string): string | undefined {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) {
    return path.includes('res.cloudinary.com') ? optimizeCloudinary(path) : path
  }
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
