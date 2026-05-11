const multer = require('multer');
const path = require('path');

const hasCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('File type không được hỗ trợ. Chỉ chấp nhận JPEG, PNG, WebP, GIF, PDF.'), false);
  }
};

let upload;

if (hasCloudinary) {
  const cloudinary = require('../config/cloudinary');
  const { CloudinaryStorage } = require('multer-storage-cloudinary');

  const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const isPdf = file.mimetype === 'application/pdf';
      return {
        folder: 'logiverse',
        resource_type: isPdf ? 'raw' : 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
        transformation: isPdf ? undefined : [{ quality: 'auto', fetch_format: 'auto' }],
      };
    },
  });

  upload = multer({
    storage: cloudinaryStorage,
    fileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB for PDFs
  });

  console.log('✅ Upload middleware: Cloudinary storage enabled');
} else {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

  upload = multer({
    storage: diskStorage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });

  console.log('⚠️  Upload middleware: Local disk storage (no Cloudinary config)');
}

module.exports = upload;
