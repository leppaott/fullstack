import React from 'react'
import Blog from './Blog'
import BlogCreate from './BlogCreate'

const BlogList = ({ blogs, user, logOut, addBlog, focus }) => (
  <div className="blogList">
    <h2>blogs</h2>
    <p>{user.name} logged in <button onClick={logOut}>Log out</button></p>
    <BlogCreate addBlog={addBlog} />
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog key={blog._id} blog={blog} onClick={() => focus(blog)} />
    )}
  </div>
)

export default BlogList
