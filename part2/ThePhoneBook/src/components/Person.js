import React from 'react'

const Person = ({person, toDelete}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={toDelete}>delete</button>
    </li>
  )
}

export default Person