import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <div>
        {person}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.find((person) => person.name === newName)
    if (nameExists){
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({name: newName}))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <Person person={person.name} key={person.name} />
        )}
    </div>
  )
}

export default App