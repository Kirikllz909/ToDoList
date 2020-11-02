import React from "react";
import { IToDoElement } from "./ToDoListView";

import "./styles/ToDoListView.css";

interface IProps {
  toDoElement: IToDoElement;
  handleClick: (id: string) => void;
  onChangeStatus: (id: string) => void;
}

export const ToDoElement: React.FC<IProps> = (props) => {
  let isEditing: number = 0;
  return (
    <div>
      <div className="parentFlex">
        <input
          type="checkbox"
          className="mr-4"
          checked={props.toDoElement.completed}
          onChange={() => props.onChangeStatus(props.toDoElement.id)}
        ></input>
        {isEditing === 0 ? (
          <label className="border textPadding leftSide width75">
            {props.toDoElement.toDoText}
          </label>
        ) : (
          <input className="border textPadding leftSide width75" />
        )}
        <div className="flexColumn textPadding border mr-3 ml-3">
          <label>
            Created date:{" "}
            {props.toDoElement.date.getDate() +
              "/" +
              (props.toDoElement.date.getMonth() + 1)}
          </label>
          {/* For future development */}
          <label>Deadline date:</label>
        </div>
        <div>
          <button
            className="btn btn-info"
            onClick={() => {
              isEditing === 0 ? (isEditing = 1) : (isEditing = 0);
              console.log(isEditing);
            }}
          >
            E
          </button>
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
