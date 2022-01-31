import React from "react";
import { CourseParts } from "../types";

const Content = ({ courseParts }: CourseParts )=> {
  return (
    <>
      {courseParts.map((coursePart, index) => {
        return (
          <p key={index}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        )
      })}
    </>
  )
}

export default Content;