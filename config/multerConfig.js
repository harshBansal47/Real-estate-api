

const multer = require('multer');


// Multer configuration to save files in 'uploads/' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = 'uploads/';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir); // Dynamically create the folder if it doesn't exist
      }
      cb(null, dir); // Set the folder for saving uploaded files
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique file name
    }
  });


  // Multer upload middleware
exports.upload = multer({ 
    storage: storage,
    limits: { fileSize: 100 * 1024 * 1024 } // Set a file size limit (100MB)
  });


  // Function to get dynamic upload fields for site plans and site images
exports.getUploadFields = (maxSitePlans, maxSiteImages) => {
    const fields = [
      { name: 'brandImage', maxCount: 1 },
      { name: 'brochure', maxCount: 1 }
    ];
  
    // Dynamically add sitePlans file fields
    for (let i = 0; i < maxSitePlans; i++) {
      fields.push({ name: `sitePlans[${i}][imageUpload]`, maxCount: 1 });
    }
  
    // Dynamically add siteImages file fields
    for (let i = 0; i < maxSiteImages; i++) {
      fields.push({ name: `siteImages[${i}]`, maxCount: 1 });
    }
  
    return fields;
  };

