import React, { useEffect, useRef } from 'react'
import './Contact.css'
import gsap from 'gsap';
import Transition from './Transition';
import logo from '../../images/flight_logo.jpeg';
import { Link } from 'react-router-dom';
const Contact = () => {
    const contact = gsap.timeline();
    const contacth1 = useRef(null);
    const contacth2 =useRef(null)
    const contacth3= useRef(null)
    const contactimg = useRef(null);
    const navbarRef = useRef(null);
    const menuRef = useRef(null);
    useEffect(() => {
        contact.from(contacth1.current, {
            duration: .6,
            skewX: 10,
            x: -100,
            opacity: 0
        },"-=3.5")
        contact.from(contactimg.current, {
            duration: .5,
            y: -200,
            opacity: 0
        },"-=3")
        contact.from(contacth2.current, {
          duration: .6,
          skewX: 10,
          x: -100,
          opacity: 0
      },"-=3.5")
      contact.from(contacth3.current, {
        duration: .6,
        skewX: 10,
        x: -100,
        opacity: 0
    },"-=3.5")
    })
  return (
    <div>
         <nav ref={navbarRef} className="navbar">
      <div className="navbar-container">
        <div className="logo">
        <img className='nav_img' src={logo} alt='navicon' />
        <Link to='/landing'>
        Ziegler  Auction
        </Link></div>
        <div  >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <ul  ref={menuRef}>
          <li>
            <Link to="/home">Home</Link>
            </li>
            <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
        </ul>
      </div>
    </nav>
    <Transition timeline={contact} />
        <div className="contact-image contact-overlay" ref={contactimg}></div>
        <div className="container-contact">
            <h1 ref={contacth1}>Reach out</h1>
            <p  ref={contacth2}className='contact-para'>Have a question or need assistance? We're here to help! Feel free to drop us a
               line using the email test@test.com . Your feedback matters; </p>
               <div class="contact-form">
  <form ref={contacth3}action="/submit" method="post">
    <div class="form-group">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required/>
    </div>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required/>
    </div>
    <div class="form-group">
      <label for="message">Message:</label>
      <textarea id="message" name="message" rows="4" required></textarea>
    </div>
    <button type="submit">Send</button>
  </form>
</div>

        </div>
        
    </div>
  )
}

export default Contact