import React from 'react'
import {Title, Feedback} from './stateless'

class Anecdotes extends React.Component {
    constructor() {
        super()
        this.state = {
            text: '',
            votes: {}
        }
        this.state.text = this.getAnecdote()
    }

    getAnecdote = () => {
        const anecdotes = [
            'If it hurts, do it more often',
            'Adding manpower to a late software project makes it later!',
            'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
            'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
            'Premature optimization is the root of all evil.',
            'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
          ]
        const anecdote = anecdotes[Math.floor(Math.random() * anecdotes.length)]
        return anecdote !== this.state.text ? anecdote : this.getAnecdote()
    }

    handleClick = (button) => () => {
        if (button === 'vote') {
            const votes = this.getVoteCount(this.state.text)
            this.setState((prevState) => ({
                ...prevState,
                votes: {
                    ...prevState.votes,
                    [this.state.text]: votes + 1
                }
            }))
        } else { // next
            this.setState((prevState) => ({
                ...prevState,
                text: this.getAnecdote()
            }))
        }
    }

    getMost() {
        const votes = this.state.votes
        if (votes.length === 0) return 'You haven\'t voted yet'
        return Object.keys(votes).sort((l, r) => {
            return votes[r] - votes[l]
        })[0]
    }

    getVoteCount(anec) {
        return this.state.votes[anec] || 0
    }

    getVoteCounter(anec) {
        return <p>{`has ${this.getVoteCount(anec)} votes`}</p>
    }

    render() {
        const buttons = {
            'vote': 0,
            'next anecdote': 0
        }
        const mostText = 'Anecdote with most votes:'

        return (
            <div>
                <Title key={'anecdote'} title={this.state.text} />
                {this.getVoteCounter(this.state.text)}
                <Feedback buttons={buttons}
                        handleClick={this.handleClick.bind(this)} />
                <Title key={'most'} title={mostText} />
                <p>{this.getMost()}</p>
                {this.getVoteCounter(this.getMost())}
            </div>
        )
    }
}

export default Anecdotes