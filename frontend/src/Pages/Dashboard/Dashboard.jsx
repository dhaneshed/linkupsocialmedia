import React from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import "./Dashboard.css";

const Dashboard = ({child}) => {
  return (
    <div>
       <Topbar />
      <div className="container">
        <Sidebar />
        <div className="others">
          {child}

        </div>
        
      </div>
      
    </div>
  )
}

export default Dashboard
