import React from 'react'
import ReactDOM from 'react-dom'

const objectReducer = (obj, cb) => {
    return [...Object.keys(obj).reduce((acc, cur) => {
        return [...acc, cb(obj, cur)]
    }, [])]
}

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ name, handleClick }) =>
    <button onClick={handleClick(name)}>{name}</button>

const Feedback = ({ buttons, handleClick }) => {
    return objectReducer(buttons, (buttons, cur) => {
        return <Button key={cur} name={cur} handleClick={handleClick} />
    })
}

const Statistic = ({ name, value }) => 
    <tr>
        <td key={name}>{name}:</td> 
        <td key={value}>{value}</td>
    </tr>

const Statistics = ({ buttons, optionals, empty }) => {
    if (empty.flag) return <p>{empty.message}</p>

    const statistics =
        [...objectReducer(buttons, (buttons, cur) => {
            return <Statistic key={cur} 
                name={cur} value={buttons[cur].count} />
        }),
        ...objectReducer(optionals, (optionals, cur) => {
            return <Statistic key={cur} 
                name={cur} value={optionals[cur].getValue(buttons)} />
        })]

    return <table><tbody>{statistics}</tbody></table>
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            empty: {
                flag: true,
                message: 'yhtään palautetta ei ole annettu',
            },
            buttons: {
                'hyvä': {
                    count: 0,
                    weight: 1
                },
                'neutraali': {
                    count: 0,
                    weight: 0
                },
                'huono': {
                    count: 0,
                    weight: -1,
                }
            },
            optionals: {
                'keskiarvo': {
                    getValue: this.average,
                    'positiivisia': {
                        getValue: this.positive
                    }
                }
            }
        }
    }

    increment = (button) => () => {
        this.setState((prevState) => ({
            empty: {
                ...prevState.empty,
                flag: false
            },
            buttons: {
                ...prevState.buttons,
                [button]: {
                    count: prevState.buttons[button].count + 1,
                    weight: prevState.buttons[button].weight
                }
            }
        }))
    }

    mapButtons = (fn, cb) => (buttons) => {
        let count = 0
        const sum = Object.keys(buttons).reduce((acc, cur) => {
            const button = buttons[cur]
            count += button.count
            return acc + fn(button)
        }, 0) 
        return cb(sum, count)
    }

    average = this.mapButtons((button) => {
        return button.count * button.weight
    }, (sum, count) => {
        return count > 0 ? sum / count : 0
    })

    positive = this.mapButtons((button) => {
        const isPos = button.weight > 0 ? 1 : 0
        return button.count * button.weight * isPos
    }, (sum, count) => {
        if (count === 0) count = 1
        return sum / count * 100 + ' %'
    })

    render() {
        const buttons = this.state.buttons
        const optionals = this.state.optionals
        const empty = this.state.empty

        return (
            <div>
                <Title title="Anna palautetta" />
                <Feedback buttons={buttons} 
                    handleClick={this.increment.bind(this)} />
                <Title title="Statistiikka" />
                <Statistics empty={empty}
                    buttons={buttons} 
                    optionals={optionals} />
                <Anecdotes />
            </div>
        )
    }
}

class Anecdotes extends React.Component {
    constructor() {
        super()
        this.state = {
            text: this.getAnecdote(),
            votes: {}
        }
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
        return anecdotes[Math.floor(Math.random() * anecdotes.length)]
    }

    handleClick = (button) => () => {
        if (button === 'vote') {
            const votes = this.state.votes[this.state.text] || 0
            this.setState((prevState) => ({
                ...prevState,
                votes: {
                    ...prevState.votes,
                    [this.state.text]: votes + 1
                }
            }))
        } else {
            this.setState((prevState) => ({
                ...prevState,
                text: this.getAnecdote()
            }))
        }
    }

    getMost() {
        const votes = this.state.votes
        if (votes.length === 0) return 'You haven\'t voted yet'
        return Object.keys(votes).sort((l,r) => {
            return votes[l]-votes[r]
        })[0]
    }

    render() {
        const buttons = {
            'vote': 0,
            'next anecdote': 0
        }
        const mostText = 'anecdote with most votes'

        return (
            <div>
                <Title key={'anecdote'} title={this.state.text} />
                <Feedback buttons={buttons}
                        handleClick={this.handleClick.bind(this)} />
                <Title key={'most'} title={mostText} />
                <p>{this.getMost()}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
