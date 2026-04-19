import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import slugify from "slugify";
import formidable, { errors as formidableErrors } from "formidable";
import { v4 as uuidv4 } from "uuid";
import User from "../models/user.model";
import { hashPassword, validatePassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ error: "User already registered" });
      return;
    }

    const handle = slugify(req.body.handle, "");
    const existingHandle = await User.findOne({ handle });
    if (existingHandle) {
      res.status(409).json({ error: "Handle already registered" });
      return;
    }

    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;
    await user.save();

    res.status(201).send("User successfully created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ error: "Unregistered user" });
      return;
    }

    const isValidPassword = await validatePassword(
      password,
      existingUser.password,
    );
    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = generateJWT({ id: existingUser._id });

    res.status(200).send(token);
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  res.json(req.user);
};

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { description, links } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const handle = slugify(req.body.handle, "");
    const existingHandle = await User.findOne({ handle });
    if (existingHandle && existingHandle.email !== req.user.email) {
      res.status(409).json({ error: "Handle already registered" });
      return;
    }

    req.user.description = description;
    req.user.handle = handle;
    req.user.links = links;
    await req.user.save();

    res.send("Profile successfully updated");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadImage = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const form = formidable({ multiples: false });
  try {
    form.parse(req, (error, fields, files) => {
      if (!files?.file) {
        res.status(400).json({
          error: "Bad Request",
          message: "No files have been provided for upload",
        });
        return;
      }

      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuidv4() },
        async function (error, result) {
          if (error) {
            console.error("Error uploading image:", error);
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          if (result) {
            if (!req.user) {
              res.status(401).json({ error: "Unauthorized" });
              return;
            }

            req.user.image = result.secure_url;
            await req.user.save();
            // res.send("Image successfully uploaded");
            res.json({ image: result.secure_url });
          }
        },
      );
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByHandle = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { handle } = req.params;

    const user = await User.findOne({ handle }).select(
      "-_id -__v -email -password",
    );
    if (!user) {
      const error = new Error("Error getting the user");
      res.status(404).json({
        error: error.message,
      });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error getting user by handle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUserByHandle = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { handle } = req.body;

    const user = await User.findOne({ handle });
    if (user) {
      const error = new Error(`Handle ${handle} is not available`);
      res.status(409).json({
        error: error.message,
      });
      return;
    }

    res.send(`Handle ${handle} is available`);
  } catch (error) {
    console.error("Error searching for user by handle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
