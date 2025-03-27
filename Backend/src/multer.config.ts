import multer from "multer";
import path from "path";
import fs from "fs";

const ensureUploadsDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureUploadsDir("uploads/profile_pictures");
ensureUploadsDir("uploads/post_images");
ensureUploadsDir("uploads/business_pictures");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.originalUrl.includes("/posts")) {
      cb(null, "uploads/post_images/");
    } else if (req.originalUrl.includes("/business-info")) {
      cb(null, "uploads/business_pictures/");
    } else {
      cb(null, "uploads/profile_pictures/");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export default upload;
