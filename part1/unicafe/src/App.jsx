import { useState } from 'react'

const Display = props => (
  <div>
    {props.value}
  </div>
)

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.title}</td>
    <td>{props.calc}</td>
    <td>{props.unit}</td>
  </tr>
)

const Statistics = (props) => (
  <table>
    <tbody>
      <StatisticLine title="good " calc={props.good} />
      <StatisticLine title="neutral " calc={props.neutral} />
      <StatisticLine title="bad " calc={props.bad} />
      <StatisticLine title="all " calc={props.good+props.neutral+props.bad} />
      <StatisticLine title="average " calc={calcAverageRating(props.good, props.neutral, props.bad)} />
      <StatisticLine title="positive " calc={calcPositivePercent(props.good, props.neutral, props.bad)} unit="%"/>
    </tbody>
  </table>
)

const calcAverageRating = (good, neutral, bad) => ( // good = 1, neutral = 0, bad = -1
    (good*1 + neutral*0 + bad*-1) / (good + neutral + bad)
  )

const calcPositivePercent = (good, neutral, bad) => (
  good / (good + neutral + bad) * 100
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackGiven, setfeedbackGiven] = useState(false)

  const setGoodValue = (newValue) => () => {
    console.log('new good value:', newValue)
    setGood(newValue)
    setfeedbackGiven(true)
  }

  const setNeutralValue = (newValue) => () => {
    console.log('new neutral value:', newValue)
    setNeutral(newValue)
    setfeedbackGiven(true)
  }

  const setBadValue = (newValue) => () => {
    console.log('new bad value:', newValue)
    setBad(newValue)
    setfeedbackGiven(true)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={setGoodValue(good + 1)} text="good" />
      <Button onClick={setNeutralValue(neutral + 1)} text="neutral" />
      <Button onClick={setBadValue(bad + 1)} text="bad" />
      <h1>statistics</h1>
      {
        feedbackGiven ? (
          <Statistics good={good} neutral={neutral} bad={bad}/>
        ) : (
          <div>no feedback given.</div>
        )
      }
    </div>
  )
}

export default App