import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface MyContext {
  req: Request;
  res: Response;
  userId?: number,
}

export interface AccessTokenPayload extends JwtPayload {
  userId: number,
} 

export interface RefreshTokenPayload extends AccessTokenPayload{
  tokenVersion?: number
}