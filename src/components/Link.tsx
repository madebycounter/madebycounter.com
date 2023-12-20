// Silly workaround to get past the "ref" issue with Gatsby's Link component.
// See: https://github.com/gatsbyjs/gatsby/issues/34325
import type { GatsbyLinkProps } from "gatsby";
import { Link } from "gatsby";
import React, { forwardRef } from "react";

export type MyLinkProps = Omit<GatsbyLinkProps<unknown>, "ref">;

export default forwardRef<HTMLAnchorElement, MyLinkProps>(
    function MyLink(props, ref) {
        return <Link {...props} innerRef={ref} activeClassName="active" />;
    },
);
