import React from 'react'



const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>  
  )
}
  
const Content = ({ course }) => {
  return (
    course.parts.map(part => <Part key={part.id} part={part} />)
  )
}

const Total = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((s, p) => {
    //console.log('what is happening', s, p)
    return s + p
  })
  //const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises
  return(
    <p><b>Total of {sum} exercises</b></p>
  ) 
}

const Course = ({ course }) => {
  return(
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course