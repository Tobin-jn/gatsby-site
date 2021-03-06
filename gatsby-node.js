const path = require('path');

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions;

  const postTemplate = path.resolve('src/templates/post.js');

  //creates a page for each blog post, creates the page, reads the template for it

  //gets all markdown files
  return graphql(`{
    allMarkdownRemark {
      edges {
        node {
          html
          id
          frontmatter {
            path
            title
            date
          }
        }
      }
    }
  }`)
  .then(result => {
    if(result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach( ({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })

  })
}