const multer  = require('multer');
// const createError = require('http-errors');
const path = require('path');
const crypto = require('crypto');
const { failed } = require('../helper/response');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './upload');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `${crypto
        .randomBytes(16)
        .toString('hex')}${crypto.randomInt(99)}${ext}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);
    const maxSize = 2 * 1024 * 1024;
    if (fileSize > maxSize) {
      const error = {
        message: 'File size exceeds 2 MB',
      };
      return cb(error, false);
    }
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      const error = {
        message: 'file must be jpeg, jpg or png',
      };
      cb(error, false);
    }
  },
})

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, './upload')
//     },
//     filename: (req, file, cb) => { 
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file + '-' + uniqueSuffix + '.png')
//     }
    
// });
  
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'photo/png' || file.mimetype === 'photo/jpeg'){
//     cb(null, true)
//   }else{
//     cb(null, false)
//   }
// }

// const upload = multer({
//    storage: storage,
//    limits: {
//     fileSize: 2000000 // 1000000 Bytes = 1 MB
//    },
//    fileFilter: (req, file, cb) => {
//     if (!file.match(/\.(png|jpg)$/)) {
//       return cb(new createError(400, 'File is not an image!'))
//     }
//     cb(undefined, true)
//   }
// })

// module.exports = upload

const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('photo');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: [],
      });
    } else {
      next();
    }
  });
};

module.exports = upload;
