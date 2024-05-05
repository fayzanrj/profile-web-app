/**
 * InputField Component:
 * - Renders a input field that has a label.
 * - It is used in multiple components to maintain the style of the input field.
 * - Checks for error if user tries to submit form without filling the field.
 *
 * Props:
 * - register : Register from react-hook-form.
 * - errors : Errors from react-hook-form.
 * - isDisabled : Determines if the input field is disabled.
 * - id : Id of the input field, used for registering and combining label with input field.
 * - placeHolder : Place holder text for the input field.
 * - type : Type of the input field.
 * -
 */

import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import COLORS from "../../constants/Colors";

// Props
interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  isDisabled: boolean;
  type: "text" | "password" | "email" | "tel";
  errors: any;
  register: any;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  errors,
  register,
  isDisabled,
}) => {
  const [inputType, setInputType] = useState(type);

  // Function to toggle password visibility
  const showPassword = () =>
    setInputType((prev) => (prev === "password" ? "text" : "password"));

  return (
    <div className="my-3">
      {/* Label */}
      <label htmlFor={id} className="text-sm font-semibold text-gray-600">
        {label} {/* Displaying error message if present */}
        {errors[id]?.message && (
          <span className="text-xs text-red-600">({errors[id]?.message})</span>
        )}
      </label>

      <div className="relative w-full">
        {/* Input Field */}
        <input
          id={id}
          placeholder={placeholder}
          type={inputType}
          disabled={isDisabled}
          {...register(id)}
          className="w-full p-2 mt-2 border-2 rounded-lg outline-none"
        />

        {/* Show password button */}
        {type === "password" && (
          <button
            className="absolute -translate-y-1/2 right-5 top-[55%]"
            onClick={showPassword}
            type="button"
          >
            {/* Toggling eye icon based on password visibility */}
            {inputType === "password" ? (
              <IoEye color={COLORS.BG_PRIMARY} size={"1.2rem"} />
            ) : (
              <IoEyeOff color={COLORS.BG_PRIMARY} size={"1.2rem"} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
