import React, { useState } from "react";
import { IToDoElement } from "./ToDoListView";

import "./styles/ToDoListView.css";

interface IProps {
  toDoElement: IToDoElement;
  handleClick: (id: string) => void;
  onChangeStatus: (id: string) => void;
  handleEdit: (
    id: string,
    newText: string,
    startDate: Array<string>,
    deadlineDate: Array<string>
  ) => void;
}

export const ToDoElement: React.FC<IProps> = (props) => {
  const [isEditing, setEditing] = useState<Boolean>(false);
  const [text, setText] = useState<string>(props.toDoElement.toDoText);
  const [startDateValue, setStartDateValue] = useState<string>(
    `${
      props.toDoElement.date.getDate() < 10
        ? "0" + props.toDoElement.date.getDate()
        : props.toDoElement.date.getDate()
    }/${
      props.toDoElement.date.getMonth() + 1 < 10
        ? "0" + (props.toDoElement.date.getMonth() + 1)
        : props.toDoElement.date.getMonth() + 1
    }/${props.toDoElement.date.getFullYear()}`
  );
  const [deadlineDateValue, setDeadlineDateValue] = useState<string>(
    `${
      props.toDoElement.deadlineDate.getDate() < 10
        ? "0" + props.toDoElement.deadlineDate.getDate()
        : props.toDoElement.deadlineDate.getDate()
    }/${
      props.toDoElement.deadlineDate.getMonth() + 1 < 10
        ? "0" + (props.toDoElement.deadlineDate.getMonth() + 1)
        : props.toDoElement.deadlineDate.getMonth() + 1
    }/${props.toDoElement.deadlineDate.getFullYear()}`
  );

  const formatSearch: RegExp = /^\d\d\/\d\d\/\d\d\d\d$/;
  let initialText: string = props.toDoElement.toDoText;

  let lastDeadlineDateValue: string = `${
    props.toDoElement.deadlineDate.getDate() < 10
      ? "0" + props.toDoElement.deadlineDate.getDate()
      : props.toDoElement.deadlineDate.getDate()
  }/${
    props.toDoElement.deadlineDate.getMonth() + 1 < 10
      ? "0" + (props.toDoElement.deadlineDate.getMonth() + 1)
      : props.toDoElement.deadlineDate.getMonth() + 1
  }/${props.toDoElement.deadlineDate.getFullYear()}`;

  let lastStartDateValue: string = `${
    props.toDoElement.date.getDate() < 10
      ? "0" + props.toDoElement.date.getDate()
      : props.toDoElement.date.getDate()
  }/${
    props.toDoElement.date.getMonth() + 1 < 10
      ? "0" + (props.toDoElement.date.getMonth() + 1)
      : props.toDoElement.date.getMonth() + 1
  }/${props.toDoElement.date.getFullYear()}`;

  //When "Enter" key is pressed in input element you add this action to todo list
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submitChanges();
  };

  //remove editing mode and return text state to previous successful state
  function cancelChanges(): void {
    setEditing(false);
    setText(initialText);
    setStartDateValue(lastStartDateValue);
    setDeadlineDateValue(lastDeadlineDateValue);
  }

  function submitChanges(): void {
    let startDateInfo: Array<string> = startDateValue.match(formatSearch) || [];
    let deadlineDateInfo: Array<string> =
      deadlineDateValue.match(formatSearch) || [];
    if (text.length > 0) {
      if (startDateInfo.length === 0 || deadlineDateInfo.length === 0) {
        if (startDateInfo.length === 0)
          alert("Wrong start date info. Please try again or cancel changes");
        if (deadlineDateInfo.length === 0)
          alert("Wrong deadline date info. Please try again or cancel changes");
        return;
      }
      props.handleEdit(
        props.toDoElement.id,
        text,
        startDateValue.match(formatSearch) || [],
        deadlineDateValue.match(formatSearch) || []
      );
      setEditing(false);
      setDeadlineDateValue(
        `${
          props.toDoElement.deadlineDate.getDate() < 10
            ? "0" + props.toDoElement.deadlineDate.getDate()
            : props.toDoElement.deadlineDate.getDate()
        }/${
          props.toDoElement.deadlineDate.getMonth() + 1 < 10
            ? "0" + (props.toDoElement.deadlineDate.getMonth() + 1)
            : props.toDoElement.deadlineDate.getMonth() + 1
        }/${props.toDoElement.deadlineDate.getFullYear()}`
      );
      setStartDateValue(
        `${
          props.toDoElement.date.getDate() < 10
            ? "0" + props.toDoElement.date.getDate()
            : props.toDoElement.date.getDate()
        }/${
          props.toDoElement.date.getMonth() + 1 < 10
            ? "0" + (props.toDoElement.date.getMonth() + 1)
            : props.toDoElement.date.getMonth() + 1
        }/${props.toDoElement.date.getFullYear()}`
      );
      initialText = text;
      lastStartDateValue = startDateValue;
      lastDeadlineDateValue = deadlineDateValue;
    } else {
      alert("Text length is 0.");
    }
  }

  //Handle change of input element
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateValue(e.target.value);
  };
  const handleDeadlineDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadlineDateValue(e.target.value);
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
        {!isEditing ? (
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
          {!isEditing ? (
            <>
              <label>
                Start date: <br />
                {props.toDoElement.date.getDate() +
                  "/" +
                  (props.toDoElement.date.getMonth() + 1) +
                  "/" +
                  props.toDoElement.date.getFullYear()}
              </label>
              <label>
                Deadline date:
                <br />
                {props.toDoElement.deadlineDate.getDate() +
                  "/" +
                  (props.toDoElement.deadlineDate.getMonth() + 1) +
                  "/" +
                  props.toDoElement.deadlineDate.getFullYear()}
              </label>
            </>
          ) : (
            <>
              Start date: <br />
              <input
                onChange={handleStartDateChange}
                onKeyPress={handleKeyPress}
                value={startDateValue}
              />
              Deadline date:
              <br />
              <input
                onChange={handleDeadlineDateChange}
                onKeyPress={handleKeyPress}
                value={deadlineDateValue}
              />
            </>
          )}
        </div>
        <div>
          {!isEditing ? (
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
