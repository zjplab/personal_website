const path = require(`path`);
const fs = require('fs').promises;

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allFile(filter: { extension: { eq: "html" } }) {
        edges {
          node {
            relativePath
            dir
          }
        }
      }
    }
  `);

  result.data.allFile.edges.forEach(async ({ node }) => {
    const content = await fs.readFile(`${node.dir}/${node.relativePath}`, 'utf8');
    createPage({
      path: node.relativePath,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        content: content,
      },
    });
  });

  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  });
}
