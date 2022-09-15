import React, { useState } from "react";
import { film } from "../types";
import "./Form.css";

type FormType = {
  onSubmit: Function
} 
function Form({onSubmit}: FormType) {
    const [fields, setFields] = useState<film>({title: '', description: ''});
    const [active, setActive] = useState<boolean>(false);
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFields((fields) => ({
        ...fields,
        [event.target.name]: event.target.value,
      }));
      if (fields.title && fields.description) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    
  return (
    <div className="form">
      <div className="content">
        <div className="input-field">
          <input
            type="text"
            placeholder="Title"
            autoComplete="nope"
            name="title"
              value={fields.title}
              onChange={changeHandler}
          />
        </div>
        <div className="input-field">
          <textarea
            placeholder="Description"
            autoComplete="new-password"
            name="description"
              value={fields.description}
              onChange={changeHandler}
          />
        </div>
      </div>
      <div className="action">
        <button disabled={!active} onClick={() => onSubmit(fields)}>
          create
        </button>
      </div>
    </div>
  );
}

export default Form;
