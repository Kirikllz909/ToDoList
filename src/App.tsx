import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { v4 as uuid } from "uuid";

import "./components/ToDoList.tsx";
import { ToDoList } from "./components/ToDoList";
import { ToDoForm } from "./components/ToDoForm";

export interface IToDoElement {
  completed: boolean;
  id: string;
  toDoText: string;
  date: Date;
  deadlineDate?: Date; //TODO: adding search by deadline date
  keywords?: string; //TODO:  adding search by keywords
}

const App: React.FC = () => {
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
      <h1 className="h1 textAlignCenter">ToDo List</h1>
      <div className="divBorder">
        <h5 className="h5 ml-2 mt-2">Enter the action to add to the list:</h5>
        <ToDoForm onSubmit={setNewToDo} />
        <ToDoList currentToDoList={ToDos} />
      </div>
    </div>
  );
};

export default App;
