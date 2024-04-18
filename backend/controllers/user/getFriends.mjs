import User from "../../models/User.mjs";

export const getFriends = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const friends = await User.findById(userId).select("friends");
    res
      .status(200)
      .json({
        status: "success",
        data: friends,
        message: "Friends Fetched Successfully",
      });
  } catch (error) {
    next(error);
  }
};
