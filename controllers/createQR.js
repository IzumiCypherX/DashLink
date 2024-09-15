const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');


async function generateQRCode(filename) {
  try {
    // Ensure the directory exists
    const directoryPath = path.join(__dirname, 'public');
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // File path to save the QR code image
    const filePath = path.join(directoryPath, `${filename}.png`);

    // Generate the QR code and save as a file with the name of shortened URL link
    await QRCode.toFile(filePath, process.env.HOSTNAME + filename);
    console.log(`QR Code generated and saved to ${filePath}`);
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

module.exports = generateQRCode;
