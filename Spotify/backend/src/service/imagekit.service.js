require("dotenv").config();
const ImageKit = require("@imagekit/nodejs");
const { toFile } = ImageKit;

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "dummy_public_key",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "dummy_private_key",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/spotify_uploads",
});

// Attach upload alias for backwards compatibility if imagekit.upload is missing
if (!imagekit.upload && imagekit.files && typeof imagekit.files.upload === "function") {
  imagekit.upload = imagekit.files.upload.bind(imagekit.files);
}

/**
 * Upload file to ImageKit
 * @param {Buffer | string} file - File buffer or base64 string or file stream
 * @param {string} fileName - File name
 * @returns {Promise<object>} ImageKit upload response object
 */
async function uploadToImageKit(file, fileName) {
  try {
    let uploadFile = file;

    // In @imagekit/nodejs v7+, buffers must be converted via toFile helper if available
    if (Buffer.isBuffer(file)) {
      if (typeof toFile === "function") {
        uploadFile = await toFile(file, fileName);
      } else {
        uploadFile = file.toString("base64");
      }
    }

    const uploadFn = (imagekit.files && typeof imagekit.files.upload === "function")
      ? imagekit.files.upload.bind(imagekit.files)
      : (typeof imagekit.upload === "function" ? imagekit.upload.bind(imagekit) : null);

    if (!uploadFn) {
      throw new Error("ImageKit upload method is not available");
    }

    const response = await uploadFn({
      file: uploadFile,
      fileName: fileName,
      folder: "/spotify-music",
    });
    return response;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}

module.exports = {
  imagekit,
  uploadToImageKit,
};
