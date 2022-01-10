import React from 'react';


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const parts = course.parts

  // sum = reduce(reducer, initialValue)  //initialValue needed to pass first item through reducer
  const reducer = (previousValue, currentValue) => previousValue + currentValue.exercises;
  const sum = parts.reduce(reducer, 0)
  return(
    <p><strong>total of {sum} exercises</strong></p>
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
  const parts = course.parts
  return (
    <div>
      {parts.map( part =>
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course