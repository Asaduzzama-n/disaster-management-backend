import multer from 'multer'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp') // Folder for temporary storage
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use original filename
  },
})

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'imageUrls') {
      if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
      ) {
        cb(null, true)
      } else {
        cb(
          new ApiError(
            httpStatus.BAD_REQUEST,
            'Only .jpg, .png or .jpeg formats are allowed!',
          ),
        )
      }
    } else {
      cb(new ApiError(httpStatus.BAD_REQUEST, 'Invalid field name!'))
    }
  },
})

export const multipleImageUpload = upload.fields([
  { name: 'imageUrls', maxCount: 5 }, // Allows up to 5 images for imageUrls
])
