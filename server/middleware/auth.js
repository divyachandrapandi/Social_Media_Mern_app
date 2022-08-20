// middleware
import jwt from "jsonwebtoken";

//wants to like the post --> click button --> auth middleware --> (NEXT)where permission granted --> like controller

// next --> do something and move next
const auth = async (req, res, next) => {
  try {
    // console.log("req from axios interceptors", req.headers);
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "testsecret");

      req.userId = decodedData?.id;

      // data from each specific token --> username, id
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
    // google auth
    // own auth
  } catch (error) {
    console.log(error);
  }
};

export default auth;
