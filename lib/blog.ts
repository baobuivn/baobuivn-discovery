export function sortPostsByOrder(posts) {
  return [...posts].sort((a, b) => {
    const aOrder = typeof a.order === 'number' ? a.order : Number.MAX_SAFE_INTEGER
    const bOrder = typeof b.order === 'number' ? b.order : Number.MAX_SAFE_INTEGER

    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}
