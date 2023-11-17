import React from 'react'
import { Link } from 'react-router-dom'
import './landing2.css'
const Landing2 = () => {
  return (
    <div className="header2">
    <div className="logo">
     Aero  <br /> Space
    </div>
    <ul>
      <li>
        <Link className="link" to="/home">Home</Link>
      </li>
      <li>
        <Link className="link" to="/about">About</Link>
      </li>
      <li>
        <Link className="link" to="/contact">Contact</Link>
      </li>
    </ul>
  </div>
  )
}

export default Landing2