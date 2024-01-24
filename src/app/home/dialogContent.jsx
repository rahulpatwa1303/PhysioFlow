import React, { useReducer } from "react";
import Input from "@/components/Form/Input";

const initialState = {
  name: "Rahul Patwa",
  fee: "500",
  comment: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FEE":
      return { ...state, fee: action.payload };
    case "UPDATE_COMMENT":
      return { ...state, comment: action.payload };
    default:
      return state;
  }
};

function EditVisitInfo({ date,closeModel }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (type, value) => {
    dispatch({ type, payload: value });
  };

  const isUpdateDisabled = () => {
    // Check if any value is different from the initial state
    return (
      state.fee === initialState.fee && state.comment === initialState.comment
    );
  };

  const handleUpdateVisit = () => {
    closeModel()
  }

  const handleClose = () => {
    closeModel()
  }

  return (
    <div className="mt-4">
      <Input
        label={"Name"}
        placeholder={"Name"}
        disabled={true}
        value={state.name}
      />

      <div className="flex">
        <Input
          label={"Fee"}
          placeholder={"Fee"}
          value={state.fee}
          onChange={(e) => handleInputChange("UPDATE_FEE", e.target.value)}
        />
        <Input
          label={"Date"}
          type={"text"}
          placeholder={"Name"}
          disabled={true}
          value={date}
          data-date-format="DD/MMM"
        />
      </div>
      <Input
        label={"Comment"}
        placeholder={"Comment if any"}
        value={state.comment}
        onChange={(e) => handleInputChange("UPDATE_COMMENT", e.target.value)}
      />
      <div className="px-3 flex">
        <button
          type="button"
          className="px-6 py-3 font-semibold rounded bg-CornflowerBlue text-gray-800 disabled:bg-disabledColor"
          disabled={isUpdateDisabled()}
          onClick={handleUpdateVisit}
        >
          Update Visit
        </button>
        <button
          type="button"
          className="px-8 py-3 font-semibold rounded bg-white text-gray-800"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export { EditVisitInfo };
