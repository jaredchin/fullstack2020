import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()
  // const [createVisible, setCreateVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes ) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='note') =>{
    setNotification({ message, type})
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('username or password is not valid', 'error')
    }
    console.log('logging in with', username, password)
  }

  const handleBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const addReturn = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(addReturn))
      // setNotes(notes.concat(returnedNote)
      notifyWith('success added new blog list')
    } catch (exception) {
      notifyWith('error happened','error')
    }
  }

  const hanleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <div>
        username
        <input 
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new bloglist" ref={blogFormRef}>
      <BlogForm
        createBlog={handleBlog}
      />
    </Togglable>
  )
  
  return (
    <div>
      {user === null ? 
        loginForm() :
        <div>
          <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <p>{user.name} logged in <button onClick={hanleLogout}>logout</button></p>
          </div>
          {blogForm()}
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} likeBlog={blogService.likeBlog} removeBlog={blogService.removeBlog}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App