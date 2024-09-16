import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import config from '../config'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_key,
  api_secret: config.cloudinary.cloudinary_secret,
})

//? Upload file to cloudinary in different folder user/cover/content/author and format raw/image

const uploadToCloudinary = async (
  localFilePath: string,
  destination: string,
  file_type: 'image' | 'raw',
) => {
  try {
    if (!localFilePath && !destination) return null
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: file_type,
      folder: destination,
    })
    if (result) {
      fs.unlinkSync(localFilePath)
    }
    return { publicId: result.public_id, url: result.secure_url }
  } catch (error) {
    fs.unlinkSync(localFilePath)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to upload Image to cloudinary',
    )
  }
}
//? Working
const deleteResourcesFromCloudinary = async (
  publicId: string[],
  file_type: 'image' | 'raw',
  flag: boolean,
) => {
  try {
    const deletionResult = await cloudinary.api.delete_resources(publicId, {
      resource_type: file_type,
      invalidate: flag,
    })

    return deletionResult
  } catch (error) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to delete files from cloudinary',
    )
  }
}
//? Working
const updateCloudniaryFiles = async (
  publicId: string,
  newFilePath: string,
  file_type: 'raw' | 'image',
  flag: boolean,
  destination: string,
) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: file_type,
      invalidate: flag,
    })

    const result = await cloudinary.uploader.upload(newFilePath, {
      resource_type: file_type,
      folder: destination,
      use_filename: true,
      unique_filename: true,
    })
    if (result) {
      fs.unlinkSync(newFilePath)
    }
    return { publicId: result.public_id, url: result.secure_url }
  } catch (error) {
    fs.unlinkSync(newFilePath)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to update Image from cloudinary',
    )
  }
}

// Upload multiple files to Cloudinary
const uploadMultipleToCloudinary = async (
  localFilePaths: string[],
  destination: string,
  file_type: 'image' | 'raw',
) => {
  try {
    if (!localFilePaths || localFilePaths.length === 0) return null

    const uploadResults = []

    for (const filePath of localFilePaths) {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: file_type,
        folder: destination,
      })
      if (result) {
        fs.unlinkSync(filePath) // Remove the local file after successful upload
      }
      uploadResults.push({ publicId: result.public_id, url: result.secure_url })
    }

    return uploadResults // Return an array of results with publicId and url
  } catch (error) {
    // Clean up all local files on failure
    localFilePaths.forEach(filePath => fs.unlinkSync(filePath))
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to upload images to Cloudinary',
    )
  }
}

export {
  uploadToCloudinary,
  deleteResourcesFromCloudinary,
  updateCloudniaryFiles,
  uploadMultipleToCloudinary,
}
