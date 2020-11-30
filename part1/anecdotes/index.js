import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}



const anecdotes = [
  'If it hurts, do it more ofen',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))
  const [maxid, setMaxid] = useState(0)
  //const points = Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0)

  const handleAnecdotesClick = () => {
    const i = Math.floor(Math.random()*5)
    setSelected(i)
  }
  const handleVoteClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    setMaxid(copy.indexOf(Math.max.apply(Math, copy)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} vote</p>
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleAnecdotesClick} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxid]}</p>
    </div>
  )
}


ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))

