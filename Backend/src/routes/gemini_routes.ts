import express from "express";
import { getGeminiKeywordsFromCampaign } from "../controllers/gemini_controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Gemini
 *     description: AI-powered marketing tools using Gemini
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - name
 *         - advertisingChannelType
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         advertisingChannelType:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         scheduledTime:
 *           type: string
 *         targetSpend:
 *           type: object
 *           properties:
 *             targetSpendingAmountMicros:
 *               type: string
 *         optimizationGoalSetting:
 *           type: object
 *           properties:
 *             optimizationGoalTypes:
 *               type: array
 *               items:
 *                 type: string
 *
 *     KeywordSuggestion:
 *       type: object
 *       properties:
 *         keywordText:
 *           type: string
 *         matchType:
 *           type: string
 *           enum: [EXACT, PHRASE, BROAD]
 *
 *     GeminiKeywordsResponse:
 *       type: object
 *       properties:
 *         keywords:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/KeywordSuggestion'
 */

/**
 * @swagger
 * /gemini/keywords:
 *   post:
 *     summary: Generate marketing keywords for a campaign using Gemini
 *     tags: [Gemini]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - campaign
 *             properties:
 *               campaign:
 *                 $ref: '#/components/schemas/Campaign'
 *     responses:
 *       200:
 *         description: Generated keyword suggestions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeminiKeywordsResponse'
 *       400:
 *         description: Missing or invalid campaign data
 *       500:
 *         description: Internal server error
 */

router.post("/", express.json(), getGeminiKeywordsFromCampaign);

export default router;
