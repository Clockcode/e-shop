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
    const productPage = path.resolve("./src/templates/productPages.js")

    resolve(
      graphql(
        `
        {
          allStrapiBrand {
            edges {
              node {
                BrandName
                slug
              }
            }
          }
          allStrapiCategory {
            edges {
              node {
                Title
                slug
              }
            }
          }
          allStrapiFooterCompanyPages {
            edges {
              node {
                PageTitle
                slug
              }
            }
          }
          allStrapiFooterHelpPages {
            edges {
              node {
                Title
                slug
              }
            }
          }
          allStrapiMenuOtherPages {
            edges {
              node {
                PageTitle
                Title
                slug
              }
            }
          }
          allStrapiProduct {
            edges {
              node {
                ProductName
                slug
                Categories {
                  Title
                  slug
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
        console.info('resultssssss', result)
        // const posts = result.data.allStrapi.edges
        const companyPages = result.data.allStrapiFooterCompanyPages.edges
        const helpPages = result.data.allStrapiFooterHelpPages.edges
        const otherPages = result.data.allStrapiMenuOtherPages.edges
        const categoryPages = result.data.allStrapiCategory.edges
        const productPages = result.data.allStrapiProduct.edges

        // posts.forEach(post => {
        //   createPage({
        //     path: `/blog/${post.node.slug}/`,
        //     component: blogPost,
        //     context: {
        //       slug: post.node.slug,
        //     },
        //   })
        // })

        categoryPages.forEach(page => {
          createPage({
            path: `/${page.node.slug}/`,
            component: categoryPage,
            context: {
              slug: page.node.slug,
            },
          })

          productPages.forEach(page => {
            createPage({
              path: `/${page.node.Categories[0].slug}/${page.node.slug}`,
              component: productPage,
              context: {
                slug: page.node.slug,
              },
            })
          })
        })

        companyPages.forEach(page => {
          createPage({
            path: `/${page.node.slug}/`,
            component: footerPage,
            context: {
              slug: page.node.slug,
            },
          })
        })

        helpPages.forEach(page => {
          createPage({
            path: `/${page.node.slug}/`,
            component: footerPage,
            context: {
              slug: page.node.slug,
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
