import React, { useState } from "react";

import { register } from "../api";

function Register({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    register({ email, password }).finally(() => {
      setIsLoading(false);
      navigate("/login");
    });
  }

  return (
    <section className="section">
      <div className="container">
        <fieldset disabled={isLoading}>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="control">
                <input
                  type="email"
                  name="email"
                  value={email}
                  className="input"
                  id="email"
                  placeholder="Enter your email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="control">
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="input"
                  id="password"
                  placeholder="Enter your password"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="button is-medium is-primary">
              Sign up
            </button>
          </form>
        </fieldset>
      </div>
    </section>
  );
}

export default Register;
