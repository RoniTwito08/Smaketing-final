import { Request, Response } from 'express';
import { generateContent, fetchPexelsImage } from '../services/landing_page_generator/textAndImage_generator';
import { BusinessData , CampaignInfo , UserEmailData } from '../services/landing_page_generator/businessInfoTypes_LP';
import path from 'path';

export const generateLandingPageContext = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            res.status(400).json({ error: "Missing required fields" });
            return;
        }

        const inputDetails: BusinessData = req.body.BusinessData;
        const campaignInfo: CampaignInfo = req.body.campaignInfo;
        const userInfo: UserEmailData = req.body.UserEmailData;

        const business = inputDetails.data;

        console.log("Input Details:", business);
        console.log("Campaign Info:", campaignInfo);
        console.log("User Info:", userInfo);

        const businessFieldKeyword = await generateContent(
            `Translate the following business field into a single, precise English keyword that best represents its core concept for image search.
            For example, if the field is "בתי קפה", return "coffee".
            Business field: ${business.businessField}.
            Write in Hebrew language.`
        );

        const nameOfMainPicture = `${Date.now() + businessFieldKeyword.replace(/\s+/g, "_")}.jpg`;
        const imageFeatureGeneratePath = path.join(__dirname, '../pexels_images', nameOfMainPicture);

        const headerSection = {
            sectionName: "header",
            businessName: business.businessName,
            buttonText: await generateContent(
                `Create a short and compelling call to action for a marketing campaign with the following objective: "${campaignInfo.campaginPurpose}".
                Example actions: "Contact Us", "Buy Now", "Get a Quote".
                Limit to 3 words.
                Write in Hebrew language.`
            )
        };

        const heroSection = {
            sectionName: "hero",
            title: await generateContent(
                `Write an engaging and professional landing page title for the business "${business.businessName}" operating in the field of "${business.businessField}".
                The title should be clear, attractive, and deliver the business's main value in one sentence.
                Avoid unnecessary punctuation.
                Write in Hebrew language.`
            ),
            content: await generateContent(
                `Write a short paragraph (max 3 lines) describing the business "${business.businessName}" clearly and professionally.
                Include the following information:
                - Business type: ${business.businessType}
                - Field description: ${business.businessFieldDetails}
                - Service areas: ${business.serviceAreas}
                - Services: ${business.serviceDescription}
                - Target audience: ${campaignInfo.targetAudience}, Age group: ${campaignInfo.targetAge}, Gender: ${campaignInfo.targetGender}
                Avoid unnecessary punctuation.
                Write in Hebrew language.`
            ),
            buttonText: headerSection.buttonText
        };

        const featuresSection = {
            sectionName: "features",
            content: await generateContent(
                `Create a JSON array of 4 strong service offerings for the business "${business.businessName}".
                Each service must start with ✔️, use persuasive marketing language, and contain 5–6 words max.
                Do NOT copy from user input. Example format:
                [
                    "✔️ High-quality personalized service",
                    "✔️ Fast response time and support"
                ]
                Write in Hebrew language.`
            ),
            image: await fetchPexelsImage(businessFieldKeyword, imageFeatureGeneratePath)
        };

        const reviewsSection = {
            sectionName: "reviews",
            content: await generateContent(
                `Write 4 positive and professional customer reviews about the business "${business.businessName}".
                Each review should have 2 sentences and use present tense (e.g., "Professional", "Reliable", "Kind").
                Avoid names, personal references, and excessive punctuation.
                Format:
                [
                    "First review...",
                    "Second review...",
                    ...
                ]
                Write in Hebrew language.`
            )
        };

        const aboutUsSection = {
            sectionName: "aboutUs",
            content: await generateContent(
                `Write a professional "About Us" section for the business "${business.businessName}" in 5 lines.
                Include:
                - Unique value or offering: ${business.uniqueService}
                - Target age group: ${campaignInfo.targetAge}
                - Design preference or brand tone: ${business.designPreferences}
                Avoid punctuation at the end of lines.
                Write in Hebrew language.`
            )
        };

        const gallerySection = { sectionName: "gallery" };
        const contactUsSection = { sectionName: "contactUs" };

        const footerSection = {
            sectionName: "footer",
            socialMediaIcons: business.socialMediaAccounts,
            contactInfo: userInfo.email,
            copyRights: "©2025 כל הזכויות שמורות לצוות Smarketing"
        };

        const context = {
            headerSection,
            heroSection,
            featuresSection,
            reviewsSection,
            aboutUsSection,
            gallerySection,
            contactUsSection,
            footerSection
        };

        res.status(200).json(context);
    } catch (error) {
        console.error("Error generating context:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getTextSuggestions = async (req: Request, res: Response): Promise<void> => {
    const { text, tone } = req.body;
    try {
        const prompt = `Please provide an improved version of the following text in Hebrew. The revised text should be more concise, precise, and reflect the following tone instructions: "${tone}". Original text: ${text}`;
        const suggestion = await generateContent(prompt);
        res.status(200).json({ suggestion });
    } catch (error) {
        console.error("Error generating text suggestions:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
