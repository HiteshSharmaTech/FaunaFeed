import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { application } from "express";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      `Error occured while generating tokens : ${error.message}`
    );
  }
};

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, `Unauthorized access : $`);
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(402, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(403, "Refresh token is used or expired");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, userName, password } = req.body;
  if (!((email || userName) && password)) {
    throw new ApiError(402, "User must provide all the required credentials");
  }
  const user = await User.findOne({ $or: [{ email }, { userName }] });
  if (!user) {
    throw new ApiError(404, "User with following credentials does not exist");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(405, "Incorrect password ");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(220)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", refreshToken)
    .json(
      new ApiResponse(
        220,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(240)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(240, {}, "User logged out successfully"));
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, userName, password, isRemember } = req.body;
  if (!name && !email && !userName && !password) {
    throw new ApiError(405,"All the fields are required")
  }
 const existedUser = await User.findOne({$or:[{email},{userName}]})
  if (existedUser) {
   throw new ApiError(401,"User with following credentials already exists")
  }
  const newUser = await User.create({
    name,
    email,
    userName,
    password,
  })

  const createdUser = await User.findById(newUser._id).select("-password -refreshToken")
  if (!createdUser) {
    throw new ApiError(406,"Something went wrong")
  }
  res.status(200).json(new ApiResponse(220,createdUser,"User created successfully"))
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id)
  if (!currentUser) {
    throw new ApiError(404,"Something went wrong")
  }
  res.statusCode(201).json(new ApiResponse(220,currentUser,"User fetched successfully"))
});

const forgotPassword = asyncHandler();

export {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
  forgotPassword,
  refreshAccessToken,
};
