import React, { useState } from 'react'
import personServices from '../services/Persons'

const Add = (props) => {

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')


  const handlePhoneChange = (event) => {
    //console.log(event.target.value)
    setNewPhone(event.target.value)
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addNamePhone = (event) => {
    event.preventDefault()
    const namePhoneObject = {
      name: newName,
      number: newPhone
    }
    //console.log(nameObject.name)
    //console.log(persons.indexOf(nameObject))

    if (props.persons.filter(person => person.name === namePhoneObject.name).length > 0){
      const update_id = props.persons.filter(person => person.name === namePhoneObject.name)[0].id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personServices
        .update_person(update_id, namePhoneObject)
          .then(response => response.data)
          .then(returnedPerson => {
            props.setPersons(props.persons.map(person => person.name === newName ? returnedPerson : person))
            props.setNoticeMessage(`Updated ${newName}`)
            setTimeout(() => {
              props.setNoticeMessage('')
            }, 5000)
          })
          .catch(error => {
            props.setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              props.setErrorMessage('')
            }, 5000)
          })
      }
      setNewName('')
      setNewPhone('')
    } else {
      //props.setPersons(props.persons.concat(namePhoneObject))
      personServices
        .add_person(namePhoneObject)
        .then(response => response.data)
        .then(returnedPerson => {
          props.setNoticeMessage(`Added ${newName}`)
          props.setPersons(props.persons.concat(namePhoneObject))
          setTimeout(() => {
            props.setNoticeMessage('')
          }, 5000)
        })
        .catch(error => {
          props.setErrorMessage(`${newName} add failed`)
          setTimeout(() => {
            props.setErrorMessage('')
          }, 5000)
        })
      setNewName('')
      setNewPhone('')
    }
    //console.log('add button clicked', event.target)
  }

  return (
    <>
      
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
    </>
  )
}

export default Add