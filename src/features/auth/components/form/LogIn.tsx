import React, { useState } from "react";
import { logInPayload } from "../../types";
import "./Form.css";
type LogInProps = { onSubmit: (value: logInPayload) => any };

export const LogIn = ({onSubmit}: LogInProps) => {
  const [fields, setFields] = useState<logInPayload>({email: '', password: ''});
  const [active, setActive] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [event.target.name]: event.target.value,
    }));
    if (fields.email && fields.password) {
      setActive(true);
    } else {
      setActive(false);
    }
  };
  return (
    <div className="login-form">
      <div className="content">
        <div className="input-field">
          <input
            type="email"
            placeholder="Email"
            autoComplete="nope"
            name="email"
            value={fields.email}
            onChange={changeHandler}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            value={fields.password}
            onChange={changeHandler}
          />
        </div>
      </div>

      <div className="action">
        <button disabled={!active} onClick={() => onSubmit(fields)}>
          Log In
        </button>
      </div>
    </div>
  );
};
