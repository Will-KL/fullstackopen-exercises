import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with <input value={filter} onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handlePersonChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map(person => (
      <div key={person.id}>
        <div>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button> </div> 
      </div>
    ))}
  </div>
)

const Notification = ({ message }) => {
  if (!message) {
    return null
  }

  const notificationStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={notificationStyle}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: (persons.length + 1).toString(),
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        axios
          .put(`http://localhost:3001/persons/${person.id}`, changedPerson)
          .then(response => {
            console.log('promise fulfilled')
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : changedPerson))
            setNotificationMessage({ text: `Updated ${newName}`, type: 'success' })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage({ text: `Information of ${newName} has already been removed from server`, type: 'error' })
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })
          setNewName('')
          setNewNumber('')
      }
      return
    }

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log('promise fulfilled')
        setPersons(persons.concat(personObject))
        setNotificationMessage({ text: `Added ${newName}`, type: 'success'})
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log('delete', id)
    const personObject = persons.find(person => person.id === id)
    if (personObject === undefined) {
      alert(`Person not found`)
      return
    }

    if (window.confirm(`Delete ${personObject.name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          console.log('promise fulfilled')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => { 
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App