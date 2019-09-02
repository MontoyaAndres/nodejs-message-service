import React, { useState, useContext } from "react";
import { Link } from "@reach/router";

import { Context } from "../context";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuth, removeAuth } = useContext(Context);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/" onClick={() => setIsOpen(false)}>
          SMTP Email App
        </Link>

        <span
          role="button"
          className={`navbar-burger burger ${isOpen ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div
        id="navbar"
        className={`navbar-menu ${isOpen ? "is-active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="navbar-end">
          <div className="navbar-item">
            {!isAuth ? (
              <div className="buttons">
                <Link
                  className="button is-primary"
                  to="/register"
                  onClick={() => setIsOpen(false)}
                >
                  <strong>Sign up</strong>
                </Link>
                <Link
                  className="button is-light"
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Log in
                </Link>
              </div>
            ) : (
              <span className="button is-primary" onClick={() => removeAuth()}>
                <strong>Log out</strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
