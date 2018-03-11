import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import App from './App' // eslint-disable-line no-unused-vars
import { reducer } from './reducers/reducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = createStore(combineReducers({
  anecdotes: reducer,
  notification: notificationReducer,
  filter: filterReducer
}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
