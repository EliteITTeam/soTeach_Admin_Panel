import React from "react";
import { Messages } from "../../components";
import { Navbar } from "../../components/common";
const InboxPage = () => {
  return (
    <>
      <Navbar heading="Inbox" />
      <Messages />
    </>
  );
};

export default InboxPage;
