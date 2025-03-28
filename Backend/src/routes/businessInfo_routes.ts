import express from "express";
import businessInfo_controller from "../controllers/businessInfo_controller";
import { authMiddleware } from "../controllers/auth_controller";
import upload from "../multer.config";

// import multer from "multer";
// import path from "path";

const router = express.Router();

// הגדרת אחסון עם multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/business-logos");
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: BusinessInfo
 *   description: API לניהול מידע עסקי (multiStepData)
 */

/**
 * @swagger
 * /business-info:
 *   post:
 *     summary: יצירת מסמך BusinessInfo חדש
 *     tags: [BusinessInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInfo'
 *     responses:
 *       201:
 *         description: Business info created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessInfo'
 *       500:
 *         description: Server error
 */
router.post(
  "/:id",
  authMiddleware,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "businessImages", maxCount: 4 },
  ]),
  (req, res) => {
    businessInfo_controller.createBusinessInfo(req, res);
  }
);

// router.post("/:id", authMiddleware, upload.any(), (req, res) => {
//   businessInfo_controller.createBusinessInfo(req, res);
// });
// router.post("/:id", upload.any(), (req, res) => {
//   console.log("BODY:", req.body);
//   console.log("FILES:", req.files);
//   res.send("OK");
// });

/**
 * @swagger
 * /business-info/{id}:
 *   get:
 *     summary: קבלת מידע עסקי לפי מזהה
 *     tags: [BusinessInfo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: מזהה המסמך.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Business info data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessInfo'
 *       404:
 *         description: Business info not found
 *       500:
 *         description: Server error
 */
router.get("/:id", (req, res) => {
  businessInfo_controller.getBusinessInfoByUserId(req, res);
});

/**
 * @swagger
 * /business-info/{id}:
 *   put:
 *     summary: עדכון מידע עסקי לפי מזהה
 *     tags: [BusinessInfo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: מזהה המסמך.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusinessInfo'
 *     responses:
 *       200:
 *         description: Business info updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BusinessInfo'
 *       404:
 *         description: Business info not found
 *       500:
 *         description: Server error
 */
router.put("/:id", authMiddleware, (req, res) => {
  businessInfo_controller.updateBusinessInfo(req, res);
});

export default router;
