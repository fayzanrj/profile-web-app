/**
 * ImagePicker Component:
 * - Renders a file input field and a button.
 * - User can select image by clicking button.
 * - After user selects the image, it previews the image inside that button.
 * - It set's and preview's image based on the label (Cover Pic or Profile Pic).
 *
 * Props:
 * - label : Profile Pic or Cover Pic
 * - setImage : To set the selected file
 * - preview : To preview the selected image
 * - setPreview : To set the selected image oject url
 * -
 */

import React from "react";

// Props
interface ImagePickerProps {
  label: "Profile Pic" | "Cover Pic";
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  preview: { profilePic: string; coverPic: string };
  setPreview: React.Dispatch<
    React.SetStateAction<{ profilePic: string; coverPic: string }>
  >;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  setImage,
  preview,
  setPreview,
}) => {
  // Function to handle Image change function
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      if (label === "Profile Pic") {
        setPreview((prev) => ({
          ...prev,
          profilePic: URL.createObjectURL(file),
        }));
      } else {
        setPreview((prev) => ({
          ...prev,
          coverPic: URL.createObjectURL(file),
        }));
      }
    }
  };

  // Function to click input button
  const clickFileInput = () => {
    const fileInput = document.getElementById(label) as HTMLInputElement;
    fileInput.click();
  };

  return (
    <div>
      <label
        htmlFor="imageUpload"
        className="text-sm font-semibold text-gray-600"
      >
        {label}
      </label>

      {/* Input field for file */}
      <input
        id={label}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <div className="text-center">
        {/* Input button */}
        <button
          type="button"
          onClick={clickFileInput}
          className={`  bg-gray-200 text-2xl ${
            label === "Profile Pic"
              ? "w-24 h-24 rounded-full"
              : "w-64 h-36 rounded-sm my-2"
          }`}
        >
          {label === "Profile Pic" ? (
            preview.profilePic ? (
              <img
                src={preview.profilePic}
                alt="Profile Preview"
                className="w-24 h-24 mx-auto bg-gray-300 border border-gray-300 rounded-full "
              />
            ) : (
              "+"
            )
          ) : preview.coverPic ? (
            <img
              src={preview.coverPic}
              alt="Cover Preview"
              className="object-cover w-64 mx-auto bg-gray-300 border border-gray-300 h-36"
            />
          ) : (
            "+"
          )}
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
