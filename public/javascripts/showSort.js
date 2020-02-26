function showSort(sortField, sortOrder) {

  if (sortField === 'rating') {
    if (sortOrder === 'desc') {
      return 'Sort by Rating: High to Low'
    } else if (sortOrder === 'asc') {
      return 'Sort by Rating: Low to High'
    }
  } else if (sortField === 'updated_time') {
    if (sortOrder === 'desc') {
      return 'Sort by Updated time: New to Old'
    } else if (sortOrder === 'asc') {
      return 'Sort by Updated time: Old to New'
    }
  }

  return undefined

}

module.exports = showSort
