let token = null

const initialBlogs = [{
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
}]

const getAll = () => {
  return Promise.resolve(initialBlogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
