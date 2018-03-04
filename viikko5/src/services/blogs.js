import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const toData = (r) => r.data

const getAll = async () => {
  return toData(await axios.get(baseUrl))
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }

  return toData(await axios.post(baseUrl, newObject, config))
}

const update = async (id, newObject) => {
  return toData(await axios.put(`${baseUrl}/${id}`, newObject))
}

const remove = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  return toData(await axios.delete(`${baseUrl}/${id}`, config))
}


export default { getAll, create, update, setToken, remove }
