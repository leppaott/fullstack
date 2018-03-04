import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import BlogView from './BlogView'


describe('<Blog />', () => {
  it('renders only title and author', () => {
    const blog = {
      title: "Long Journey",
      author: "Jack Daniels",
      url: "http://",
      likes: 26,
    }

    const component = shallow(<Blog blog={blog} onClick={null} />)
    const contentDiv = component.find('.wrapper')
    
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).not.toContain(blog.likes)
    expect(contentDiv.text()).not.toContain(blog.url)
  })


  it('renders details after click', () => {
    const blog = {
      title: "Long Journey",
      author: "Jack Daniels",
      url: "http://",
      likes: 26,
    }
    const onClick = jest.fn()
    const component = shallow(<Blog blog={blog} onClick={onClick} />)
    
    component.find('.wrapper').simulate('click')
    expect(onClick.mock.calls.length).toBe(1)

    const view = shallow(<BlogView blog={blog} focus={onClick} addLike={onClick} deleteBlog={onClick} isOwner={false} />)

    const contentDiv = view.find('.wrapper')
    
    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
    expect(contentDiv.text()).toContain(blog.url)
  })
})
