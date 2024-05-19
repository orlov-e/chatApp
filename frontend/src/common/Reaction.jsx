import React from 'react';
import { IconButton } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const Reaction = ({ onReact }) => {
  return (
    <IconButton onClick={onReact}>
      <ThumbUpIcon />
    </IconButton>
  );
};

export default Reaction;