import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Ad from './components/Ad';
import AdForm from './components/AdForm';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
// Actions
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Chat from './components/Chat';
import Landing from './components/Landing';
import Landing2 from './components/Landing2';
import Home2 from './components/landingComponents/Home2';
import About from './components/landingComponents/About';
import Contact from './components/landingComponents/Contact';
import Search from './components/Search';
function App() {
  // Load user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <Nav /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/ads/:adId' element={<Ad />} />
          <Route path='/postad' element={<AdForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/chat' element={<Chat/>}/>
          <Route path='/landing' element={<Landing/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/home' element={<Home2/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
