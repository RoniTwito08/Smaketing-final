export type BusinessData = {
    businessName: string;
    businessType: string;
    businessAddress?: string;
    businessField: string;
    businessFieldDetails?: string;
    serviceAreas: string;
    serviceDescription: string;
    uniqueService: string;
    specialPackages: string;
    incentives: string;
    logoFile?: File;
    businessImageFiles?: FileList;
    designPreferences?: string;
    socialMediaAccounts?: string[];
    logo?: string;
    businessImages?: string[];
    objective?: string;
};

export type CampaignInfo = {
    budget: number;
    marketingLevel: string;
    campaginPurpose: string;
    actionToCall: string;
    campaignName: string;
    targetAudience: string;
    targetGender: string;
    language: string;
    targetLocation: string;
    targetAge: string;
}

export type UserEmailData = {
    email: string;
}


