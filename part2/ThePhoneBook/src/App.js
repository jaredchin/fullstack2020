import React, { useState } from 'react'
import  Add from './components/Add'
import Filter from './components/Filter'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ filtName, setFiltName] = useState('')
  const personToShow = persons.filter(person => person.name.toLowerCase().indexOf(filtName.toLowerCase()) !== -1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtName={filtName} setFiltName={setFiltName}/>
      
      <h2>add a new</h2>
      <Add persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons personToShow={personToShow}/>
    </div>
  )
}

export default App