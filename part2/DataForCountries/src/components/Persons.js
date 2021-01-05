import React from 'react'

const Persons = (props) => {
  return (
    <ul>
      {props.personToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </ul>
  )
}

export default Persons