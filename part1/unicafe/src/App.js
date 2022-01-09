import React, { useState } from 'react'

const Button = ({textFeedback, stateFeedback, setterFeedback}) => {
  const handleFeedback = () => setterFeedback(stateFeedback + 1)
  return(
    <button onClick={handleFeedback}>{textFeedback}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = 100 * good / total + " %"

  if (total >= 1)
    return(
      <table>
       <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={total}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={positive}/>
        </tbody>
      </table>
    )
  return(<p>No feedback given</p>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button textFeedback={"good"} stateFeedback={good} setterFeedback={setGood}/>
      <Button textFeedback={"neutral"} stateFeedback={neutral} setterFeedback={setNeutral}/>
      <Button textFeedback={"bad"} stateFeedback={bad} setterFeedback={setBad}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App