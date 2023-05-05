import React, { useState } from "react";
import "./Messages.scss";
import { BiSend, BiSearch } from "react-icons/bi";
import { profile } from "../../assests";
import ScrollToBottom from "react-scroll-to-bottom";

import { TfiMenuAlt } from "react-icons/tfi";
import { RxCross2 } from "react-icons/rx";
const Messages = (props) => {
  const [msg, setMsg] = useState("");
  const [showContact, setshowContact] = useState(true);
  const [messages, setMessages] = useState(props.messages);

  const messageHandler = (event) => {
    setMsg(event.target.value);
    console.log(msg);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const messageData = {
      id: Math.random().toString(),
      message: msg,
    };
    setMessages((preMessages) => {
      return [...preMessages, messageData];
    });
    setMsg("");
  };

  return (
    <>
      <div className="chat">
        <div className="chat-container">
          {showContact ? (
            <div className="chat-container-user">
              <div className="chat-container-user-search">
                <input type="text" placeholder="Search messages" />
                <BiSearch className="chat-container-user-search-icon" />
              </div>
              {props.users.map((data) => {
                return (
                  <>
                    <UserMessage
                      profile={data.img}
                      name={data.name}
                      message={data.message}
                      newmsg={data.newmsg}
                    />
                  </>
                );
              })}
            </div>
          ) : (
            ""
          )}
          <div className="chat-container-feed">
            <div className="chat-container-feed-profile space-between">
              <div className="chat-container-feed-profile-flex  align-item-center">
                <div
                  className="chat-container-feed-profile-menuicon"
                  onClick={() => setshowContact(!showContact)}
                >
                  <TfiMenuAlt />
                </div>
                <img src={profile} alt="profile" />
                <h3>Alex</h3>
              </div>

              {showContact ? (
                <div
                  className="chat-container-feed-profile-menuicon-cross"
                  onClick={() => setshowContact(!showContact)}
                >
                  <RxCross2 />
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="chat-container-feed-box">
              <ScrollToBottom>
                {messages.map((msg) =>
                  msg.type === "reciver" ? (
                    <Message
                      class="recieve-message"
                      key={msg.id}
                      text={msg.message}
                    />
                  ) : (
                    <Message
                      class="send-message"
                      key={msg.id}
                      text={msg.message}
                    />
                  )
                )}
              </ScrollToBottom>
            </div>
            <div className="chat-container-feed-input">
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={msg}
                  onChange={messageHandler}
                />
                <button className="message-send-btn " type="submit">
                  <BiSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;

const UserMessage = (props) => {
  return (
    <>
      <div className="usermessage">
        <div className="usermessage-container">
          <div className="usermessage-container-flex">
            <div className="usermessage-container-image">
              <img src={props.profile} alt="profile" />
            </div>
            <div className="usermessage-container-name">
              <h3>{props.name}</h3>
              <p>{props.message}</p>
            </div>
          </div>
          <div className="usermessage-container-messages">
            <p>{props.newmsg}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const Message = (props) => {
  return (
    <>
      <div className={`message ${props.class}`}>
        <div className="message-container">
          <p>{props.text}</p>
        </div>
      </div>
    </>
  );
};
