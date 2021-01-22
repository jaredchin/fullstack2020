const blogsRouter = require('express').Router()

const { request, response } = require('express')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // if (blog.likes === undefined) {
  //   blog.likes = 0
  // }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })
  const result = await blog.save()
  response.json(result)
  // blog
  //   .save()
  //   .then(result => {
  //     response.json(result)
  //   })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
