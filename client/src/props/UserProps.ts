interface UserProps {
  email: string;
  username: string;
  name: string;
  profession: string;
  profilePic: string;
  educationLevel:
    | "High School"
    | "Associate Degree"
    | "Bachelor's Degree"
    | "Master's Degree"
    | "Doctorate Degree"
    | "Other";
  gender: "Male" | "Female" | "Other";
  phoneNumber: string;
  bio: string;
  coverPic: string;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}
