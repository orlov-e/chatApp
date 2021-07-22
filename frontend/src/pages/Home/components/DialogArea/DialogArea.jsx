import React, { useRef, useEffect } from "react";
import List from "@material-ui/core/List";
import Message from "./Message";
import NoMessages from "../../../../common/NoMessages";

const DialogArea = ({ messagesArray, thisAccountId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  return (
    <div>
      {(messagesArray == null)  ? (
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
    </div>
  );
};

export default DialogArea;