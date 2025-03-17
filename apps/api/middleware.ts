import type { NextFunction, Request, Response } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = "4";
  next();
}