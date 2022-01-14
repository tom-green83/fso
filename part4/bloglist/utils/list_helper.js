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

const favouriteBlog = (blogs) => {
  const reducer = (previousValue, currentValue) => {
    return currentValue.likes < previousValue.likes
      ? previousValue
      : currentValue
  }
  const nonEmptyFavourite = () => {
    const favourite = blogs.reduce(reducer)
    return {
      title: favourite.title,
      author: favourite.author,
      likes: favourite.likes 
    }
  }

  return blogs.length === 0
    ? {}
    : nonEmptyFavourite()
}

module.exports = {
  dummy, totalLikes, favouriteBlog
}
