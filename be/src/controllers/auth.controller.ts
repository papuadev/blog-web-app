import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { handleValidationError } from "../utils/validation";
import { parse } from "node:path";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
      return handleValidationError(res, parsedData.error);
    }

    const { name, email, password } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      message: "success",
      user: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
      return handleValidationError(res, parsedData.error);
    }

    const { email, password } = parsedData.data;

    const result = await prisma.user.findUnique({
      where: { email },
    });

    if (!result) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: result.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" },
    );

    const { password: _, ...userWithoutPassword } = result;

    res.status(200).json({
      message: "success",
      token,
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
