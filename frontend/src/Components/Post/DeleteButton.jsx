import { DeleteOutline } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'

const DeleteButton = ({deletePostHandler}) => {
  return (
 <Button onClick={deletePostHandler}><DeleteOutline /></Button>
  );
};

export default DeleteButton
