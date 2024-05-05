/*
 ** CheckData : It ensures that the data coming from user is completed
 */

import handleInternalError from "../libs/HandleInternalError.js";

const CheckData = async (req, res, next) => {
  try {
    const {
      profession,
      username,
      educationLevel,
      gender,
      phoneNumber,
      name,
      profilePic,
      bio,
      coverPic,
    } = req.body;
    const { uid } = req.params;

    if (
      !profession ||
      !username ||
      !gender ||
      !educationLevel ||
      !name ||
      !uid ||
      !profilePic ||
      !phoneNumber ||
      !bio ||
      !coverPic
    ) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default CheckData;
