import { graphql, useStaticQuery } from "gatsby";

import Asset from "../Asset";

export default interface TeamMember {
    __typename: "ContentfulTeamMember";
    contentful_id: string;
    fullName: string;
    profilePicture: Asset;
    fullBody: Asset;
    fullBodyExtra: Asset;
    footerBust: Asset;
    signature: Asset;
    pointingPhoto: Asset;
}

export const teamMemberFragment = graphql`
    fragment TeamMember on ContentfulTeamMember {
        __typename
        contentful_id
        fullName
        profilePicture {
            ...Asset
        }
        fullBody {
            ...Asset
        }
        fullBodyExtra {
            ...Asset
        }
        footerBust {
            ...Asset
        }
        signature {
            ...Asset
        }
        pointingPhoto {
            ...Asset
        }
    }
`;

export function useTeamMembers(): {
    luke: TeamMember;
    william: TeamMember;
    henry: TeamMember;
    counter: TeamMember;
} {
    return useStaticQuery(graphql`
        {
            luke: contentfulTeamMember(fullName: { eq: "Luke A. Makinson" }) {
                ...TeamMember
            }
            william: contentfulTeamMember(fullName: { eq: "William Gardner" }) {
                ...TeamMember
            }
            henry: contentfulTeamMember(fullName: { eq: "Henry Buck" }) {
                ...TeamMember
            }
            counter: contentfulTeamMember(fullName: { eq: "Counter" }) {
                ...TeamMember
            }
        }
    `);
}
