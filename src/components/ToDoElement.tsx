import React from "react";
import { IToDoElement } from "./ToDoListView";

import "./styles/ToDoListView.css";

interface IProps {
  toDoElement: IToDoElement;
  handleClick: (id: string) => void;
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
        <label className="border textPadding leftSide width75">
          {props.toDoElement.toDoText}
        </label>
        <div className="flexColumn textPadding border mr-3 ml-3">
          <label>
            Created date:{" "}
            {props.toDoElement.date.getDate() +
              "/" +
              (props.toDoElement.date.getUTCMonth() + 1)}
          </label>
          {/* For future development */}
          <label>Deadline date:</label>
        </div>
        <div>
          <button className="btn btn-info">E</button>
          <button
            className="btn btn-danger ml-3 mr-3"
            onClick={() => props.handleClick(props.toDoElement.id)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  );
};
