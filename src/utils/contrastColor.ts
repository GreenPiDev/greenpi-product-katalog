type RGB = [number, number, number]

function hexToRgb(hex: string): RGB {
  const normalized = hex.replace('#', '')
  const full = normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized
  const num = parseInt(full, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function relativeLuminance([r, g, b]: RGB): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

function toHex([r, g, b]: RGB): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`
}

/**
 * Bir arkaplan rengine göre okunabilir, WCAG kontrastına uygun bir metin rengi üretir.
 * Saf siyah/beyaz yerine arkaplanın tonuna hafifçe yaklaştırılmış (tint) bir sonuç döner.
 */
export function getContrastText(backgroundColor: string): string {
  const bg = hexToRgb(backgroundColor)
  const luminance = relativeLuminance(bg)
  const isLightBg = luminance > 0.5
  const target: RGB = isLightBg ? [12, 10, 8] : [255, 252, 247]
  const t = isLightBg ? 0.88 : 0.93
  return toHex(mix(bg, target, t))
}
