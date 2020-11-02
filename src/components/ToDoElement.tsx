import React, { useState } from "react";
import { IToDoElement } from "./ToDoListView";

import "./styles/ToDoListView.css";

interface IProps {
  toDoElement: IToDoElement;
  handleClick: (id: string) => void;
  onChangeStatus: (id: string) => void;
  handleEdit: (id: string, newText: string) => void;
}

export const ToDoElement: React.FC<IProps> = (props) => {
  const [isEditing, setEditing] = useState<Boolean>(false);
  const [text, setText] = useState<string>(props.toDoElement.toDoText);
  let initialText: string = props.toDoElement.toDoText;

  //When "Enter" key is pressed in input element you add this action to todo list
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (text.length > 0) {
        props.handleEdit(props.toDoElement.id, text);
        setEditing(false);
        initialText = text;
      } else {
        cancelChanges();
        alert("Text length is 0. Return to previous text");
      }
    }
  };

  //remove editing mode and return text state to previous successful setText
  function cancelChanges(): void {
    setEditing(false);
    setText(initialText);
  }

  function submitChanges(): void {
    if (text.length > 0) {
      props.handleEdit(props.toDoElement.id, text);
      setEditing(false);
      initialText = text;
    } else {
      cancelChanges();
      alert("Text length is 0. Return to previous text");
    }
  }

  //Handle change of input element
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <div className="parentFlex">
        <input
          type="checkbox"
          className="mr-4"
          checked={props.toDoElement.completed}
          onChange={() => props.onChangeStatus(props.toDoElement.id)}
        />
        {isEditing === false ? (
          <label className="border textPadding leftSide width75">
            {props.toDoElement.toDoText}
          </label>
        ) : (
          <input
            autoFocus
            className="border textPadding leftSide width70"
            value={text}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
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
          {isEditing === false ? (
            <button
              className="btn btn-info"
              onClick={() => {
                setEditing(!isEditing);
              }}
            >
              Edit
            </button>
          ) : (
            <>
              <button className="btn btn-info" onClick={submitChanges}>
                Submit Changes
              </button>
              <button className="btn btn-danger" onClick={cancelChanges}>
                Cancel
              </button>
            </>
          )}
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
