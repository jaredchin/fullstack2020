import React, { useState } from 'react'

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
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else if (props.persons.filter(person => person.number === namePhoneObject.number).length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewPhone('')
    } else {
      props.setPersons(props.persons.concat(namePhoneObject))
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