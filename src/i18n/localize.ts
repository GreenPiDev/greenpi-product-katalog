import type { Lang, LocalizedText } from './types'

export function pickLocalizedText(text: LocalizedText, lang: Lang): string {
  return text[lang]?.trim() ? text[lang] : text.tr
}
