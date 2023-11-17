import React ,{useEffect, useState}from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
const socket = io.connect("http://localhost:5000")
const Chat = (props) => {
  console.log(props)
  const [message,setMessage]=useState("")
  const[userDetail,setUserDetail]=useState("")
  const [messageRecieved,setMessageRecieved]=useState("")
  const sendMessage =()=>{
    const username=props.user.username
    console.log("user"+username)
    socket.emit("send_message",{
      //todo add
      message,
      user:username
    })
  }
  const joinRoom =()=>{
    socket.emit("join_room",{
      message:"hi"
    })
  }
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      console.log(data)
      setUserDetail(data.user)
      setMessageRecieved(data.message)
    })
  },[socket])
  return (
    <div style={{ backgroundColor: '#161616', color: 'white', padding: '20px', borderRadius: '8px' }}>
    <input
        placeholder='Message'
        style={{
            backgroundColor: '#262626',
            color: 'white',
            padding: '8px',
            border: 'none',
            marginBottom: '10px',
            borderRadius: '4px',
            width: 'calc(100% - 16px)', // Adjust width to account for padding
        }}
        onChange={(event) => {
            setMessage(event.target.value);
        }}
    />
    <button
        style={{
            backgroundColor: '#444',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '4px',
        }}
        onClick={sendMessage}
    >
        Send
    </button>
    <h1 style={{ marginTop: '20px' }}>Message:</h1>
    <div style={{ backgroundColor: '#262626', color: 'white', padding: '10px', borderRadius: '4px' }}>
        <p style={{ marginBottom: '8px', borderBottom: '1px solid #444', paddingBottom: '8px' }}>{userDetail}</p>
        <p>{messageRecieved}</p>
    </div>
</div>



  )
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
 
});
export default connect(mapStateToProps,) (Chat)