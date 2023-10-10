import React from 'react';
import { Button } from '@mui/material';
import { Favorite,FavoriteBorder } from '@mui/icons-material';


const LikeButton = ({liked, handleLike}) => {
  return (
    <Button onClick={handleLike}>
      {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
    </Button>
  );
};

export default LikeButton;
