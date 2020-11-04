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
  deadlineDate: Date; //TODO: adding search by deadline date
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

  //Change complete status of element
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

  function handleEdit(
    id: string,
    newText: string,
    startDate: Array<string>,
    deadlineDate: Array<string>
  ) {
    let newArray: Array<IToDoElement> = ToDos;

    newArray.forEach((value) => {
      if (value.id === id) {
        if (value.toDoText !== newText) value.toDoText = newText;
        value.date = generateDate(startDate);
        value.deadlineDate = generateDate(deadlineDate);
      }
    });
    setToDos([...newArray]);
    console.log(ToDos);
  }

  //Get array with string and parse day, month and year from it
  function generateDate(date: Array<string>): Date {
    let newDate = new Date();
    let dateInfo: Array<string>;

    if (date.length > 0) {
      dateInfo = date[0].split("/");
      newDate.setFullYear(
        Number(dateInfo[2]),
        Number(dateInfo[1]) - 1,
        Number(dateInfo[0])
      );
    }
    return newDate;
  }

  //Creating new ToDoElement and add it to list
  function setNewToDo(
    text: string,
    startDate: Array<string>,
    endDate: Array<string>
  ): void {
    let currentToDoList: Array<IToDoElement> = ToDos;
    currentToDoList.push({
      completed: false,
      id: uuid(),
      toDoText: text,
      date: generateDate(startDate),
      deadlineDate: generateDate(endDate),
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
            handleEdit={handleEdit}
          />
        );
      })}
    </div>
  );
};
