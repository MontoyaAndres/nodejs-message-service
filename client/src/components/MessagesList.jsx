import React, { useState, useEffect } from "react";

import { getMessages, postMessages } from "../api";

export function MessagesList({ receiverId }) {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (message !== "") {
      postMessages({ message }, receiverId);
      setList(list => [{ message }, ...list]);
      setMessage("");
    }
  }

  useEffect(() => {
    getMessages(receiverId).then(({ data }) => {
      setList(data);
    });
  }, [receiverId]);

  return (
    <>
      {list.length === 0 ? (
        <h3 className="title is-3">There's no items</h3>
      ) : (
        <div
          style={{
            height: 500,
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column-reverse"
          }}
        >
          {list.map((item, i) => (
            <div className="box" key={i}>
              <div className="media">
                <div className="media-content">
                  <div className="content">
                    <p>{item.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="field">
        <label className="label">Message</label>
        <div className="control">
          <textarea
            className="textarea"
            placeholder="Textarea"
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className="control">
          <button className="button is-info" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
