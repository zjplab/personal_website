import React from "react";
import { Link, graphql } from "gatsby";

const IndexPage = ({
  data: {
    allFile: { edges },
  },
}) => {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.relativePath}>
            <Link to={node.relativePath}>{node.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const query = graphql`
  query {
    allFile(filter: { extension: { eq: "html" } }) {
      edges {
        node {
          relativePath
          name
        }
      }
    }
  }
`;

export default IndexPage;
