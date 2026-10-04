/**
 * `public/` içindeki kök-göreli yolları (ör. '/logos/te.png') Vite'ın yapılandırılmış
 * `base` değeriyle (vite.config.ts → '/product-catalog/') birleştirir. Cloudinary gibi
 * mutlak http(s) URL'lere dokunmaz.
 */
export function assetUrl(path?: string): string | undefined {
  if (!path) return path
  if (/^https?:\/\//i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
