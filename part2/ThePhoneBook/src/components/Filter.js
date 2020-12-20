import React from 'react'

const Filter = (props) => {
  

  const handlefiltNameChange = (event) => {
    //console.log(event.target.value)
    props.setFiltName(event.target.value)
  }

  return (
    <div>
      <p>filter shown with <input value={props.filtName} onChange={handlefiltNameChange}/></p>
    </div>
  )
}

export default Filter