import axios from 'axios'
import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Notification = ({ notification }) => {
  const notificationText = notification.notificationText
  const notificationClass = notification.notificationClass
  if (notificationText === null) {    
    return null
  }

  return (
    <div className={notificationClass}>
      {notificationText}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  const handleDeleteClicked = () => {
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      deletePerson()
    } 
  }

  return (
    <div>
      {person.name} {person.number}
      <button onClick={handleDeleteClicked}>delete</button>
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

const Persons = ({ persons , deletePersonWithId }) => {
  return (
    persons.map(person =>
      <Person person={person} key={person.id} deletePerson={() => deletePersonWithId(person.id)}/>
    )
  )
}

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState({})
  const notificationDuration = 5000

  // Get data from json-server
  useEffect(() => {
    phonebookService
    .getAll()
    .then(initialPersons =>{
      setPersons(initialPersons)
    })
  }, [])
  
  // Adjust notification box
  const adjustNotification = (notificationObject) => {
    setNotification(notificationObject)
    setTimeout(() => {
      setNotification({})
      }, notificationDuration)
  }

  // Add person to phonebook
  const addName = (event) => {
    event.preventDefault()
    const nameExists = persons.find((person) => person.name === newName)
    const numberExists = persons.find((person) => person.number === newNumber)
    const newPerson = {name: newName, number: newNumber}    

    if (nameExists) {
      if (numberExists) {
        alert(`${newName} is already added to phonebook`)        
      } else {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          phonebookService
          .update(nameExists.id, newPerson)
          .then(response => {
            adjustNotification({notificationText: `${newPerson.name}'s number updated`, notificationClass: 'success'})
            setPersons(persons.map(person => person.id !== nameExists.id ? person : response))          
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            adjustNotification({notificationText: `Information of ${newPerson.name} has already been removed from the server`, notificationClass: 'error'})
            setPersons(persons.filter(person => person.id !== nameExists.id))          
            setNewName('')
            setNewNumber('')
          })
        }        
      }        
    }
    else {      
      phonebookService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          adjustNotification({notificationText: `Added ${newPerson.name}`, notificationClass: 'success'})
          setNewName('')
          setNewNumber('')          
        })
    }
  }

  // Even handler to delete person
  const deletePersonWithId = (id) => {
    phonebookService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
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
      <Notification notification={notification}/>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filterPersons()} deletePersonWithId={deletePersonWithId} />
    </div>
  )
}

export default App