import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import Message from "./components/Message";
import NoMessages from "../../../../common/NoMessages";
import TypeField from "./components/TypeField";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const DialogArea = ({ thisAccountId }) => {
  const messagesEndRef = useRef(null);

  const { messagesArray } = useSelector(({ messages }) => messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  return (
    <div>
      <Grid style={{ height: "75vh", overflowY: "auto" }}>
        {messagesArray == null ? (
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
                  />
                );
              } else {
                return (
                  <Message
                    isMe={false}
                    text={message.text}
                    messageId={message._id}
                  />
                );
              }
            })}
            <div ref={messagesEndRef}></div>
          </List>
        )}
      </Grid>
      <Divider />
      <TypeField />
    </div>
  );
};

export default DialogArea;
