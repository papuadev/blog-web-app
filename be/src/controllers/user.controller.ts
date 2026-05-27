import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { updateUserSchema } from "../validations/user.validation";
import { handleValidationError } from "../utils/validation";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await prisma.user.findMany();
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await prisma.user.findUnique({
      where: { id },
    });
    if (!result) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const parsedData = updateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
      return handleValidationError(res, parsedData.error);
    }

    const id = Number(req.params.id);
    const { name } = parsedData.data;
    const result = await prisma.user.update({
      where: { id },
      data: {
        name,
      },
    });
    res.status(200).json({
      message: "Data updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update data" });
  }
};
