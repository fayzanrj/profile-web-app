/**
 * InfoForm Component:
 * - Renders a form for users to complete or update their profile information.
 * - Handles form submission, including uploading profile and cover pictures to Firebase storage.
 * - Uses react-hook-form for form state management and validation.
 * - Displays loading screen while form submission is in progress.
 * - Navigates users to the user page after successful profile update.
 *
 * Props:
 * - variant: Indicates the purpose of the form (COMPLETE_PROFILE or UPDATE_PROFILE).
 * -
 * Rest of the props are optional and should only be passed when user is UPDATING PROFILE.
 * - name: User's name.
 * - profession: User's profession.
 * - profilePic: URL of user's profile picture.
 * - coverPic: URL of user's cover picture.
 * - username: User's username.
 * - gender: User's gender.
 * - educationLevel: User's education level.
 * - phoneNumber: User's phone number.
 * - bio: User's biography.
 */

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import COLORS from "../../constants/Colors";
import { handleApiError } from "../../libs/HandleApiError";
import UploadImageToFirebase from "../../libs/UploadImageToFirebase";
import InfoFormProps from "../../props/InfoFormProps";
import {
  AdditionalInfoInputType,
  AdditionalInfoSchema,
} from "../../utilities/formSchema/AdditionalInfoFormSchema";
import InputField from "../shared/InputField";
import ScreenLoader from "../shared/ScreenLoader";
import EducationSelectInput from "./EducationSelectInput";
import GenderRadioInput from "./GenderRadioInput";
import ImageUploader from "./ImageUploader";

const InfoForm: React.FC<InfoFormProps> = ({
  variant,
  name = "",
  profession = "",
  profilePic = "",
  coverPic = "",
  username = "",
  gender = "Other",
  educationLevel = "High School",
  phoneNumber = "",
  bio = "",
}) => {
  // States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [coverPicFile, setCoverPicFile] = useState<File | null>(null);
  const [imagesPrev, setImagesPrev] = useState({
    profilePic: profilePic,
    coverPic: coverPic,
  });
  const nav = useNavigate();

  // useForm hook to handle form state and validation
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<AdditionalInfoInputType>({
    resolver: zodResolver(AdditionalInfoSchema),
  });

  // Settings values for the form if the variant is UPDATE PROFILE
  useEffect(() => {
    if (variant === "UPDATE_PROFILE") {
      setValue("name", name);
      setValue("profession", profession);
      setValue("username", username);
      setValue("educationLevel", educationLevel);
      setValue("gender", gender);
      setValue("phoneNumber", phoneNumber);
      setValue("bio", bio);
    }
  }, []);

  // Form submission handler
  const handleFormSubmit: SubmitHandler<AdditionalInfoInputType> = async (
    data
  ) => {
    try {
      setIsLoading(true);

      // TODO : TEST
      if (
        (variant === "COMPLETE_PROFILE" && !profilePicFile) ||
        (variant === "COMPLETE_PROFILE" && !coverPicFile)
      ) {
        toast.error("Please upload both profile pic and cover pic.");
        setIsLoading(false);
        return;
      }

      // Uploading pics if there are pics selected
      const promises: Promise<string | undefined>[] = [];

      if (profilePicFile) {
        promises.push(
          UploadImageToFirebase(profilePicFile, `${data.username}profilePic`)
        );
      }

      if (coverPicFile) {
        promises.push(
          UploadImageToFirebase(coverPicFile, `${data.username}coverPic`)
        );
      }

      // Retrieving uploaded pics urls
      const [profilePicUrl, coverPicUrl] = await Promise.all(promises);
      const accessToken = localStorage.getItem("profile_accessToken") || "";

      // API CALL
      const apiUrl = `${import.meta.env.VITE_SERVER_HOST}/api/v1/user/${
        variant === "COMPLETE_PROFILE" ? "registerUser" : "updateUser"
      }/${localStorage.getItem("profile_uid")}`;

      const method = variant === "COMPLETE_PROFILE" ? "POST" : "PUT";

      await axios.request({
        method,
        url: apiUrl,
        data: {
          ...data,
          profilePic: profilePicUrl || profilePic,
          coverPic: coverPicUrl || coverPic,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Profile updated successfully!");
      // Naviagting
      nav("/user");
    } catch (error) {
      console.error("Error:", error);
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Displaying loading screen while fetching user data
  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <form
      className="w-full px-2 py-8 max-w-96"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {/* Form title */}
      <h1 className="my-3 text-2xl font-bold">
        {variant === "COMPLETE_PROFILE" ? "COMPLETE" : "UPDATE"} YOUR PROFILE
      </h1>

      {/* Profile pic image uploader */}
      <ImageUploader
        label="Profile Pic"
        setImage={setProfilePicFile}
        setPreview={setImagesPrev}
        preview={imagesPrev}
      />

      {/* Cover pic image uploader */}
      <ImageUploader
        label="Cover Pic"
        setImage={setCoverPicFile}
        setPreview={setImagesPrev}
        preview={imagesPrev}
      />

      {/* Name input field */}
      <InputField
        id="name"
        label="Full Name"
        placeholder="e.g. John Doe"
        type="text"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Username input field */}
      <InputField
        id="username"
        label="Username"
        placeholder="e.g. john_doe"
        type="text"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Phone number input field */}
      <InputField
        id="phoneNumber"
        label="Phone number"
        placeholder="e.g. 0921234567890"
        type="tel"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Bio input field */}
      <InputField
        id="bio"
        label="Bio"
        placeholder="e.g. I am a very enthusiast person"
        type="text"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Profession input field */}
      <InputField
        id="profession"
        label="Profession"
        placeholder="e.g. Software Developer"
        type="text"
        errors={errors}
        register={register}
        isDisabled={isLoading}
      />

      {/* Drop down menu for eduation level */}
      <EducationSelectInput control={control} errors={errors} />
      {/* Radio buttons for gender*/}
      <GenderRadioInput
        control={control}
        errors={errors}
        getValues={getValues}
      />

      {/* Submit button */}
      <button
        className="relative w-full h-10 my-4 text-lg text-white rounded-md disabled:opacity-50"
        style={{ backgroundColor: COLORS.BG_PRIMARY }}
        type="submit"
        disabled={isLoading}
      >
        Save Info
      </button>
    </form>
  );
};

export default InfoForm;
