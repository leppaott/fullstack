import React from 'react'
import PropTypes from 'prop-types'
import { notify } from './reducers/reducer'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.context.store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const store = this.context.store
    const dispatch = (action) => store.dispatch(action)

    const { notification } = store.getState()
    
    if (notification) {
      setTimeout(() => dispatch(notify(null)), 5000)
    }

    return (
      <div>
        <Notification />
        <AnecdoteList />
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App
