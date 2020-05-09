// import React from "react"
// import { Link, graphql } from "gatsby"

// import Layout from "../components/layout"

// export const query = graphql`
//   query BlogPostsQuery {
//     allContentfulBlog {
//       edges {
//         node {
//           title
//           slug
//           description
//         }
//       }
//     }
//   }
// `

// const Blog = ({ data }) => {
//   return (
//     <React.Fragment>
//       <Layout>
//         <h1>Blog Posts</h1>
//         {data.allContentfulBlog.edges.map(edge => {
//           return (
//             <li>
//               <Link to={`/blog/${edge.node.slug}`}>
//                 <h2>{edge.node.title}</h2>
//                 <p>{edge.node.description}</p>
//               </Link>
//             </li>
//           )
//         })}
//       </Layout>
//     </React.Fragment>
//   )
// }

// export default Blog
