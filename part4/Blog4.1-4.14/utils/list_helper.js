const dummy = (blogs) => {

  return 1
}

const totalLikes = (blogs) => {
  const totallikes = 0
  return blogs.reduce((totallikes, item) => totallikes + item.likes, 0) 
}

const favoriteBlog = (blogs) => {
  
}

module.exports = {
  dummy,
  totalLikes
}