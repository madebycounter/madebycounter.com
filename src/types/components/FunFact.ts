import { graphql } from "gatsby";

import { RichText } from "..";
import TeamMember from "./TeamMember";

export default interface FunFact {
    __typename: "ContentfulFunFact";
    contentful_id: string;
    title: string;
    content: RichText;
    teamMember: TeamMember;
    buttonText: string;
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
    }
`;
