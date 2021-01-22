const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('if id is exist', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(r => expect(r.id).toBeDefined())
})

test('all blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog added success', async () => {
  const newBlog = {
    title: "test add a new blog",
    author: "Constance Chin",
    url: "http://zdchin.com/12345.html",
    likes: 1200000000
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsEnd = await helper.blogsInDb()
  expect(blogsEnd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsEnd.map(blog => blog.title)
  expect(titles).toContain('test add a new blog')
})

test('default likes is 0', async () => {
  const newBlog = {
    title: "test add a new blog and default likes is 0",
    author: "Constance Chin",
    url: "http://zdchin.com/12345.html",
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  const blogsEnd = await helper.blogsInDb()
  expect(blogsEnd[blogsEnd.length - 1].likes).toBe(0)
})

test('blog without title or url is not added', async () => {
  const newBlogWithoutTitle = {
    author: "Constance Chin",
    url: "http://zdchin.com/12345.html",
    likes: 1200000000
  }
  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
  const blogsnow = await helper.blogsInDb()
  expect(blogsnow).toHaveLength(helper.initialBlogs.length)

  const newBlogWithoutUrl = {
    title: "test add a new blog",
    author: "Constance Chin",
    likes: 1200000000
  }
  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
  const blogsEnd = await helper.blogsInDb()
  expect(blogsEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

