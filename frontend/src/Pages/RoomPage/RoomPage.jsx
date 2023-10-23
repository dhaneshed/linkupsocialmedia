import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

const RoomPage = () => {
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.user);
  const myMeeting = async (element) => {
    const appID = 1556128061;
    const serverSecret = "ce4e0fd9c9d1f32a2a9e9c8209893f27";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      user?.name
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks:[{
        name: 'Copy Link',
        url:`${process.env.REACT_APP_ORIGIN}/room/${roomId}`
      }],
      scenario:{
        mode:ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };
  return <div>
    <div ref={myMeeting} />

  </div>;
  
};

export default RoomPage;
