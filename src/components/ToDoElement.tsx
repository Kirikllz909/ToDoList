import React from "react";
import { IToDoElement } from "./ToDoListView";

import "./styles/ToDoListView.css";

interface IProps {
  toDoElement: IToDoElement;
}

export const ToDoElement: React.FC<IProps> = (props) => {
  return (
    <div>
      <div key={props.toDoElement.id} className="parentFlex">
        <input
          type="checkbox"
          className="mr-4"
          checked={props.toDoElement.completed}
        ></input>
        <label className="border textPadding leftSide limitWidth">
          {props.toDoElement.toDoText}
        </label>
        <div>
          <button className="btn btn-info">E</button>
          <button className="btn btn-danger ml-3 mr-3">X</button>
        </div>
      </div>
    </div>
  );
};
