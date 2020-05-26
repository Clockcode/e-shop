/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, metakeys, title, canonical }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            siteTitle
          }
        }
      }
    `
  )
  // const metaDescription = seo.description.content[0].content[0].value

  return (
    <Helmet
      htmlAttributes={{
        lang: "eng",
      }}
      title={title}
      titleTemplate={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: `canonical`,
          content: canonical,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
        {
          name: `keywords`,
          content: metakeys,
        },
      ]}
    />
  )
}

// SEO.defaultProps = {
//   lang: `en`,
//   meta: [],
//   description: ``,
// }

// SEO.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
// }

export default SEO
