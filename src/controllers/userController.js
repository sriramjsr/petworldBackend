'use strict';

const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { getCatalystApp } = require('../utils/catalystSDK');
const userService = require('../services/userService');

exports.getAllUsers = asyncHandler(async (req, res) => {
  const data = await userService.getAllUsers(getCatalystApp(req));
  res.status(200).json({ success: true, data });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const data = await userService.getUserById(getCatalystApp(req), req.params.id);
  res.status(200).json({ success: true, data });
});

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) throw new ApiError(400, 'name and email are required');

  const data = await userService.createUser(getCatalystApp(req), { name, email });
  res.status(201).json({ success: true, data });
});