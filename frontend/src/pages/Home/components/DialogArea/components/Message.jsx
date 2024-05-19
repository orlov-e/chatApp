import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Status from '../../../../../common/Status';
import { GlassCard } from '../../../../../common/GlassCard';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const Message = ({ isMe, text, date, messageId, isOnline, firstName, lastName, photo }) => {
  const [liked, setLiked] = useState(false);

  const handleReact = () => {
    setLiked(!liked);
  };

  return (
    <ListItem key={messageId} style={{ justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
      <ListItemIcon>
        <Avatar alt={`${firstName} ${lastName}`} src={photo ? photo : '/static/images/avatar/1.jpg'} />
        {isOnline && !isMe ? <Status /> : null}
      </ListItemIcon>
      <GlassCard color={isMe ? "deepskyblue" : "white"}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ListItemText style={{ padding: '12px' }} primary={text} secondary={date}></ListItemText>
        </div>
      </GlassCard>
          {!isMe && (
            <IconButton onClick={handleReact}>
              {liked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
            </IconButton>
          )}
    </ListItem>
  );
};

export default Message;