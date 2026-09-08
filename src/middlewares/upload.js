'use strict';

const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const ALLOWED_MIMETYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isValidExt = ALLOWED_EXTENSIONS.includes(ext);
    const isValidMime = ALLOWED_MIMETYPES.includes(file.mimetype);

    // Accept if EITHER check passes — covers cases where mimetype is
    // misreported as application/octet-stream but the extension is fine
    if (!isValidExt && !isValidMime) {
      return cb(new Error('Only image files are allowed (jpg, jpeg, png, webp, gif)'));
    }

    cb(null, true);
  },
});

module.exports = upload;