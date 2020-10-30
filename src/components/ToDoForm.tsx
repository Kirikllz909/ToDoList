import React, { useState } from "react";

interface IProps {
  onSubmit: (text: string) => void;
}

export const ToDoForm: React.FC<IProps> = (props) => {
  const [textValue, setTextValue] = useState<string>("");
  let inputRef: React.RefObject<HTMLInputElement>;
  inputRef = React.createRef();

  //When "Enter" key is pressed in input element you add this action to todo list
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.onSubmit(textValue);
      inputRef.current!.value = "";
    }
  };

  //Handle change of input element
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="parentFlex">
      <input
        onChange={handleChange}
        placeholder="Enter the action here"
        type="text"
        ref={inputRef}
        className="form-control"
        onKeyPress={handleKeyPress}
      />
      <button
        type="button"
        onClick={() => {
          props.onSubmit(textValue);
          inputRef.current!.value = "";
        }}
        className="btn btn-primary inlineButton ml-2"
      >
        ADD
      </button>
    </div>
  );
};
