import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      find: '',
      countries: []
    }
  }

  componentWillMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response =>
        this.setState({ countries: response.data }))
  }

  handleChange = (e) => {
    this.setState({ find: e.target.value })
  }

  getCountries = () => {
    if (this.state.find.length === 0) return 'try searching'

    const countries = this.state.countries
      .filter(country => country.name.toLowerCase()
        .startsWith(this.state.find.toLowerCase()))

    if (countries.length > 10) return 'too many matches, specify another filter'
    if (countries.length === 0) return 'couldn\'t find anything'

    const focus = (e, find) => [e.preventDefault(), this.setState({ find })]

    const forlolz = () => 
      countries.length > 1 && 
        countries.map(country =>
          <div onClick={(e) => focus(e, country.name)} key={country.name}>
            {country.name}
          </div>)

    return forlolz() || ((country) =>
      <div key={country.name}>
        <h1>{country.name}</h1>
        <div>capital: {country.capital}</div>
        <div>population: {country.population}</div>
        <div><img src={country.flag} alt='flag' height='100' /></div>
      </div>)(countries[0])
  }

  render() {
    return (
      <div>
        find countries: <input value={this.state.find} onChange={this.handleChange} />
        <div>{this.getCountries()}</div>
      </div>
    )
  }
}

export default App;
