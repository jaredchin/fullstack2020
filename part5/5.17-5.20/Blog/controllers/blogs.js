const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const { compareSync } = require('bcrypt')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  // if (blog.likes === undefined) {
  //   blog.likes = 0
  // }
  //const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  const saveBlog = await blog.save()
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()
  console.log(saveBlog)
  response.json(saveBlog)
  // blog
  //   .save()
  //   .then(result => {
  //     response.json(result)
  //   })
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user_client = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (user_client._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } 
  // else {
  //   response.status(400).json({error: 'invalid user info'})
  // }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updateBlog)
})



module.exports = blogsRouter
