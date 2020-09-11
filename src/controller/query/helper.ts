const sortQuery = (sortBy, order) => {
  if (sortBy === 'email')
    return { email: order };
  else if (sortBy === 'name')
    return { name: order };
  else
    return { updatedAt: order };
}

const searchQuery = (search) => {
  if (search === undefined)
    return {};
  else
    return { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] };
}

export { searchQuery, sortQuery };
