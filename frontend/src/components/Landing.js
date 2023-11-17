import React ,{useState,useRef,useEffect}from 'react'
import Spline from '@splinetool/react-spline';
import { TweenMax, Power3,gsap } from 'gsap';
import './css/landing.css'
import logo from '../images/flight_logo.jpeg';
import { Link } from 'react-router-dom';
const Landing = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Navbar animation on component mount
    TweenMax.from(navbarRef.current, 1, {
      y: -100,
      opacity: 0,
      ease: Power3.easeInOut,
      duration:5000000
    });

    // Menu items animation
    TweenMax.staggerFrom(
      menuRef.current.children,
      0.8,
      {
        y: -50,
        opacity: 0,
        ease: Power3.easeOut,
      },
      0.2
    );
  }, []);
  useEffect(() => {
    gsap.from('.hero', {
      duration: 1.5,
      opacity: 0,
      x: -50,
      ease: 'power4.out',
      delay: 0.5,
    });
  });
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const menuItems = menuRef.current.children;

    // Toggle menu animation
    TweenMax.to(menuItems, 0.3, {
      opacity: isMenuOpen ? 0 : 1,
      y: isMenuOpen ? -50 : 0,
      ease: Power3.easeOut,
      stagger: 0.1,
    });
  };
  return (
    <div className='lc'>
          <nav ref={navbarRef} className="navbar">
      <div className="navbar-container">
        <div className="logo">
        <img className='nav_img' src={logo} alt='navicon' />
        <Link to='/landing'>
        Ziegler  Auction
        </Link>
          
          </div>
        <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <ul className={`menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
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
     <div className='content'>
    <div className='hero'>
      <h1>Welcome to Ziegler Auction's exclusive airplane parts auction.</h1>
      <Link to="/">
      <button className='know'>start</button>
      </Link>
    </div>
    <Spline scene="https://prod.spline.design/2Gju72f33ZirE5UW/scene.splinecode" />
  </div>
  <div style={{backgroundColor:"#C3DEF4", color:"#C3DEF4",width:"100%",height:"100%"}}>
    <div>tets</div>
    <div>tets</div>
    <div>tets</div>
    <div>tets</div>
    <div>tets</div>
    <div>tets</div>
  </div>
    </div>
     
  )
}

export default Landing