import React from 'react';

class App extends React.Component {
  render() {
    const store = this.props.store
    const dispatch = (type, data) => store.dispatch({ type, data })
    const handle = (e) => {
      e.preventDefault();
      dispatch('CREATE', this.refs.createRef.value)
      this.refs.createRef.value = ''
    }
    const anecdotes = store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch('VOTE', anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={handle}>
          <div><input type="text" name="name" ref="createRef"/></div>
           <input type="submit" value="Create" />
        </form>
      </div>
    )
  }
}

export default App
