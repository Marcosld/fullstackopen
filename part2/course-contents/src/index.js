import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Content = ({parts}) => parts.map(({name, exercises}, i) => <p key={i}>{name} {exercises}</p>)

const Total = ({parts}) => <p><b>total of {parts.reduce((total, {exercises}) => total + exercises, 0)} exercises</b></p>

const Course = ({course: {name, parts}}) => (
    <>
        <Header text={name}/>
        <Content parts={parts}/>
        <Total parts={parts}/>
    </>
)

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]

    return (
        <>
            <h1>Web development CV</h1>
            {courses.map((course, i) => <Course key={i} course={course}/>)}
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))