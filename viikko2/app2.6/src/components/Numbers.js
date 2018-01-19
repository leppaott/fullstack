import React from 'react'
import personService from '../services/persons'

class Numbers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: props.persons,
            filter: props.filter,
            onRemove: props.onRemove
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            persons: nextProps.persons,
            filter: nextProps.filter,
        })
    }

    handleClick = (e, person) => {
        e.preventDefault()
        if (window.confirm(`Poistetaanko ${person.name}?`))
            personService.remove(person)
                .then(() => this.state.onRemove())
    }

    render() {
        const { persons, filter } = this.state

        return [
            <h2 key='number title'>Numerot</h2>,
            <table key='numbers'><tbody>{
                persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
                    .map(person =>
                        <tr key={person.name}>
                            <td width='100'>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={(e) => this.handleClick(e, person)}>poista</button></td>
                        </tr>)}
            </tbody></table>
        ]
    }
}

export default Numbers