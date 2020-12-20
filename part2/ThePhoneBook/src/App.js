import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filtName, setFiltName] = useState('')

  const addNamePhone = (event) => {
    event.preventDefault()
    const namePhoneObject = {
      name: newName,
      number: newPhone
    }
    //console.log(nameObject.name)
    //console.log(persons.indexOf(nameObject))

    if (persons.filter(person => person.name === namePhoneObject.name).length > 0){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else if (persons.filter(person => person.number === namePhoneObject.number).length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewPhone('')
    } else {
      setPersons(persons.concat(namePhoneObject))
      setNewName('')
      setNewPhone('')
    }
    //console.log('add button clicked', event.target)
  }

  const handlePhoneChange = (event) => {
    //console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlefiltNameChange = (event) => {
    console.log(event.target.value)
    setFiltName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with <input value={filtName} onChange={handlefiltNameChange}/></p>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNamePhone}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App