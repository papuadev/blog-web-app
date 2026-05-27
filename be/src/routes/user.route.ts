import express from "express";
import {
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
