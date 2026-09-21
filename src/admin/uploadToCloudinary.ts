export async function uploadImage(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  const env = import.meta.env.VITE_CLOUDINARY_ENV === 'production' ? 'production' : 'development'

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary yapılandırması eksik (VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET)')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)
  formData.append('folder', `greenpi-product-katalog/${env}`)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Görsel Cloudinary’e yüklenemedi')
  }

  const data = await res.json()
  return data.secure_url as string
}
