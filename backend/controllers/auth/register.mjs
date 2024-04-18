import User from "../../models/User.mjs";
import bcrypt from "bcryptjs";
export const Register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, mobileNumber } =
      req.body;
    let user = await User.findOne({ username: username });
    if (user) {
      return res
        .status(404)
        .json({ error: true, message: "Username Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
      mobileNumber: mobileNumber,
    }).save();
    user.password = undefined;
    return res.status(201).json({
      status: "success",
      data: user,
      message: "User Signedup successfully",
    });
  } catch (error) {
    next(error);
  }
};
