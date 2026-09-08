'use strict';

const ApiError = require('../utils/ApiError');

const TABLE_NAME = 'Users';

exports.getAllUsers = async (catalystApp) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  return table.getPagedRows({ max_rows: 100 });
};

exports.getUserById = async (catalystApp, id) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  const row = await table.getRow(id);
  if (!row) throw new ApiError(404, 'User not found');
  return row;
};

exports.createUser = async (catalystApp, { name, email }) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  return table.insertRow({ name, email });
};