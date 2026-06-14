import bcrypt from "bcryptjs";
import User from "../models/User";
import { RegisterInput } from "../validators/auth.validator";

export const createUser = async (
  data: RegisterInput
) => {
  const existingUser =
    await User.findOne({
      email: data.email
    });

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      12
    );

  const user =
    new User({
      ...data,
      password: hashedPassword
    });

  await user.save();

  return user;
};

export const validateUser =
  async (
    email: string,
    password: string
  ) => {
    const user =
      await User.findOne({
        email
      }).select("+password");

    if (!user) {
      throw new Error(
        "Invalid Credentials"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Invalid Credentials"
      );
    }

    return user;
  };
