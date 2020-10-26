import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  return (
    <div>
      <h1 className="h1 textAlignCenter">ToDo List</h1>
      <div className="divBorder">
        <h5 className="h5 ml-2 mt-2">Enter the action to add to the list:</h5>
        <div className="parentFlex">
          <input type="text" className="form-control" />
          <button className="btn btn-primary inlineButton ml-2">ADD</button>
        </div>
      </div>
    </div>
  );
}

export default App;
