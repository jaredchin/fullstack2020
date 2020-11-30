import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistic = (props) => {
  return(
    <div>
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td>
            <td>{props.value} {props.extra}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  if (good + neutral + bad === 0){
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={good + neutral + bad} />
      <Statistic text="average" value={(good * 1 + bad * -1)/(good + neutral + bad)} />
      <Statistic text="positive" value={good / (good + neutral + bad) * 100} extra="%"/>
    </div>
  )
}


const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
