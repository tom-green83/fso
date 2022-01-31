import React from "react";
import { CoursePart } from "../types";
import Part from './Part'

const Content = ({ courseParts }: {courseParts: CoursePart[]} )=> {
  return (
    <>
      {courseParts.map((coursePart, index) => {
        return (
          <p key={index}>
            <Part coursePart={coursePart} />
          </p>
        )
      })}
    </>
  )
}

export default Content;