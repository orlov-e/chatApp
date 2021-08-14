import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import Message from "./components/Message";
import NoMessages from "../../../../common/NoMessages";
import TypeField from "./components/TypeField";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import socket from "../../../../core/socket";
import {
  fetchMessagesData,
  addMessage,
} from "../../../../redux/actions/messages";
import { getMessageTime } from "../../../../utils/formatTime";

const DialogArea = ({ thisAccountId, messagesArray, selectedDialog }) => {
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  };

  const onNewMessage = (message) => {
    dispatch(addMessage(message));
  };

  useEffect(() => {
    if (selectedDialog && messagesArray.length === 0) {
      dispatch(fetchMessagesData(selectedDialog));
    }

    socket.on("SERVER:SEND_MESSAGE", onNewMessage);
    return () => {
      socket.removeListener("SERVER:SEND_MESSAGE");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDialog]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  return (
    <div>
      <Grid style={{ height: "75vh", overflowY: "auto" }}>
        {messagesArray.length === 0 ? (
          <NoMessages />
        ) : (
          <List>
            {messagesArray.map((message) => {
              if (message.user._id === thisAccountId) {
                return (
                  <Message
                    isMe={true}
                    text={message.text}
                    messageId={message._id}
                    date={getMessageTime(message.createdAt)}
                    isOnline={message.user.isOnline}
                    firstName={message.user.firstName}
                    lastName={message.user.lastName}
                    photo={message.user.avatar}
                  />
                );
              } else {
                return (
                  <Message
                    isMe={false}
                    text={message.text}
                    messageId={message._id}
                    date={getMessageTime(message.createdAt)}
                    isOnline={message.user.isOnline}
                    firstName={message.user.firstName}
                    lastName={message.user.lastName}
                    photo={message.user.avatar}
                  />
                );
              }
            })}
            <div ref={messagesEndRef}></div>
          </List>
        )}
      </Grid>
      <Divider />
      <TypeField dialogId={selectedDialog} />
    </div>
  );
};

export default DialogArea;
