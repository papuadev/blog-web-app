import type { Response } from "express";
import { ZodError } from "zod";

export const handleValidationError = (res: Response, error: ZodError) => {
  return res.status(400).json({
    message: "Validation error",
    errors: error.issues.map((issue) => ({
      field: issue.path[0],
      error_message: issue.message,
    })),
  });
};
