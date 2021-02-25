import React, {useState} from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [blogtitle, setBlogtitle] = useState('')
  const [blogauthor, setBlogauthor] = useState('')
  const [blogurl, setBlogurl] = useState('')

  const handleTitleChange = (event) => {
    setBlogtitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogurl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setBlogauthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogtitle,
      url: blogurl,
      author: blogauthor
    })

    setBlogauthor('')
    setBlogtitle('')
    setBlogurl('')
  }
  
  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
                  type="text"
                  value={blogtitle}
                  name="blogtitle"
                  onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
                  type="text"
                  value={blogauthor}
                  name="blogauthor"
                  onChange={handleAuthorChange}
          />
        </div>
                  <div>
          url:
          <input
                  type="text"
                  value={blogurl}
                  name="blogurl"
                  onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

  

export default BlogForm