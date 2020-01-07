import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
)

const Statistics = ({good, bad, neutral}) => {
    const all = good + bad + neutral;

    return (all ?
        <>
            <table>
                <tbody>
                    <Statistic text='good' value={good}/>
                    <Statistic text='neutral' value={neutral}/>
                    <Statistic text='bad' value={bad}/>
                    <Statistic text='all' value={all}/>
                    <Statistic text='average' value={(good - bad) / (all || 1)}/>
                    <Statistic text='positive' value={`${good * 100 / (all || 1)}%`}/>
                </tbody>
            </table>
        </> : 'No feedback given'
    )
}

const Button = ({text, val, setVal}) => <button onClick={() => setVal(val + 1)}>{text}</button>

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>Give feedback</h2>
            <Button text='good' val={good} setVal={setGood}/>
            <Button text='neutral' val={neutral} setVal={setNeutral}/>
            <Button text='bad' val={bad} setVal={setBad}/>
            <h2>statistics</h2>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)