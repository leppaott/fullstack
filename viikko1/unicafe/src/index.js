import React from 'react'
import ReactDOM from 'react-dom'
import {Title, Feedback, Statistics} from './stateless'
import Anecdotes from './anecdotes'

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
                },
                'positiivisia': {
                    getValue: this.positive
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

    reduceButtons = (fn, cb) => (buttons) => {
        let count = 0
        const sum = Object.keys(buttons).reduce((acc, cur) => {
            const button = buttons[cur]
            count += button.count
            return acc + fn(button)
        }, 0) 
        return cb(sum, count)
    }

    average = this.reduceButtons((button) => {
        return button.count * button.weight
    }, (sum, count) => {
        return count > 0 ? sum / count : 0
    })

    positive = this.reduceButtons((button) => {
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

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
