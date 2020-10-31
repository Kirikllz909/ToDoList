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
      if (textValue.length > 0) {
        props.onSubmit(textValue);
        if (inputRef.current) inputRef.current.value = "";
        setTextValue("");
      } else alert("Wrong action string");
    }
  };

  function submitChanges(): void {
    if (textValue.length > 0) {
      props.onSubmit(textValue);
      if (inputRef.current) inputRef.current.value = "";
      setTextValue("");
    } else alert("Wrong action string");
  }

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
          submitChanges();
        }}
        className="btn btn-primary inlineButton ml-2"
      >
        ADD
      </button>
    </div>
  );
};
