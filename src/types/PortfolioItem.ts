import { graphql, useStaticQuery } from "gatsby";

import { MetaImage, RichText } from ".";
import Asset from "./Asset";
import BlogPost from "./BlogPost";
import Service from "./Service";

export type SidebarElement = Service | PortfolioItem | BlogPost;

export default interface PortfolioItem {
    __typename: "ContentfulPortfolioItem";
    contentful_id: string;
    title: string;
    date: string;
    tags: string[];
    description: RichText;
    thumbnail: Asset;
    metaImage: MetaImage;
    slideshow?: Asset[];
    gallery?: Asset[];
    youTube?: string;
    sidebarService: (Service | {})[];
    sidebarPortfolioItem: (PortfolioItem | {})[];
    sidebarBlogPost: (BlogPost | {})[];
    hidden: boolean;
    slug: string;
}

export function usePortfolioItems(): PortfolioItem[] {
    return useStaticQuery(graphql`
        {
            allContentfulPortfolioItem(sort: { date: DESC }) {
                nodes {
                    ...PortfolioItem
                }
            }
        }
    `).allContentfulPortfolioItem.nodes;
}

export const portfolioEntryFragment = graphql`
    fragment PortfolioItem on ContentfulPortfolioItem {
        __typename
        contentful_id
        title
        date(formatString: "MM.DD.YYYY")
        tags
        description {
            raw
        }
        thumbnail {
            ...AssetSmall
        }
        metaImage: thumbnail {
            gatsbyImageData(
                height: 627
                width: 1200
                breakpoints: 1200
                resizingBehavior: FILL
            )
        }
        slideshow {
            ...Asset
        }
        gallery {
            ...Asset
        }
        youTube
        sidebarService: sidebar {
            ...ServiceRef
        }
        sidebarPortfolioItem: sidebar {
            ...PortfolioItemRef
        }
        sidebarBlogPost: sidebar {
            ...BlogPostRef
        }
        hidden
        slug
    }

    fragment PortfolioItemRef on ContentfulPortfolioItem {
        __typename
        contentful_id
        title
        date(formatString: "MM.DD.YYYY")
        tags
        description {
            raw
        }
        thumbnail {
            ...AssetSmall
        }
        slideshow {
            ...Asset
        }
        youTube
        hidden
        slug
    }
`;

function isSidebarElem(obj: SidebarElement | {}): obj is SidebarElement {
    return obj.hasOwnProperty("__typename");
}

function insertSidebarElems<T extends SidebarElement | {}>(
    elemArray: (SidebarElement | {})[],
    items: T[],
) {
    for (let i = 0; i < items.length; i++) {
        var item = items[i];
        if (isSidebarElem(item)) {
            elemArray[i] = item;
        }
    }
}

export function getSidebar(item: PortfolioItem): SidebarElement[] {
    if (!item.sidebarBlogPost) return [];

    var sidebarElements: (SidebarElement | {})[] = Array(
        item.sidebarBlogPost.length,
    ).fill({});

    insertSidebarElems(sidebarElements, item.sidebarService || []);
    insertSidebarElems(sidebarElements, item.sidebarPortfolioItem || []);
    insertSidebarElems(sidebarElements, item.sidebarBlogPost || []);

    return sidebarElements.filter(isSidebarElem);
}
