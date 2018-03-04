import React from 'react'
const Blog = ({ blog, onClick }) => (
  <div className="wrapper" onClick={onClick}>
    {blog.title} {blog.author}
  </div>  
)

export default Blog
