import {
  Router
} from "express";
import rateLimit from "express-rate-limit";

import {
  register,
  login,
  getMe
} from "../controllers/auth.controller";

import {
  protect
} from "../middleware/auth.middleware";

const router =
  Router();

const authLimiter =
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many authentication attempts"
    }
  });

router.post(
  "/register",
  authLimiter,
  register
);

router.post(
  "/login",
  authLimiter,
  login
);

router.get(
  "/me",
  protect,
  getMe
);

export default router;
