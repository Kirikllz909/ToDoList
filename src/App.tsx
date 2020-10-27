import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

import "./components/ToDoList.tsx";
import { ToDoList } from "./components/ToDoList";

const App: React.FC = () => {
  return (
    <div>
      <h1 className="h1 textAlignCenter">ToDo List</h1>
      <div className="divBorder">
        <h5 className="h5 ml-2 mt-2">Enter the action to add to the list:</h5>
        <ToDoList />
      </div>
    </div>
  );
};

export default App;
