import React, { useState,useEffect } from 'react'
import Add from './components/Add'
import Filter from './components/Filter'
import Person from './components/Person'
import personServices from './services/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filtName, setFiltName] = useState('')
  const [ noticeMessage, setNoticeMessage ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    personServices
    .getall_persons()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const toDelete = (id, name) => {
    console.log('delete this phone')
    if(window.confirm(`Delete ${name} ?`)){
      personServices
      .delete_person(id)
      .then(response => response.data)
      .then(setPersons(persons.filter(person => person.id !== id)))
    }

  }

  const Notification = ({message}) => {
    if (message === ''){
      return null
    }
    return(
      <div className="notice">
        {message}
      </div>
    )
  }

  const Errorinfo = ({message}) => {
    if (message === ''){
      return null
    }
    return(
      <div className="error">
        {message}
      </div>
    )
  }


  const personToShow = persons.filter(person => person.name.toLowerCase().indexOf(filtName.toLowerCase()) !== -1)


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noticeMessage} />
      <Errorinfo message={errorMessage}/>
      <Filter filtName={filtName} setFiltName={setFiltName}/>
      
      <h2>add a new</h2>
      <Add persons={persons} setPersons={setPersons} setNoticeMessage={setNoticeMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <ul>
        {personToShow.map((person,i) =>
          <Person key={i} person={person} toDelete={() => toDelete(person.id, person.name)} />
        )}
      </ul>

      {/* <Persons personToShow={personToShow}/> */}
    </div>
  )
}

export default App