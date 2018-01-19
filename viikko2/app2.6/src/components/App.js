import React from 'react';
import Numbers from './Numbers'
import PersonForm from './PersonForm'
import Filtering from './Filtering'
import Notification from './Notification'
import personService from '../services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.error !== '') {
      setTimeout(() => {
        this.setState({ error: '' })
      }, 4000)
    }
  }

  componentWillMount() {
    personService.getAll()
      .then(persons => this.setState({ persons }))
  }

  updatePhone = (person) => {
    const updated = { ...person, number: this.state.newNumber }
    personService.update(updated)
      .catch(() => personService.create(updated))

    this.setState({
      newName: '', newNumber: '',
      persons: this.state.persons.map(p => p.id !== updated.id ? p : updated),
      error: 'Muutettiin numeroa'
    })
  }

  addPerson = (e) => {
    e.preventDefault()
    const existing = this.state.persons.find(p => p.name === this.state.newName)
    if (existing && 
        window.confirm(existing.name + ' on jo luettelossa, korvataanko vanha numero uudella?')) {
      
      return this.updatePhone(existing)
    }

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.newName
    }

    this.setState((prevState) => ({
      persons: [
        ...prevState.persons,
        newPerson,
      ],
      newName: '',
      newNumber: '',
    }))

    personService.create(newPerson)
      .then(personWithId =>
        this.setState({
          persons: this.state.persons.map(p =>
            p.id !== newPerson.name ? p : personWithId),
          error: 'Lisättiin ' + newPerson.name 
        }))
  }

  handleChange = (property) => (e) => {
    this.setState({ [property]: e.target.value })
  }

  onRemove = () => {
    this.componentWillMount()
    this.setState({ error: 'Poistettiin'})
  }

  render() {
    return (
      <div>
        <Notification message={this.state.error} />
        <h2>Puhelinluettelo</h2>
        <Filtering filter={this.state.filter} onChange={this.handleChange} />
        <PersonForm newName={this.state.newName} newNumber={this.state.newNumber}
          onChange={this.handleChange} onSubmit={this.addPerson} />
        <Numbers persons={this.state.persons} filter={this.state.filter} onRemove={this.onRemove} />
      </div>
    )
  }
}

export default App