import PropTypes from 'prop-types'
import React from 'react'
import { actionCreator } from '../reducers/reducer'
import { connect } from 'react-redux'
import Filter from './Filter'
import AnecdoteForm from './AnecdoteForm'

class AnecdoteList extends React.Component {

  handleVote = (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.notify('You voted: \'' + anecdote.content + '\'')
  }

  render() {
    const anecdotes = this.props.anecdotes.filter(a => a.content.toLowerCase().includes(this.props.filter.toLowerCase()))

    return (
      <div>
        <Filter />
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleVote(anecdote)}>vote</button>
            </div>
          </div>)}
        <AnecdoteForm />
      </div>)
  }
}

AnecdoteList.contextTypes = {
  store: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  createAnecdote: (anecdote) => actionCreator('CREATE', anecdote),
  voteAnecdote: (anecdote) => actionCreator('VOTE', anecdote),
  notify: (text) => actionCreator('NOTIFICATION', text)
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
