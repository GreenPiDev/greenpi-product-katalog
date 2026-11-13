/** Sertifika standart numaraları. Standart adları `i18n/translations.ts` içinde `certificates.standardNames` ile aynı sırada tutulur. */
export const certificateStandards = ['9001', '45001', '14001', '27001', '50001', '22301', '20000-1'] as const

export type CertificateStandard = (typeof certificateStandards)[number]

export const certificateLogo = '/logos/iso-logo.png'

/** Drawer'da gösterilen tam çözünürlüklü sertifika görseli. */
export function certificateImage(code: CertificateStandard): string {
  return `/certificates/iso-${code}.webp`
}

/** Kartlarda kullanılan küçük önizleme (640px genişlik). */
export function certificateThumb(code: CertificateStandard): string {
  return `/certificates/thumbs/iso-${code}.webp`
}
