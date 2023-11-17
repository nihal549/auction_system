import React ,{useRef, useEffect}from 'react'
import './Home.css'
import gsap from 'gsap';
import Transition from './Transition';
import logo from '../../images/flight_logo.jpeg';
import { Link } from 'react-router-dom';
const Home = () => {
  const home = gsap.timeline();
  const homeh1 = useRef(null);
  const homeh2 =useRef(null)
  const homeimg = useRef(null);
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  useEffect(() => {
      home.from(homeh1.current, {
          duration: .6,
          skewX: 10,
          x: -100,
          opacity: 0
      },"-=3.5")
      home.from(homeimg.current, {
          duration: .5,
          y: -200,
          opacity: 0
      },"-=3")
      home.from(homeh2.current, {
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
    <Transition timeline={home}/>
        <div className="home-image home-overlay" ref={homeimg}></div>
        <div className="container-home">
            <h1 ref={homeh1}>Parts Up for Grabs!</h1>
            <div>
            <p  ref={homeh2}  className='home-para'>Welcome to our aviation auction platform, where the skies are the 
              limit for acquiring premium airplane parts! Dive into a world of 
              high-flying bids and explore a collection of top-quality components that
               power the aviation industry. From engines that fuel flight to intricate cockpit
                instruments, our auctions offer enthusiasts and professionals alike the opportunity to 
                access the very essence of flight. Join us in this exhilarating journey through 
                the clouds as you uncover sought-after airplane parts waiting for your bid to soar
                 to new heights!</p>
       
            </div>
        </div>
        
    </div>
  )
}

export default Home