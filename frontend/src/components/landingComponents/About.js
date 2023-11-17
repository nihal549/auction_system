import React, { useEffect, useRef } from 'react'
import './About.css'
import Transition from './Transition'
import gsap from 'gsap';
import logo from '../../images/flight_logo.jpeg';
import { Link } from 'react-router-dom';

const About = () => {
    const navbarRef = useRef(null);
  const menuRef = useRef(null);
    const about = gsap.timeline();
    const abouth1 = useRef(null);
    const abouth2= useRef(null)
    const aboutimg = useRef(null);
    useEffect(() => {
        about.from(abouth1.current, {
            duration: .6,
            skewX: 10,
            x: -100,
            opacity: 0
        },"-=3.5")
        about.from(aboutimg.current, {
            duration: .5,
            y: -200,
            opacity: 0
        },"-=3")
        about.from(abouth2.current, {
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
        </Link>
        </div>
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
        <Transition timeline={about}/>
            <div className="about-image about-overlay" ref={aboutimg}></div>
            <div className="container-about">
                <h1 ref={abouth1}>Behind the Wings</h1>
                <p  ref={abouth2} className='about-para'>Embark on a journey behind the scenes and discover the 
                heart that propels our aviation legacy. We are more than just a platform for auctions; 
                we're enthusiasts, dedicated to the world of aviation. Our story is woven with passion
                 and expertise, fueled by a deep-seated commitment to sourcing and showcasing the 
                 finest airplane parts. With a blend of experience and a shared love for flight, 
                 we curate auctions that resonate with both seasoned professionals and budding enthusiasts. 
                 Join us in unraveling the essence of our mission, as we strive
                 to elevate the aviation experience and connect aficionados with the soul of flight</p>
            </div>
        </div>
  )
}

export default About