'use strict';

const BUCKET_NAME = 'pet-it-images';

async function uploadImage(catalystApp, file) {
  const bucket = catalystApp.stratus().bucket(BUCKET_NAME);
  const objectKey = `pets/${Date.now()}-${file.originalname}`;

  await bucket.putObject(objectKey, file.buffer);

  // Get an object instance, THEN call getDetails() on it — not on the bucket
  const objectIns = bucket.object(objectKey);
  const objectDetails = await objectIns.getDetails();

  return objectDetails; // { key, size, content_type, object_url, cached_object_url, ... }
}

module.exports = { uploadImage };