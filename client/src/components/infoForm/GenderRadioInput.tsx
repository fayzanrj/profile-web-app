/**
 * GenderRadioInput Component:
 * - Renders a react-hook-form Controller to display radios buttons for gender(Male/Female/Other)
 * - Checks for error if user tries to submit form without selecting a gender.
 *
 * Props:
 * - control : Control from react-hook-form.
 * - errors : Errors from react-hook-form
 * - getValues : getValues from react-hook-form
 * -
 */

import React from "react";
import { Controller } from "react-hook-form";

const GENDERS: string[] = ["Male", "Female", "Other"];

// Props
interface GenderRadioInputProps {
  control: any;
  errors: any;
  getValues: any;
}

const GenderRadioInput: React.FC<GenderRadioInputProps> = ({
  control,
  errors,
  getValues,
}) => {
  return (
    <div className="mx-auto mb-3">
      <label className="text-sm font-semibold text-gray-600">Gender</label>
      <br />
      {GENDERS.map((gender) => (
        <div key={gender} className="flex items-center mt-2 mr-4">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id={gender}
                type="radio"
                value={gender}
                checked={getValues("gender") === gender}
                className="mr-1"
              />
            )}
          />
          <label htmlFor={gender} className="mr-2">
            {gender}
          </label>
        </div>
      ))}
      {errors["gender"]?.message && (
        <span className="text-xs text-red-600">
          ({errors["gender"]?.message})
        </span>
      )}
    </div>
  );
};

export default GenderRadioInput;
