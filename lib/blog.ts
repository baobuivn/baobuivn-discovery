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

export function sortPostsByDate(posts) {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function sortPostsBySeriesOrder(posts) {
  return [...posts].sort((a, b) => {
    const aOrder = typeof a.seriesOrder === 'number' ? a.seriesOrder : Number.MAX_SAFE_INTEGER
    const bOrder = typeof b.seriesOrder === 'number' ? b.seriesOrder : Number.MAX_SAFE_INTEGER

    if (aOrder !== bOrder) {
      return aOrder - bOrder
    }

    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
}
