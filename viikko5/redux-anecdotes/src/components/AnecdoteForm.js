import React from 'react'
import { actionCreator } from '../reducers/reducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {

  handleCreate = (e) => {
    e.preventDefault()
    this.props.createAnecdote(e.target.anecdote.value)
    this.props.notify('You created: \'' + e.target.anecdote.value + '\'')
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleCreate}>
          <input type="text" name="anecdote" />
          <button>Create</button>
        </form>
      </div>)
  }
}

const mapDispatchToProps = {
  createAnecdote: (anecdote) => actionCreator('CREATE', anecdote),
  notify: (text) => actionCreator('NOTIFICATION', text)
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
