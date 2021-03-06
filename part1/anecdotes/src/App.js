import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleSelected = () => {
    let newSelected
    do {
      newSelected = Math.floor(Math.random()*anecdotes.length)
    } while (newSelected == selected);
    setSelected(newSelected)
  }

  const handleVotes = () => {
    // const newVotes = votes  // Copies the reference so setVotes(newVotes) doesn't register it as a state change
    // const newVotes = {...votes}  // Assigning an object to votes (initially defined as array) worked until mostVoted was called
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const mostVoted = () => votes.indexOf(Math.max(...votes))
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={handleVotes}>vote</button>
        <button onClick={handleSelected}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[mostVoted()]}</div>       
    </div>
  )
}

export default App