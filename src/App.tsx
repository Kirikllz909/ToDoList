import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

import "./components/ToDoList.tsx";
import { ToDoList } from "./components/ToDoList";
import { ToDoForm } from "./components/ToDoForm";

interface IToDoElement {
  id: string;
  text: string;
  date: Date;
  keywords?: string; //TODO:  adding search by keywords
}

const App: React.FC = () => {
  const [ToDos, setToDos] = useState<Array<IToDoElement>>([]);

  function setNewToDo(text: string): void {
    console.log(text);
  }

  return (
    <div>
      <h1 className="h1 textAlignCenter">ToDo List</h1>
      <div className="divBorder">
        <h5 className="h5 ml-2 mt-2">Enter the action to add to the list:</h5>
        <ToDoForm onSubmit={setNewToDo} />
        <ToDoList />
      </div>
    </div>
  );
};

export default App;
