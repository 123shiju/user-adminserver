import express from "express";
import { AdminProtect } from "../middleware/adminAuthMiddleware.js";
const router = express.Router();

import {
  authAdmin,
  editUserProfile,
  listUserProfile,
  logoutAdmin,
  registerAdmin,
  deleteUserData,
  blockUser,
  unblockUser,
} from "../Controllers/adminController.js";

router.post("/auth", authAdmin);

router.post("/", registerAdmin);

router.post("/logout", logoutAdmin);

router.get("/users-list", listUserProfile);

router.put("/edit-user", AdminProtect, editUserProfile);

router.post(
  "/delete-user",

  AdminProtect,
  deleteUserData
);
router.post("/block-user", blockUser);
router.post("/unblock-user", unblockUser);

export default router;