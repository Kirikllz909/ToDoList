import React, { useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { ToDoElement } from "./ToDoElement";

import "./styles/ToDoListView.css";

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

  //Function gets id and create new array without it
  function removeElement(id: string): void {
    let newArray: Array<IToDoElement> = ToDos.filter((value) => {
      return value.id !== id;
    });
    setToDos([...newArray]);
  }

  function changeComplete(id: string): void {
    let newArray: Array<IToDoElement> = ToDos;
    newArray.forEach((value) => {
      if (value.id === id)
        value.completed === false
          ? (value.completed = true)
          : (value.completed = false);
    });
    setToDos([...newArray]);
  }

  function editElement(id: string, newText: string) {
    let newArray: Array<IToDoElement> = ToDos;
    newArray.find((value) => {
      return value.id === id ? (value.toDoText = newText) : value;
    });
    setToDos([...newArray]);
  }

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
          <ToDoElement
            key={value.id}
            toDoElement={value}
            handleClick={removeElement}
            onChangeStatus={changeComplete}
          />
        );
      })}
    </div>
  );
};
