import React, { useEffect, useState } from 'react';
import './Conversation.css';
import { getUser } from '../../api/UserRequests';

const Conversation = ({data,currentUserId, online,userId,name ,avatar}) => {

  const [userData,setUserData] = useState(null)

  useEffect(() => {
    const userId = data?.members?.find((id)=>id!==currentUserId);
    const getUserData = async()=>{
      try {
        const {data} = await getUser(userId);
        setUserData(data);
        
      } catch (error) {
        console.log(error);
      }
     
    };
    getUserData();
   
  }, [ ])
  
  return (
    <>
    <div>

      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img src={userData?.user?.avatar?.url } alt="" className="followerImage"  style={{width:'50px', height:'50px'}} />
          <div className="name" style={{fontSize:"0.8rem"}}>
            <span>{userData?.user?.name}</span>
            <span >{online? "online":"offline"}</span>
          </div>
        </div>
      </div>
      
    </div>
    <hr  style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  )
}

export default Conversation
