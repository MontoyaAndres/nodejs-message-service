import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import { users } from "../api";

const isActive = ({ isCurrent }) => {
  return isCurrent
    ? { className: "list-item is-active" }
    : { className: "list-item" };
};

export function UsersList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    users().then(({ data }) => {
      setList(data);
    });
  }, []);

  return (
    <div className="list is-hoverable">
      {list.map(item => (
        <Link getProps={isActive} key={item._id} to={`/${item._id}`}>
          {item.email}
        </Link>
      ))}
    </div>
  );
}
