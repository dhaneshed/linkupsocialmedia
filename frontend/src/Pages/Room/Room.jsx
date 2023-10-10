import { Button, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import React, { useCallback, useState } from 'react';

const Room = () => {

  const [value,setValue] = useState("");

  const navigate =  useNavigate()
  const handleJoinRoom = useCallback(()=>{
    navigate(`/room/${value}`)
  },[navigate,value])

  return (
    

    <div className="newPost">
      <form className="newPostForm" >
        <Typography variant="h3">Join Room</Typography>
       
        <input
        value={value}
        onChange={e=>setValue(e.target.value)}
          type="text"
          placeholder="Enter Room Code"
         
        />
        <Button onClick={handleJoinRoom}  type="button">
          Join
        </Button>
      </form>
    </div>
  
  
  )
}

export default Room;
