import React, { useState } from "react";

interface IProps {
  onSubmit: (
    text: string,
    startDate: Array<string>,
    endDate: Array<string>
  ) => void;
}

export const ToDoForm: React.FC<IProps> = (props) => {
  const [textValue, setTextValue] = useState<string>("");
  const [dateValue1, setDateValue1] = useState<string>("");
  const [dateValue2, setDateValue2] = useState<string>("");

  let inputRef: React.RefObject<HTMLInputElement>;
  inputRef = React.createRef();

  const formatSearch: RegExp = /^\d\d\/\d\d\/\d\d\d\d$/; //find in string dd/mm/yyyy

  //When "Enter" key is pressed in input element you add this action to todo list
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitChanges();
    }
  };

  function submitChanges(): void {
    if (textValue.length > 0) {
      props.onSubmit(
        textValue,
        dateValue1.match(formatSearch) || [],
        dateValue2.match(formatSearch) || []
      );
      if (inputRef.current) inputRef.current.value = "";
      setTextValue("");
      setDateValue1("");
      setDateValue2("");
    } else alert("Wrong action string");
  }

  //Handle change of input element
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  const handleDateInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue1(e.target.value);
  };

  const handleDateInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue2(e.target.value);
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
      <div className="flexColumn ml-2">
        <label>Start date:</label>
        <input
          placeholder="dd/mm/yyyy"
          value={dateValue1}
          onChange={handleDateInputChange1}
          onKeyPress={handleKeyPress}
        />
        <label>End date:</label>
        <input
          placeholder="dd/mm/yyyy"
          value={dateValue2}
          onChange={handleDateInputChange2}
          onKeyPress={handleKeyPress}
        />
      </div>
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
