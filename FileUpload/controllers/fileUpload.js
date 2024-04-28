const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    // fetching the file from the req body
    const file = req.files.file;
    console.log("FILE->", file);
    // setting the path for storage
    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    // moving it to the particular file
    file.mv(path, (error) => {
      console.log(error);
    });
    // returning the resposne
    res.status(200).json({
      success: true,
      message: "File Uploaded Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Problem in storing Local Files",
    });
  }
};

function isSupportedType(fileType, supportedType) {
  return supportedType.includes(fileType);
}

async function uploadToCloudinary(file, folder, quality) {
  const options = { folder };
  options.resource_type = "auto";
  if(quality){
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    // fetching the name email and tags from the body
    const { name, email, tags } = req.body;
    // fetching the file from the body
    const file = req.files.imageFile;
    // validation for image
    const supportedType = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // function to check wheather the file format is correct or not
    if (!isSupportedType(fileType, supportedType)) {
      return res.status(500).json({
        success: false,
        message: "File Type not Supported",
      });
    }
    // adding it to the cloudinary data base
    const resposne = await uploadToCloudinary(file, "Haneef");
    console.log(resposne);
    const fileToUpload = await File.create({
      name,
      email,
      tags,
      imageUrl: resposne.secure_url,
    });
    res.status(200).json({
      success: true,
      file: fileToUpload,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in Uploading Image",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    // extracting the name email and tags from body
    const { name, email, tags } = req.body;
    // extracting the file
    const file = req.files.videoFile;
    console.log(file);
    // validation
    const supportedType = ["mov", "mp4"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // TODO only the size should be lesser than 5mb
    if (!isSupportedType(fileType, supportedType)) {
      return res.status(500).json({
        success: false,
        message: "File type not Supported or the size is bigger",
      });
    }
    const response = await uploadToCloudinary(file, "Haneef");
    const newData = await File.create({
      name,
      email,
      tags,
      imageUrl: response.secure_url,
    });
    res.status(500).json({
      success: true,
      file: newData,
      message: "Video Uploaded Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in Uploading Video",
    });
  }
};

exports.reduceImageUpload = async (req, res) => {
  try {
    // fetching the name email and tags from the body
    const { name, email, tags } = req.body;
    // fetching the file from the body
    const file = req.files.imageFile;
    // validation for image
    const supportedType = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();
    // function to check wheather the file format is correct or not
    if (!isSupportedType(fileType, supportedType)) {
      return res.status(500).json({
        success: false,
        message: "File Type not Supported",
      });
    }
    // adding it to the cloudinary data base
    const resposne = await uploadToCloudinary(file, "Haneef", 90);
    console.log(resposne);
    const fileToUpload = await File.create({
      name,
      email,
      tags,
      imageUrl: resposne.secure_url,
    });
    res.status(200).json({
      success: true,
      file: fileToUpload,
      message: "Image Uploaded Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error in Uploading Video",
    });
  }
};
