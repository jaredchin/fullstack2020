import React, { useState,useEffect } from 'react'
import  Add from './components/Add'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filtName, setFiltName] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])


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