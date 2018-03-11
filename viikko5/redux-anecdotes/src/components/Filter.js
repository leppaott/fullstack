import React from 'react'
import { actionCreator } from '../reducers/reducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (e) => {
    this.props.filterChange(e.target.value)
  }

  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  filterChange: (text) => actionCreator('FILTER', text)
}

export default connect(null, mapDispatchToProps)(Filter)
