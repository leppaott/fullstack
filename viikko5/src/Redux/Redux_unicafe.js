import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const dispatch = (msg) => () => store.dispatch({ type: msg })

const Statistiikka = () => {
  const palautteita = (() => {
    const {bad, ok, good} = store.getState()
    return bad + ok + good
  })()

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  const positive = () => {
    const state = store.getState()
    return state.good
  }

  const average = () => {
    const state = store.getState()
    return (state.good - state.bad) / (state.good + state.ok + state.bad)
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{average()}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positive()}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={dispatch('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={dispatch('GOOD')}>hyvä</button>
        <button onClick={dispatch('OK')}>neutraali</button>
        <button onClick={dispatch('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
store.subscribe(renderApp)

export default App
