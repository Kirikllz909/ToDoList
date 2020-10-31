import React, { useState } from "react";
import { ToDoForm } from "./ToDoForm";

import "../App.css";

import { v4 as uuid } from "uuid";

export interface IToDoElement {
  completed: boolean;
  id: string;
  toDoText: string;
  date: Date;
  deadlineDate?: Date; //TODO: adding search by deadline date
  keywords?: string; //TODO:  adding search by keywords
}

export const ToDoListView: React.FC = () => {
  const [ToDos, setToDos] = useState<Array<IToDoElement>>([]);

  function setNewToDo(text: string): void {
    let currentToDoList: Array<IToDoElement> = ToDos;

    currentToDoList.push({
      completed: false,
      id: uuid(),
      toDoText: text,
      date: new Date(),
    });
    setToDos([...currentToDoList]);
  }
  return (
    <div>
      <ToDoForm onSubmit={setNewToDo} />
      {ToDos.map((value) => {
        return (
          <div key={value.id} className="parentFlex">
            <button className="btn-dark">{value.toDoText}</button>
          </div>
        );
      })}
    </div>
  );
};
