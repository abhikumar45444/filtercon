export const getAssetUrl = (file) => {
  if (!file) return ''
  const base = import.meta.env.BASE_URL || '/'
  const clean = file.startsWith('/') ? file.slice(1) : file
  return `${base}${clean}`
}
