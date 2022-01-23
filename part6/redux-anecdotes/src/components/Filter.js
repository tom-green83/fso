import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    console.log(event.target.value)
    props.updateFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateFilter: value => {
      dispatch(updateFilter(value))
    } }
}

const connectedFilter = connect(null, mapDispatchToProps)(Filter)
export default connectedFilter