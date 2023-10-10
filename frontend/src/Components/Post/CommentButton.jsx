import { ChatBubbleOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

const CommentButton = ({toggleComment}) => {
  return (
    <Button onClick={toggleComment}>
    <ChatBubbleOutline />
  </Button>

  );
};

export default CommentButton;
