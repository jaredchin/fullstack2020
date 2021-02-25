import React, { useState } from 'react'

const Blog = ({ blog,likeBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const hidewhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    const newObject = {
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      id: blog.id
    }
    const returndata = await likeBlog(newObject)
    setLikes(returndata.likes)
    console.log(returndata.likes)
    console.log(likes)
  }

  const delteBlog = () => {
    if (window.confirm(`Remove Blog You're NOT gonna need it! by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hidewhenVisible}>
        {blog.title} <button onClick={() => setVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={() => setVisible(false)}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={addLike}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={delteBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
