import { Request, Response, NextFunction } from "express";

import User from "../models/User";

import {
  createUser,
  validateUser
} from "../services/auth.service";

import { generateToken } from "../utils/generateToken";

import {
  registerSchema,
  loginSchema
} from "../validators/auth.validator";

export const register =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validated =
        registerSchema.parse(
          req.body
        );

      const user =
        await createUser(
          validated
        );

      const token =
        generateToken(
          user.id,
          user.role
        );

      res.status(201).json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  };

export const login =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const validated =
        loginSchema.parse(
          req.body
        );

      const user =
        await validateUser(
          validated.email,
          validated.password
        );

      const token =
        generateToken(
          user.id,
          user.role
        );

      res.json({
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      next(error);
    }
  };

export const getMe =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user =
        await User.findById(
          req.user?.id
        ).select(
          "-password"
        );

      res.json({
        success: true,
        user
      });
    } catch (error) {
      next(error);
    }
  };
