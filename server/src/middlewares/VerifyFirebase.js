/*
 ** VerifyFirebase : Verfies token and uid, provides uid and email extracted from token to request body to save in the database
 */

import { admin } from "../index.js";
import handleInternalError from "../libs/HandleInternalError.js";

const VerifyFirebase = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const uid = req.params.uid;

    // Verifying token
    const code = await admin.auth().verifyIdToken(token);

    if (!code || code.uid !== uid) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    // Setting uid and email
    req.body.uid = code.uid;
    req.body.userEmail = code.email;
    req.body.mailProfilePic = code.picture;

    next();
  } catch (error) {
    console.error(error);
    handleInternalError(res);
  }
};

export default VerifyFirebase;
