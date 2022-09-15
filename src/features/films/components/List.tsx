import React from "react";
import { film } from "../types";
import "./List.css";
type ListType = {
  list: film[];
  onDelete: Function
};
function List({ list, onDelete }: ListType) {
  return (
    <div>
      <ol className="list">
        {list.map(({ title, description, id}, index) => (
          <li className="item" key={id}>
            <h2 className="headline">{title}</h2>
            <span>{description}</span>
            <button onClick={() => onDelete(id)}>delete</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default List;
