/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const Promise = require("bluebird")
const path = require("path")

// This is required for any markdown folder template files in our

// module.exports.onCreateNode = ({ node, actions }) => {
//   const slug = path.basename(node.findAbsolutePath, ".md")

//   createNodeField({
//     node,
//     name: "slug",
//     value: slug,
//   })
// }

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog.js")
    const otherPage = path.resolve("./src/templates/otherPages.js")
    const footerPage = path.resolve("./src/templates/footerPages.js")
    const categoryPage = path.resolve("./src/templates/categoryPages.js")

    resolve(
      graphql(
        `
          {
            allContentfulBlog {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulCompanyPage {
              nodes {
                slug
                title
              }
            }
            allContentfulHelpPage {
              nodes {
                title
                slug
              }
            }
            allContentfulOtherPages {
              edges {
                node {
                  slug
                  title
                }
              }
            }
            allContentfulCategory {
              edges {
                node {
                  slug
                  title {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        const posts = result.data.allContentfulBlog.edges
        const companyPages = result.data.allContentfulCompanyPage.nodes
        const helpPages = result.data.allContentfulHelpPage.nodes
        const otherPages = result.data.allContentfulOtherPages.edges
        const categoryPages = result.data.allContentfulCategory.edges

        console.info("posts", categoryPages.node)
        console.info("heyyoo", result.data.allContentfulHelpPage.nodes)

        // const pages = result.data.allContentNavMenu.nodes.otherTitles
        posts.forEach(post => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
            },
          })
        })

        categoryPages.forEach(page => {
          console.info("yarrak", page, "yarrak2", page.node.slug)
          createPage({
            path: `/${page.node.slug}/`,
            component: categoryPage,
            context: {
              slug: page.node.slug,
            },
          })
        })

        companyPages.forEach(page => {
          createPage({
            path: `/${page.slug}/`,
            component: footerPage,
            context: {
              slug: page.slug,
            },
          })
        })

        helpPages.forEach(page => {
          createPage({
            path: `/${page.slug}/`,
            component: footerPage,
            context: {
              slug: page.slug,
            },
          })
        })

        otherPages.forEach(page => {
          createPage({
            path: `/${page.node.slug}/`,
            component: otherPage,
            context: {
              slug: page.node.slug,
            },
          })
        })
      })
    )
  })
}
