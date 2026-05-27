import express from "express";
import {
  createPost,
  getPosts,
  getPostByUserId,
  updatePost,
  deletePost,
  getPostById,
} from "../controllers/post.controller";
import { verifyToken } from "../middelwares/auth.middleware";

const router = express.Router();

router.get("/", getPosts);
router.get("/user/:id", getPostByUserId);
router.get("/:id", getPostById);
router.post("/", verifyToken, createPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
