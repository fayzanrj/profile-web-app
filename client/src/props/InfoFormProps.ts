interface InfoFormProps {
  variant: "COMPLETE_PROFILE" | "UPDATE_PROFILE";
  name?: string;
  profilePic?: string;
  coverPic?: string;
  username?: string;
  profession?: string;
  bio?: string;
  educationLevel?:
    | "High School"
    | "Associate Degree"
    | "Bachelor's Degree"
    | "Master's Degree"
    | "Doctorate Degree"
    | "Other";
  gender?: "Male" | "Female" | "Other";
  phoneNumber?: string;
}

export default InfoFormProps;
