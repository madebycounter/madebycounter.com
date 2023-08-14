const dotenv = require("dotenv");

module.exports = {
    siteMetadata: {
        title: "madebycounter.com",
        siteUrl: "https://madebycounter.com",
        web3forms: dotenv.config().parsed.W3F_ACCESS_TOKEN,
    },
    graphqlTypegen: true,
    plugins: [
        {
            resolve: "gatsby-source-contentful",
            options: {
                accessToken: dotenv.config().parsed.CTF_ACCESS_TOKEN,
                spaceId: dotenv.config().parsed.CTF_SPACE_ID,
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
