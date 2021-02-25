import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token},
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const addBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const likeBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  return response.data
}

const removeBlog = async (id) => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

export default { getAll, setToken, addBlog, likeBlog, removeBlog }