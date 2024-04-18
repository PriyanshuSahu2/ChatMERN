import User from "../../models/User.mjs";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const userInDB = await findUserByEmailOrUserName(usernameOrEmail);
console.log(userInDB)
    if (!userInDB) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isMatch = await bcryptjs.compare(password, userInDB.password);

    if (isMatch) {
      const accessToken = generateAccessToken(userInDB._id);
      const { password, ...userData } = userInDB._doc;
      return res.status(200).json({
        message: "Login successful",
        data: userData,
        token: accessToken,
      });
    } else {
      return res
        .status(401)
        .json({ status: 401, message: "Password does not match" });
    }
  } catch (err) {
    next(err);
  }
};

//find if user is using via email or mobile Number
export async function findUserByEmailOrUserName(usernameOrEmail) {
  return await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
  });
}

function generateAccessToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET
    // { expiresIn: "7D" } // Set an appropriate expiration time
  );
}
