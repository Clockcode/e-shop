// import React from "react"
// import { graphql } from "gatsby"
// // import { documentToReactComponents } from "@contentful/rich-text-renderer"

// import Layout from "../components/layout"

// export const query = graphql`
//   query($slug: String!) {
//     contentfulBlog(slug: { eq: $slug }) {
//       title
//       description
//       images {
//         fluid {
//           src
//         }
//       }
//       description
//       childContentfulBlogBlogPostContentTextNode {
//         childMarkdownRemark {
//           excerpt
//         }
//       }
//       childContentfulBlogBlogPostOtherContentTextNode {
//         childMarkdownRemark {
//           excerpt
//         }
//       }
//     }
//   }
// `

// const Blog = props => {
//   return (
//     <Layout>
//       <h1>{props.data.contentfulBlog.title}</h1>
//       <p>{props.data.contentfulBlog.description}</p>
//       {props.data.contentfulBlog.images.map(item => {
//         return <img src={`https:${item.fluid.src}`}></img>
//       })}
//     </Layout>
//   )
// }

// export default Blog
