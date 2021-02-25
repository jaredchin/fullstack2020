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

export default { getAll, setToken, addBlog }