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
