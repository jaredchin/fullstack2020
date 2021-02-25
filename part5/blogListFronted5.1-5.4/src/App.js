import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogtitle, setBlogtitle] = useState('')
  const [blogauthor, setBlogauthor] = useState('')
  const [blogurl, setBlogurl] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: blogtitle,
        url: blogurl,
        author: blogauthor
      }
      const addReturn = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(addReturn))
      // setNotes(notes.concat(returnedNote)
      setBlogauthor('')
      setBlogtitle('')
      setBlogurl('')
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
    <form onSubmit={handleBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
                type="text"
                value={blogtitle}
                name="blogtitle"
                onChange={({ target }) => setBlogtitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
                type="text"
                value={blogauthor}
                name="blogauthor"
                onChange={({ target }) => setBlogauthor(target.value)}
        />
      </div>
                <div>
        url:
        <input
                type="text"
                value={blogurl}
                name="blogurl"
                onChange={({ target }) => setBlogurl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
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
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App