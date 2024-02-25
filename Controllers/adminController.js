import asyncHandler from "express-async-handler";
import adminGenToken from "../utils/adminGentoken.js";
import User from "../models/userModel.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });

  if (admin && admin.isAdmin ) {
    adminGenToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid data");
  }
});


const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const admin = await User.create({
    name,
    email,
    password,
  });

  if (admin) {
    adminGenToken(res, admin._id);
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " admin logout" });
});

const listUserProfile = asyncHandler(async (req, res) => {
  const userList = await User.find({ isAdmin: false });
  res.status(200).json(userList);
});




const editUserProfile = asyncHandler(async (req, res) => {
  const { userId, name, email } = req.body;

  if (!userId) {
    res.status(404);
    throw new Error("user updation failed");
  }
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("user updation failed");
  }
  user.name = name;
  user.email = email;

  await user.save();
  res.status(200).json({ message: "editUserProfile" });
});

const deleteUserData = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const delUser = await User.findByIdAndDelete(userId);
  
  if (delUser) {
    res.status(200).json({ message: "user deleted sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  try {
    
    const blockedUser = await User.findByIdAndUpdate(userId, { isBlocked: true });
    
    if (blockedUser) {

      res.status(200).json({ message: "User blocked successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  
  const unblockFalse = {
    isBlocked: false,
  };
  const blockUser = await User.findByIdAndUpdate(userId, unblockFalse);
  console.log("unblock",blockUser)
  if (blockUser) {
    res.status(200).json({ message: "user unblocked sucessfully" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
});
export {
  authAdmin,
  registerAdmin,
  editUserProfile,
  logoutAdmin,
  listUserProfile,
  deleteUserData,
  blockUser,
  unblockUser,
};