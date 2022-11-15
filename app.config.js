require("dotenv").config();

module.exports = {
    expo: {
        name: "Newsletter",
        slug: "art-signup-3",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/van2.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash2.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            supportsTablet: true,
        },
        android: {
            package:
                "com.williamowen65.artsignup3",
        },
        web: {
            favicon: "./assets/favicon.png",
        },
        extra: {
            clearCode: process.env.pword,
            email: process.env.email,
            eas: {
                projectId:
                    "546a6dd7-9c48-431f-a236-2a4edd6cfc99",
            },
        },
    },
};
