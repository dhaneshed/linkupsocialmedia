import { Typography } from '@mui/material'
import React from 'react'

const LikedUsers = ({handleLikedUsers,disableLikedUsers,likedUsersTypography}) => {
  return (
    <>
      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={handleLikedUsers}
        disabled={disableLikedUsers}
      >
        <Typography>{likedUsersTypography} Likes</Typography>
      </button>
    </>
  )
}

export default LikedUsers
