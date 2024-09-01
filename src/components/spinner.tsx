import React from 'react'
import spinner from "../../public/spinner.svg"

const Spinner = () => {
  return (
    <div>
      <img src={spinner.src} alt="Loading..." className="w-24 h-24 mx-auto"/>
    </div>
  )
}

export default Spinner
