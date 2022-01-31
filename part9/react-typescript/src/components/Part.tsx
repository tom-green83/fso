import React from "react";
import { CoursePart } from "../types";

const Part = ({ coursePart} : {coursePart: CoursePart} )=> {

 // Helper function for exhaustive type checking
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
  const renderAttributes = ( part: CoursePart) => {
    switch(part.type){
      case "normal":
        return(
          <>
            <em>{part.description}</em>
          </>
        ) 
      case 'groupProject':
        return(
          <>
            project exercises {part.groupProjectCount}
          </>
        )
      case 'submission':
        return(
          <>
            <em>{part.description}</em><br/>
            submit to {part.exerciseSubmissionLink}
          </>
        )
      case 'special':
        return (
          <>
            <em>{part.description}</em><br/>
            required skills {part.requirements.toString()}
          </>
        )
      default: 
        return assertNever(part)
    }
  }

  return (
    <>
      <strong>{coursePart.name} {coursePart.exerciseCount}</strong><br/>
      {renderAttributes(coursePart)}
    </>
  )

  
}

export default Part;