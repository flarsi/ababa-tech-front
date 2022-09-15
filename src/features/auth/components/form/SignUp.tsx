import React, { useState } from "react";
import { signUpPayload } from "../../types";
import "./Form.css";
type SignUpProps = {
  onSubmit: (value: signUpPayload) => any
};

export const SignUp = ({onSubmit}: SignUpProps) => {
  const [fields, setFields] = useState<signUpPayload>({email: '', password: '', name: ''});
  const [active, setActive] = useState<boolean>(false);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields((fields) => ({
      ...fields,
      [event.target.name]: event.target.value,
    }));
    if(fields.email && fields.name && fields.password){
      setActive(true)
    }else {
      setActive(false)
    }
  };

  return (
    <div className="login-form">
      <div className="content">
        <div className="input-field">
          <input
            type="text"
            placeholder="Name"
            autoComplete="new-Name"
            name="name"
            value={fields.name}
            onChange={changeHandler}
          />
        </div>
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
        <button disabled={!active} onClick={() => onSubmit(fields)}>Sign Up</button>
      </div>
    </div>
  );
};
