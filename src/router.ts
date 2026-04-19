import { Router } from "express";
import { body } from "express-validator";
import {
  signup,
  login,
  getUser,
  updateProfile,
  uploadImage,
  getUserByHandle,
  searchUserByHandle,
} from "./handlers";
import { handleInputErrors } from "./middlewares/validation";
import { isAuthenticated } from "./middlewares/auth";

const router = Router();

/* Authentication and registration */
router.post(
  "/auth/signup",
  body("email").isEmail().withMessage("You must enter a valid email address"),
  body("handle")
    .notEmpty()
    .withMessage("The handle is mandatory and cannot be empty"),
  body("password")
    .notEmpty()
    .withMessage("The password is mandatory and cannot be empty"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("The password must contain at least 8 characters"),
  handleInputErrors,
  signup,
);

/* Authentication and registration */
router.post(
  "/auth/login",
  body("email").isEmail().withMessage("You must enter a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("The password is mandatory and cannot be empty"),
  handleInputErrors,
  login,
);

router.get("/user", isAuthenticated, getUser);

router.patch(
  "/user",
  body("handle")
    .notEmpty()
    .withMessage("The handle is mandatory and cannot be empty"),
  handleInputErrors,
  isAuthenticated,
  updateProfile,
);

router.post("/user/image", isAuthenticated, uploadImage);

router.get("/:handle", getUserByHandle);

router.post(
  "/search",
  body("handle")
    .notEmpty()
    .withMessage("The handle is mandatory and cannot be empty"),
  handleInputErrors,
  searchUserByHandle,
);

export default router;
