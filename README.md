# personal_website
My personal website, aggregated from multiple blogs

If you'd prefer not to convert your HTML files to Markdown or JSON, you could take another approach by using a tool called `react-html-parser`. It will parse your HTML directly into React components. 

Here are the steps you'd follow for that:

1. **Install `react-html-parser`**

   - To install the package, navigate to your Gatsby project folder and run:

        npm install react-html-parser

2. **Load HTML files**

   - Firstly, you need to access your HTML files from the local filesystem. You can use the `gatsby-source-filesystem` plugin. Install it by running:

        npm install --save gatsby-source-filesystem

   - Then, add the plugin to your `gatsby-config.js` file:

        ```
        module.exports = {
          plugins: [
            {
              resolve: `gatsby-source-filesystem`,
              options: {
                name: `posts`,
                path: `${__dirname}/posts/`,
              },
            },
          ],
        }
        ```

3. **Access HTML file content**

   - The above steps will make the files available, but you'd still need to access the raw content of the HTML files. Gatsby doesn't have a built-in transformer to parse raw HTML files into a usable form. 

   - You will need to use the `createPages` API to create pages, and use Node.js's built-in `fs` (filesystem) module to read the file content manually. You'll add this to your `gatsby-node.js` file:

        ```javascript
        const path = require(`path`);
        const fs = require('fs').promises;

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
        };
        ```

   - Note: This approach loads the entire HTML content, including the `<head>` and `<body>` tags. You will need to manually remove any irrelevant tags and metadata.

4. **Parse HTML into React Components**

   - In the `blog-post.js` template file, you would then use `react-html-parser` to parse the raw HTML string into React components:

        ```javascript
        import React from "react";
        import ReactHtmlParser from 'react-html-parser';

        const BlogPost = ({ pageContext }) => {
          return (
            <div>
              {ReactHtmlParser(pageContext.content)}
            </div>
          );
        };

        export default BlogPost;
        ```

This will give you a base to start with, but it could require additional work depending on the specifics of your HTML files and how you'd like your blog to be structured and styled.
