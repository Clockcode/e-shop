import React from "react"
import { Link, graphql } from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer"

import headerStyle from "../components/styles/header.module.scss"
import footerPagesStyle from "../components/styles/footerPages.module.scss"

import Layout from "../components/layout"

export const query = graphql`
  query($slug: String!) {
    strapiFooterHelpPages(slug: { eq: $slug }) {
      Title
      PageContent
      slug
    }
    strapiHomePage {
      NavigationMenu {
        categories {
          Title
          Description
          slug
        }
        menu_other_pages {
          Title
          slug
          PageContent
        }
      }
      Footer {
        FoooterText
        footer_company_pages {
          Title
          PageContent
          slug
        }
        footer_help_pages {
          PageContent
          Title
          slug
        }
      }
    }
  }
`

const HelpPages = ({ data }) => {
  return (
    <React.Fragment>
      <Layout>
        <Header
          categories={data.strapiHomePage.NavigationMenu.categories}
          otherPages={data.strapiHomePage.NavigationMenu.menu_other_pages}
          className={headerStyle.navigation}
        />
        <div className={footerPagesStyle.pageWrapper}>
          <h1>{data.strapiFooterHelpPages.Title}</h1>
          <p>{data.strapiFooterHelpPages.PageContent}</p>
        </div>

        <Footer
          footerText={data.strapiHomePage.Footer.FoooterText}
          helpPages={data.strapiHomePage.Footer.footer_help_pages}
          companyPages={data.strapiHomePage.Footer.footer_company_pages}
        />
      </Layout>
    </React.Fragment>
  )
}

export default HelpPages
