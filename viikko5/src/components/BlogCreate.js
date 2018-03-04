import React from 'react'

class BlogCreate extends React.Component {
  constructor(props) {
    super(props)
    this.addBlog = props.addBlog
    this.state = {
      title: '',
      author: '',
      url: '',
      visible: false
    }
  }

  handle = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    this.setState({ title: '', author: '', url: '' })
    this.addBlog(blog)
  }

  toggleVisiblity = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const visible = this.state.visible
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
      <div>
        <button onClick={this.toggleVisiblity}>{!visible ? 'Create a blog' : 'Hide'}</button>
        <div style={showWhenVisible}>
          <h2>Create new</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              title
          <input
                value={this.state.title}
                onChange={this.handle}
                name="title"
              />
            </div>
            <div>
              author
          <input
                name="author"
                value={this.state.author}
                onChange={this.handle}
              />
            </div>
            <div>
              url
          <input
                name="url"
                value={this.state.url}
                onChange={this.handle}
              />
            </div>
            <button type="submit">create</button>
          </form>
        </div>
      </div>)
  }
}

export default BlogCreate
