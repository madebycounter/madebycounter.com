import { graphql, useStaticQuery } from "gatsby";

import { RichText } from "..";
import MediaCollection from "../collections/MediaCollection";
import TeamMember from "./TeamMember";

export default interface FunFact {
    __typename: "ContentfulFunFact";
    contentful_id: string;
    title: string;
    content: RichText;
    teamMember: TeamMember;
    buttonText: string;
    buttonImages: MediaCollection;
}

export function useFunFacts(): FunFact[] {
    return useStaticQuery(graphql`
        query FunFacts {
            allContentfulFunFact {
                nodes {
                    ...FunFact
                }
            }
        }
    `).allContentfulFunFact.nodes;
}

export const funFactFragment = graphql`
    fragment FunFact on ContentfulFunFact {
        __typename
        contentful_id
        title
        content {
            raw
        }
        teamMember {
            ...TeamMember
        }
        buttonText
        buttonImages {
            ...CarouselMediaCollection
        }
    }
`;
