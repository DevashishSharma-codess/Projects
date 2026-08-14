const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/spotify_uploads",
});

/**
 * Upload file to ImageKit
 * @param {Buffer | string} file - File buffer or base64 string or file stream
 * @param {string} fileName - File name
 * @returns {Promise<object>} ImageKit upload response object
 */

async function uploadToImageKit(file, fileName) {
  try {
    const response = await imagekit.upload({
      file: file,
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
