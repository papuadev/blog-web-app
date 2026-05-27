import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { handleValidationError } from "../utils/validation";
import { postSchema } from "../validations/post.validation";

export const createPost = async (req: Request, res: Response) => {
  try {
    const parsedData = postSchema.safeParse(req.body);

    if (!parsedData.success) {
      return handleValidationError(res, parsedData.error);
    }

    const { title, content } = parsedData.data;
    const userId = (req as any).user.id;

    const result = await prisma.post.create({
      data: {
        title,
        content,
        userId,
      },
    });
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await prisma.post.findUnique({
      where: { id },
    });

    if (!result) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPostByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);

    const result = await prisma.post.findMany({
      where: { userId },
    });

    if (!result.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const parsedData = postSchema.safeParse(req.body);

    if (!parsedData.success) {
      return handleValidationError(res, parsedData.error);
    }
    const { title, content } = parsedData.data;

    const id = Number(req.params.id);

    const result = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found. Nothing to delete." });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({
      message: "success",
      deletePost: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
