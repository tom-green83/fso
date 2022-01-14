const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const initialValue = 0
  const reducer = (previousValue, currentValue) => previousValue + currentValue.likes
  return blogs.length === 0
    ? 0
    :blogs.reduce(reducer, initialValue)
}

module.exports = {
  dummy, totalLikes
}
