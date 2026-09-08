'use strict';

const ApiError = require('../utils/ApiError');

const TABLE_NAME = 'Pets';

exports.getAllPets = async (catalystApp, userId) => {
  if (userId) {
    const zcql = catalystApp.zcql();
    const query = `SELECT * FROM ${TABLE_NAME} WHERE User_ID = '${userId}' LIMIT 100`;
    const result = await zcql.executeZCQLQuery(query);

    // ZCQL wraps each row under the table name, e.g. [{ Pets: {...} }, ...]
    const rows = result.map((r) => r[TABLE_NAME]);
    return { rows, more_records: rows.length === 100 };
  }

  const table = catalystApp.datastore().table(TABLE_NAME);
  const result = await table.getPagedRows({ max_rows: 100 });
  return { rows: result.data, more_records: result.more_records };
};

exports.getPetById = async (catalystApp, id) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  const row = await table.getRow(id);
  if (!row) throw new ApiError(404, 'Pet not found');
  return row;
};

exports.createPet = async (catalystApp, petData) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  return table.insertRow(petData);
};

exports.updatePet = async (catalystApp, id, updates) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  return table.updateRow({ ROWID: id, ...updates });
};

exports.deletePet = async (catalystApp, id) => {
  const table = catalystApp.datastore().table(TABLE_NAME);
  return table.deleteRow(id);
};