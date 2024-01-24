import React from "react";

function Input(props) {
  const {
    label,
    placeholder,
    type,
    isError = false,
    errorMsg = 'Please fill out this field.',
    onChange,
    onBlur,
    ...rest
  } = props;

  return (
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>

      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border ${
          isError && "border-red-500"
        } rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
        id="grid-first-name"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
      />

      {isError && (
        <p className="text-red-500 text-xs italic">
          {errorMsg}
        </p>
      )}
    </div>
  );
}

export default Input;
