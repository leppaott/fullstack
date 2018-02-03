import axios from 'axios'
const baseUrl = '/api/persons'

const toData = response => response.data

const getAll = () => {
    return axios.get(baseUrl).then(toData)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(toData)
}

const update = (object) => {
    return axios.put(`${baseUrl}/${object.id}`, object).then(toData)
}

const remove = (object) => {
    return axios.delete(`${baseUrl}/${object.id}`).then(toData)
}


export default { getAll, create, update, remove }
