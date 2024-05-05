/**
 ** All controllers for user endpoint
 */

import { admin } from "../index.js";
import handleInternalError from "../libs/HandleInternalError.js";
import User from "../models/UserModel.js";

// Function to save userdata
export const registerUser = async (req, res) => {
  try {
    const { userEmail, username } = req.body;

    // Checking if username or email already exists in database
    const userExists = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { userEmail: userEmail.toLowerCase() },
      ],
    });

    if (userExists) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Saving user data
    const user = await User.create({
      email: userEmail,
      ...req.body,
    });

    if (!user) return handleInternalError(res);

    // Response
    res.status(200).json({ message: "Changes have been saved" });
  } catch (error) {
    console.log(error);
    handleInternalError(res);
  }
};

export const getUser = async (req, res) => {
  try {
    // Finding user
    const user = await User.findOne({
      uid: req.params.uid,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Response
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    handleInternalError(res);
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    // Finding user
    const user = await User.findOne({
      username: req.params.username.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Response
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    handleInternalError(res);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    const { uid } = req.params;

    // Checking the username provided by the user already exists in the database
    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }],
    });
    // Checking if the user found by username is actually the requesting user
    if (existingUser && existingUser.uid !== uid) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Updating user data
    const updatedUser = await User.findOneAndUpdate(
      { uid },
      { ...req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Response
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    handleInternalError(res);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;

    // Deleting user from firebase
    await admin.auth().deleteUser(uid);
    // Deleting user from database
    const deletedUser = await User.deleteOne({ uid });

    if (!deletedUser.deletedCount) {
      return res.status(404).json({ message: "User not found" });
    }

    // Response
    res.status(200).json({ message: "Profile has been deleted" });
  } catch (error) {
    console.log(error);
    handleInternalError(res);
  }
};
