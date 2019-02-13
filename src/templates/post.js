import React from 'react';
import Helmet from 'react-helmet';

export default function Template({
  data, 
  //a prop coming in from the graphql query
}) {
  const { markdownRemark: post } = data
  // const post = data.markdownRemark  same as this syntax
  return (
    <div>
      <h1>{post.frontmatter.title }</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
    </div>
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: {eq: $path} }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
` 