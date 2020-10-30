import React from "react";
import { IToDoElement } from "../App";

import "../App.css";

interface IProps {
  currentToDoList: Array<IToDoElement>;
}

export const ToDoList: React.FC<IProps> = (props) => {
  return (
    <div>
      {props.currentToDoList.map((value) => {
        return (
          <div key={value.id} className="parentFlex">
            <button className="btn-dark">{value.toDoText}</button>
          </div>
        );
      })}
    </div>
  );
};
