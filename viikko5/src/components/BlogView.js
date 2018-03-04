import React from 'react'
import PropTypes from 'prop-types'

const BlogView = ({ blog, focus, addLike, deleteBlog, isOwner }) => (
  <div className="wrapper">
    <div onClick={() => focus(null)}><div>{blog.title} by {blog.author}</div></div>
    <div>{blog.url}</div>
    <div>{blog.likes} <button onClick={() => addLike(blog)}>like</button></div>
    <div>Added by: {blog.user ? blog.user.name : 'default'}</div>
    {isOwner && <div><button onClick={() => deleteBlog(blog)}>Delete</button></div>}
  </div>
)

BlogView.propTypes = {
  blog: PropTypes.object.isRequired,
  focus: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired
}

export default BlogView
