import React from 'react'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogView from './components/BlogView'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      blogFocus: null
    }
  }

  updateBlogs = () => {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: blogs.sort((a, b) => b.likes - a.likes), user: JSON.parse(localStorage.getItem('loggedInUser')) })
    ).then(na => {
      if (this.state.user)
        blogService.setToken(this.state.user.token)
    }).catch(err => err)
  }

  componentDidMount() {
    this.updateBlogs()
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  doError = (msg) => {
    this.setState({
      error: msg
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 4000)
  }

  login = (event) => {
    event.preventDefault()
    loginService.login({
      username: this.state.username,
      password: this.state.password
    }).then(user => {

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      this.setState({ username: '', password: '', user })

    }).catch(exception => {
      this.doError('Username or password invalid')
    })
  }

  logOut = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInUser')
    this.setState({ user: null })
  }

  addBlog = (blog) => {
    blogService
      .create(blog)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
        })
        this.doError('a new blog ' + newBlog.title + ' by ' + newBlog.author + ' added')
      })
      .then(na => this.updateBlogs())
      .catch(exception => this.doError('Error creating a blog'))
  }

  focus = (blog) => {
    this.setState({ blogFocus: blog })
  } 

  addLike = (blog) => {
    const { _id, user, ...rest } = blog
    blogService
      .update(_id, { ...rest, user: user._id, likes: blog.likes + 1 })
      .then(blog => {
        this.doError('Added a like')
        this.setState({
          blogFocus: blog,
          blogs: this.state.blogs.map(b => b._id === blog._id ? blog : b)
        })
      })
      .catch(exception => this.doError('Adding like failed'))
  }

  deleteBlog = (blog) => {
    if (window.confirm('Do you want to delete a blog ' + blog.title)) {
      blogService
        .remove(blog._id)
        .then(blog => {
          this.setState({
            blogs: this.state.blogs.filter(b => b._id !== blog._id),
            blogFocus: null
          })
          this.doError('Deleted a blog')
        })
        .catch(exception => this.doError('Failed deleting a blog'))
    }
  }

  render() {
    let rendering = []
    const add = (el) => (rendering = rendering.concat(el))

    if (this.state.error)
      add(<Notification message={this.state.error} />)

    if (!this.state.user)
      add(<LoginForm handleChange={this.handleLoginFieldChange} handleSubmit={this.login} username={this.state.username} password={this.state.password} />)
    else
      add(<BlogList blogs={this.state.blogs} user={this.state.user} logOut={this.logOut} addBlog={this.addBlog} focus={this.focus} />)

    if (this.state.blogFocus) {
      const blog = <BlogView blog={this.state.blogFocus} focus={this.focus} addLike={this.addLike} deleteBlog={this.deleteBlog} 
                    isOwner={!this.state.blogFocus.user || this.state.blogFocus.user.username === this.state.user.username} />
      if (this.state.error) rendering = [rendering[0], blog]
      else rendering = blog
    }

    return rendering
  }
}

export default App;
