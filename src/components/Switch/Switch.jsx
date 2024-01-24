import React from "react";

function Switch({ handleChange, isChecked,optionLeft,optionRight }) {
  return (
    <>
      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-3xl bg-grayAlpha30 p-1">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded-3xl py-2 px-[18px] text-sm font-normal ${
            !isChecked ? "text-CornflowerBlue bg-white drop-shadow" : "text-body-color"
          }`}
        >
          {optionLeft}
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded-3xl py-2 px-[18px] text-sm font-normal ${
            isChecked ? "text-CornflowerBlue bg-white drop-shadow" : "text-body-color"
          }`}
        >
          {optionRight}
        </span>
      </label>
    </>
  );
}

export default Switch;
