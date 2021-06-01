import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { createStore } from 'redux'
// import anecdoteReducer from './reducers/anecdoteReducer'
// import { voteTo, createAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

//const store = createStore(anecdoteReducer)

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}


export default App