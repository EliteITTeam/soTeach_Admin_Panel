import React from "react";
import { Messages } from "../../components";
import { Navbar } from "../../components/common";
import { userData, dummy__messages } from "../../data/messageData";
const InboxPage = () => {
  return (
    <>
      <Navbar heading="Inbox" />
      <Messages users={userData} messages={dummy__messages} />
    </>
  );
};

export default InboxPage;
