const { upload } = require("../middleware/upload.middleware");
const path = require("path");
const fs = require("fs");

exports.uploadImage = async (req, res) => {
  try {
    // Use multer middleware
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ 
          message: "File upload error", 
          error: err.message 
        });
      }

      if (!req.file) {
        return res.status(400).json({ 
          message: "No file uploaded" 
        });
      }

      // Return the file information
      res.json({
        message: "File uploaded successfully",
        file: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          url: `/uploads/${req.file.filename}` // URL for the uploaded file
        }
      });
    });
  } catch (err) {
    res.status(500).json({ 
      message: "Error uploading file", 
      error: err.message 
    });
  }
};

exports.getUploadedFile = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "../uploads", filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }
    
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ 
      message: "Error serving file", 
      error: err.message 
    });
  }
}; 