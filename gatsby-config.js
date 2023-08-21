require("dotenv").config();

module.exports = {
    siteMetadata: {
        title: "madebycounter.com",
        siteUrl: "https://madebycounter.com",
        web3forms: process.env.W3F_ACCESS_TOKEN,
    },
    graphqlTypegen: true,
    plugins: [
        {
            resolve: "gatsby-source-contentful",
            options: {
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                spaceId: process.env.CONTENTFUL_SPACE_ID,
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        "gatsby-plugin-styled-components",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
    ],
};
