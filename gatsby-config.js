require("dotenv").config();

module.exports = {
    siteMetadata: {
        title: "madebycounter.com",
        siteUrl: "https://madebycounter.com",
        hubspot: {
            trackingScript: process.env.HUBSPOT_TRACKING_SCRIPT,
            portalId: process.env.HUBSPOT_PORTAL_ID,
            forms: {
                contact: process.env.HUBSPOT_CONTACT_FORM,
                newsletter: process.env.HUBSPOT_NEWSLETTER_FORM,
            },
        },
    },
    graphqlTypegen: true,
    plugins: [
        {
            resolve: "gatsby-source-contentful",
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
                host: process.env.CONTENTFUL_HOST,
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-styled-components",
        {
            resolve: "gatsby-plugin-sitemap",
            options: {},
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
    ],
};
