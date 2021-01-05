import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getall_persons =  () => {
  console.log(baseUrl)
  return axios.get(baseUrl)
}

const add_person = newObect => {
  return axios.post(baseUrl, newObect)
}

const update_person = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const delete_person = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {getall_persons, add_person, update_person, delete_person}