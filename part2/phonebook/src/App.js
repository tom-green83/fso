import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number}
    </div>
  )
}

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map(person =>
      <Person person={person} key={person.id} />
    )
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])

  // Get data from json-server
  useEffect(() => {
    axios.
    get('http://localhost:3001/persons').
    then(response => {
      setPersons(response.data)
    })
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.find((person) => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = () => {
    if (filter) {
      return (persons.filter(person => person.name.toUpperCase().includes(filter.toLocaleUpperCase())))
    } else {
      return (persons)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filterPersons()} />
    </div>
  )
}

export default App