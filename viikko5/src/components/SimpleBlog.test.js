import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders title, author, likes', () => {
    const blog = {
      title: "Long Journey",
      author: "Jack Daniels",
      likes: 26,
    }

    const simpleBlog = shallow(<SimpleBlog blog={blog} onClick={null} />)
    const contentDiv = simpleBlog.find('.wrapper')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('like button calls click handler', () => {
    const blog = {
      title: "Long Journey",
      author: "Jack Daniels",
      likes: 26,
    }

    const onClick = jest.fn()
    const simpleBlog = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    
    const button = simpleBlog.find('button')
    button.simulate('click')
    button.simulate('click')
    
    expect(onClick.mock.calls.length).toBe(2)
  })
})
