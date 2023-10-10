import React from 'react';
import {Button} from "@mui/material";
import { MoreVert } from '@mui/icons-material';

const PostHeader = ({isAccount,toggleCaption}) => {
  return (
    <div className="postHeader">
    {isAccount ? (
      <Button onClick={toggleCaption}>
        <MoreVert />
      </Button>
    ) : null}
  </div>
  )
}

export default PostHeader
