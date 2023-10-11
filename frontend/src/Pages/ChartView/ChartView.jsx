import React, { useEffect, useState } from "react";
import "./ChartView.css";
import { FaComments, FaFlag, FaNewspaper, FaUsers } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart, Line,
} from "recharts";
import { chartData, commentCount, postCount, reportCount, userCount } from "../../api/AdminRequests";


const ChartView = () => {
   const [totalUser,setTotalUserCount] = useState(null);
   const [totalPost,setTotalPostCount] = useState(null);
   const [totalComment,setTotalCommentCount] = useState(null);
   const [totalReport,setTotalReportCount] = useState(null);
   const [userData, setUserData]= useState([]);
   const [postData, setPostData]= useState([]);

   useEffect(() => {
   
   const getUserCount = async ()=>{
      try {
         const {data} = await userCount();
        
         setTotalUserCount(data.totalUsers);
         
      } catch (error) {
         console.log(error);
         
      };
     
   }
   getUserCount();

   const getPostCount = async ()=>{
      try {
         const {data} = await postCount();
         setTotalPostCount(data.totalPosts);
         
      } catch (error) {
         console.log(error);
         
      };
   }

   getPostCount();

   const getCommentCount = async ()=>{
    try {
       const {data} = await commentCount();
      
       setTotalCommentCount(data.totalComments);
       
    } catch (error) {
       console.log(error);
       
    };
   
 }
 getCommentCount();

 const getReportCount = async ()=>{
  try {
    const {data} = await reportCount();
    setTotalReportCount(data.totalReports);
    
    
  } catch (error) {
    console.log(error);
    
  }
 }
   
   getReportCount();

const getUserData = async ()=>{
  try {
    const {data} = await chartData();
    console.log("Post creation data is .....",data.postCounts);
    setUserData(data.userData);
    setPostData(data.postCounts);
    
  } catch (error) {
    console.log(error);
  }
};

getUserData();

   }, [])

  //   // Calculate postCount based on ISO week
  const postCountByWeek = postData?.reduce((acc, post) => {
    const week = post._id.week;
    if (!acc[week]) {
      acc[week] = 0;
    }
    acc[week] += post.count;
    return acc;
  }, {});

   const data = userData.map((user)=>({
  
    week:user._id.week,
    userRegistration:user.count,
    postsCreated: postCountByWeek[user._id.week] || 0,
   }));
   
   console.log("The data is........",data);
  return (

      <main className="main-container">
        <div className="main-title">
          <h3>DASHBOARD</h3>
        </div>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>USERS</h3>
              <FaUsers className="card_icon" />
            </div>
            <h1>{totalUser}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>POSTS</h3>
              <FaNewspaper className="card_icon" />
            </div>
            <h1>{totalPost}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>COMMENTS</h3>
              <FaComments className="card_icon" />
            </div>
            <h1>{totalComment}</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>REPORTS</h3>
              <FaFlag className="card_icon" />
            </div>
            <h1>{totalReport}</h1>
          </div>
        </div>
        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="userRegistration" fill="#8884d8" />
              <Bar dataKey="postsCreated" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="userRegistration"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="postsCreated" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
   
  );
};

export default ChartView;
