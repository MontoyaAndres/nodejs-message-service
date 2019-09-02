import React from "react";

import { UsersList } from "../components/UsersList";
import { MessagesList } from "../components/MessagesList";

function index(props) {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <UsersList />
        </div>

        <div className="column">
          <MessagesList receiverId={props["*"]} />
        </div>
      </div>
    </div>
  );
}

export default index;
