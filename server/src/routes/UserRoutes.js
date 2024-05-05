import express from "express";
import * as userControllers from "../controllers/User.js";
import VerifyFirebase from "../middlewares/VerifyFirebase.js";
import CheckData from "../middlewares/CheckData.js";

/**
 ** VerifyFirebase : Verifies token coming from frontend with firebase, and compares token's uid and requesting user's uid
 ** CheckData :  Ensures that receiving data is completed
 */

const router = express.Router();

// route to save user data
router.post(
  "/registerUser/:uid",
  VerifyFirebase,
  CheckData,
  userControllers.registerUser
);

// route to get user by username
router.get("/getUserByUsername/:username", userControllers.getUserByUsername);

// route to get user by UID
router.get("/getUser/:uid", userControllers.getUser);

// route to update user data
router.put(
  "/updateUser/:uid",
  VerifyFirebase,
  CheckData,
  userControllers.updateUser
);

// route to delete user
router.delete("/deleteUser/:uid", VerifyFirebase, userControllers.deleteUser);

export default router;
