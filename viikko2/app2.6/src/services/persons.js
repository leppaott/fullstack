import axios from 'axios'

if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

const baseUrl = process.env.MONGODB_URI || '/api/persons/'

const toData = response => response.data

const getAll = () => {
    return axios.get(baseUrl).then(toData)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(toData)
}

const update = (object) => {
    return axios.put(`${baseUrl}${object.id}`, object).then(toData)
}

const remove = (object) => {
    return axios.delete(`${baseUrl}${object.id}`).then(toData)
}


export default { getAll, create, update, remove }
