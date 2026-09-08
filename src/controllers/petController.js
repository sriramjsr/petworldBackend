'use strict';

const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { getCatalystApp } = require('../utils/catalystSDK');
const petService = require('../services/petService');

exports.getAllPets = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (userId && !/^\d+$/.test(userId)) {
    throw new ApiError(400, 'Invalid userId');
  }

  const { rows, more_records } = await petService.getAllPets(getCatalystApp(req), userId);
  res.status(200).json({ success: true, data: rows, more_records });
});

exports.getPetById = asyncHandler(async (req, res) => {
  const data = await petService.getPetById(getCatalystApp(req), req.params.id);
  res.status(200).json({ success: true, data });
});

const { uploadImage } = require('../utils/stratus');

exports.createPet = asyncHandler(async (req, res) => {
  const { Pet_Name, Pet_Type, Breed, Gender, Age, Weight, User_ID } = req.body;

  if (!Pet_Name || !Pet_Type || !User_ID) {
    throw new ApiError(400, 'Pet_Name, Pet_Type, and User_ID are required');
  }

  const catalystApp = getCatalystApp(req);

  let profileImageUrl = null;
  if (req.file) {
    const uploaded = await uploadImage(catalystApp, req.file);
    profileImageUrl = uploaded.object_url;
  }

  const data = await petService.createPet(catalystApp, {
    Pet_Name,
    Pet_Type,
    Breed,
    Gender,
    Age,
    Weight,
    User_ID,
    Profile_Image: profileImageUrl,
  });

  res.status(201).json({ success: true, data });
});


exports.updatePet = asyncHandler(async (req, res) => {
  const data = await petService.updatePet(getCatalystApp(req), req.params.id, req.body);
  res.status(200).json({ success: true, data });
});

exports.deletePet = asyncHandler(async (req, res) => {
  await petService.deletePet(getCatalystApp(req), req.params.id);
  res.status(200).json({ success: true, message: 'Pet deleted' });
});