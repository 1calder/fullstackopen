import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const MostVotes = (props) => {
  if (props.highestVotes == 0) {
    return (
      <p>no votes yet.</p>
    )
  } else {
    return (
      <div>
        <p>{props.maxVotesAnecdote}</p>
        <div>votes: {props.highestVotes}</div>
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNextClick = () => {
    let rand = Math.floor((Math.random() * anecdotes.length))
    console.log("rand:", rand)
    setSelected(rand)
    console.log("selected:", selected)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const highestVotes = () => Math.max(...votes)
  const highestVotesIndex = () => votes.indexOf(highestVotes())

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <div>votes: {votes[selected]}</div>
      <Button onClick={() => handleVoteClick()} text="vote" />
      <Button onClick={() => handleNextClick()} text="next anecdote" />
      <h1>today's highest-voted anecdote</h1>
      <MostVotes highestVotes={highestVotes()} maxVotesAnecdote={anecdotes[highestVotesIndex()]}/>
    </div>
  )
}

export default App