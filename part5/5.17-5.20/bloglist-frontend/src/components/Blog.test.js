import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', ()=> {
  const blog = {
    title: "Commponent testing is done",
    author: "Tim Tan",
    url: "http://www.google.com/blog.html",
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Commponent testing is done'
  )
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: "Commponent testing is done",
    author: "Tim Tan",
    url: "http://www.google.com/blog.html",
    likes: 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  // component.debug()

  expect(component.container).toHaveTextContent(
    'http://www.google.com/blog.html'
  )

  // expect(mockHandler.mock.calls).toHaveLength(1)

})

test('clicking like button twice', () => {
  const blog = {
    title: "Commponent testing is done",
    author: "Tim Tan",
    url: "http://www.google.com/blog.html",
    likes: 0
  }
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} likeBlog={mockHandler}/>
  )
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})