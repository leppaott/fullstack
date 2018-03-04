import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')

describe.only('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('renders login form if no user', () => {
      app.update()

      const login = app.find('.loginForm')
      expect(login.text()).toContain('kirjaudu')
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('renders list if user is logged in', () => {
      app.update()

      const login = app.find('.blogList')
      expect(login.text()).toContain('Log out')
    })
  })
})
