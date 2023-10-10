import { Dialog, Typography } from "@mui/material";
import React from "react";

const DialogBox = ({openDialog,onCloseDialog,typographyDialog,children,iterationDialog}) => {
  return <><Dialog open={openDialog} onClose={onCloseDialog}>
  <div className="DialogBox">
    <Typography variant="h4">{typographyDialog}</Typography>
    {children}
    {iterationDialog}
  </div>
</Dialog></>;
};

export default DialogBox;
