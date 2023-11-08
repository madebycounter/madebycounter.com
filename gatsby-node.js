const ffprobe = require("ffprobe-static");
const path = require("path");
const exec = require("mz/child_process").execFile;
const assert = require("assert");
const commandExists = require("command-exists");

function getFfprobePath() {
    return commandExists("ffprobe")
        .then(() => {
            return "ffprobe";
        })
        .catch(() => {
            return ffprobe.path;
        });
}

// https://github.com/jongleberry-bot/get-video-dimensions
function getVideoDimensions(filename) {
    return getFfprobePath()
        .then((path) => {
            return exec(path, [
                "-v",
                "error",
                "-of",
                "flat=s=_",
                "-select_streams",
                "v:0",
                "-show_entries",
                "stream=height,width",
                filename,
            ]);
        })
        .then((out) => {
            var stdout = out[0].toString("utf8");
            var width = /width=(\d+)/.exec(stdout);
            var height = /height=(\d+)/.exec(stdout);
            assert(width && height, "No dimensions found!");

            return {
                width: parseInt(width[1]),
                height: parseInt(height[1]),
            };
        });
}

exports.createPages = async ({ graphql, actions }) => {
    const { data } = await graphql(`
        {
            blogPosts: allContentfulBlogPost {
                nodes {
                    slug
                    contentful_id
                }
            }
            portfolioItems: allContentfulPortfolioItem {
                nodes {
                    slug
                    contentful_id
                }
            }
            services: allContentfulService {
                nodes {
                    slug
                    contentful_id
                }
            }
        }
    `);

    data.blogPosts.nodes.forEach((node) => {
        actions.createPage({
            path: "/blog/" + node.slug,
            component: path.resolve("./src/templates/blogPost.tsx"),
            context: {
                contentful_id: node.contentful_id,
            },
        });
    });

    data.portfolioItems.nodes.forEach((node) => {
        actions.createPage({
            path: "/portfolio/" + node.slug,
            component: path.resolve("./src/templates/portfolioItem.tsx"),
            context: {
                contentful_id: node.contentful_id,
            },
        });
    });

    data.services.nodes.forEach((node) => {
        actions.createPage({
            path: "/services/" + node.slug,
            component: path.resolve("./src/templates/pitchPage.tsx"),
            context: {
                contentful_id: node.contentful_id,
            },
        });
    });
};

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type Dimensions {
            width: Int!
            height: Int!
        }
    `);
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
    if (type.name !== "ContentfulAsset") return;

    return {
        dimensions: {
            type: "Dimensions!",
            resolve: async (source) => {
                if (source.mimeType === "video/mp4") {
                    return getVideoDimensions(source.url).then(
                        ({ width, height }) => {
                            return { width, height };
                        },
                    );
                } else {
                    return {
                        width: source.width,
                        height: source.height,
                    };
                }
            },
        },
    };
};

// exports.onCreateNode = ({ node, actions }: any) => {
//     if (node.internal.type !== "ContentfulAsset") return;

//     actions.createNode({
//         contentful_id: node.contentful_id,
//         title: node.title,
//         description: node.description,

//     })
// };

// {
//   contentful_id: '5RfqoTige56vTeRryq1SIU',
//   spaceId: 'md22tnsc5yj0',
//   id: 'cdfd868b-3e9b-5293-8397-c85d4e358cde',
//   createdAt: '2023-05-25T22:01:55.560Z',
//   updatedAt: '2023-05-25T22:01:55.560Z',
//   parent: null,
//   children: [],
//   file: {
//     url: '//images.ctfassets.net/md22tnsc5yj0/5RfqoTige56vTeRryq1SIU/1f8441d34eebc56f827fa92d973020e7/banner.png',
//     details: { size: 4720908, image: [Object] },
//     fileName: 'banner.png',
//     contentType: 'image/png'
//   },
//   title: 'banner',
//   description: '',
//   node_locale: 'en-US',
//   internal: {
//     type: 'ContentfulAsset',
//     contentDigest: '2023-05-25T22:01:55.560Z',
//     owner: 'gatsby-source-contentful',
//     counter: 361
//   },
//   sys: { type: 'Asset', revision: 1 },
//   url: 'https://images.ctfassets.net/md22tnsc5yj0/5RfqoTige56vTeRryq1SIU/1f8441d34eebc56f827fa92d973020e7/banner.png',
//   placeholderUrl: 'https://images.ctfassets.net/md22tnsc5yj0/5RfqoTige56vTeRryq1SIU/1f8441d34eebc56f827fa92d973020e7/banner.png?w=%width%&h=%height%',
//   mimeType: 'image/png',
//   filename: 'banner.png',
//   width: 2400,
//   height: 1800,
//   size: 4720908
// }

// https://videos.ctfassets.net/md22tnsc5yj0/5OyVqNY6mlfiOcyXGNwzg5/2711f7497bd676e998a26b1688749ddc/Banner.mp4

// https://videos.ctfassets.net/md22tnsc5yj0/78AD363Ui81fKK08ZllC7q/141dd68abec0c1533f544460fd99efc7/2023-04-16_23-37-10_1.mp4

// https://videos.ctfassets.net/md22tnsc5yj0/5DS5HIkncXzUnq9T2wyp7P/6fe4f9e984fa359beac1bf9f78fd3349/videopost.mp4
