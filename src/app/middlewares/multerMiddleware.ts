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
    // Handle image uploads for 'cover' and 'avatar' fields
    if (file.fieldname === 'covers' || file.fieldname === 'avatar') {
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
    }
    // Handle PDF uploads for 'file' field
    else if (file.fieldname === 'file') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true)
      } else {
        cb(new ApiError(httpStatus.BAD_REQUEST, 'Only .pdf format is allowed!'))
      }
    } else {
      cb(new ApiError(httpStatus.BAD_REQUEST, 'There was an unknown error!'))
    }
  },
})

// Middleware to handle multiple image uploads
export const multipleImageUpload = upload.fields([
  { name: 'covers', maxCount: 5 }, // Allows up to 5 images for cover
])
