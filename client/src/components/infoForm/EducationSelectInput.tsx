/**
 * EducationSelectInput Component:
 * - Renders a react-hook-form Controller to display a select input (drop down menu) to set the user's education level
 * - Checks for error if user tries to submit form without selecting an education level.
 *
 * Props:
 * - control : Control from react-hook-form.
 * - errors : Errors from react-hook-form
 * -
 */

import React from "react";
import { Controller } from "react-hook-form";

const EDUCATION_LEVELS: string[] = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate Degree",
  "Other",
];

// Props
interface EducationSelectInputProps {
  control: any;
  errors: any;
}

const EducationSelectInput: React.FC<EducationSelectInputProps> = ({
  control,
  errors,
}) => {
  return (
    <div className="mx-auto mb-3">
      <label
        htmlFor={"educationLevel"}
        className="text-sm font-semibold text-gray-600"
      >
        Education level
        {errors["educationLevel"]?.message && (
          <span className="text-xs text-red-600">
            ({errors["educationLevel"]?.message})
          </span>
        )}
      </label>
      <br />
      <Controller
        name={"educationLevel"}
        control={control}
        render={({ field }) => (
          <select
            id={"educationLevel"}
            {...field}
            className="w-full p-2 mt-2 border-2 rounded-lg outline-none"
          >
            <option value="">Select an option</option>
            {EDUCATION_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
};
export default EducationSelectInput;
