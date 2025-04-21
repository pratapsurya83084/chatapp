import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let getToken = req.header("authorization");

    if (!getToken) {
      return res.status(401).json({ message: "Unauthorized access: No token provided" });
    }

    // Remove "Bearer " if present
    if (getToken.startsWith("Bearer ")) {
      getToken = getToken.split(" ")[1];
    }

    const decodedToken = jwt.verify(getToken, process.env.JWT_SECREATE);
    console.log(decodedToken);
    
    req.user = decodedToken;

    next(); // Move to the next middleware or route
  } catch (error) {
    console.error("JWT auth error:", error.message);
    res.status(401).json({ message: "Unauthorized access: Invalid or expired token" });
  }
};

export default auth;
