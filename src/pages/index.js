import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import MainpageIntro from "../components/mainpageintro"
import BelowSection from "../components/belowsection"
import MailSignup from "../components/mailsignup"
import Footer from "../components/footer"
import FeaturedProduct from "../components/featuredproduct"
import Header from "../components/header"
import headerStyle from "../components/styles/header.module.scss"

export const pageQuery = graphql`
  query HomePageQuery {
    allStrapiHomePage {
      edges {
        node {
          HomePageTitle
          Description
          Banner {
            Picture {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
            Caption
          }
          Seo {
            Canonical
            Description
            Keywords
            SiteTitle
          }
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
          SectionBelow {
            SectionCaption
            SectionImage {
              childImageSharp {
                fluid {
                  src
                }
              }
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
          product {
            Category
            Price
            ProductName
            Variations {
              Color
              Size
              Quantity
              SKU
              ProductVariationsPics {
                PictureCaption
                ProductPicture {
                  childImageSharp {
                    fluid {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  let womenImage = `${data.allStrapiHomePage.edges[0].node.Banner[0].Picture.childImageSharp.fluid.src}`
  let womenCaption = `${data.allStrapiHomePage.edges[0].node.Banner[0].Caption}`
  let menImage = `${data.allStrapiHomePage.edges[0].node.Banner[1].Picture.childImageSharp.fluid.src}`
  let menCaption = `${data.allStrapiHomePage.edges[0].node.Banner[1].Caption}`
  // let bannerImage = `${data.allStrapiHomePage.edges[0].node.firstRow[2].fluid.src}`

  let firstImage = `${data.allStrapiHomePage.edges[0].node.SectionBelow[0].SectionImage.childImageSharp.fluid.src}`
  let secondImage = `${data.allStrapiHomePage.edges[0].node.SectionBelow[1].SectionImage.childImageSharp.fluid.src}`
  let firstImageTitle = `${data.allStrapiHomePage.edges[0].node.SectionBelow[0].SectionCaption}`
  let secondImageTitle = `${data.allStrapiHomePage.edges[0].node.SectionBelow[1].SectionCaption}`

  let description = data.allStrapiHomePage.edges[0].node.Description

  let featuredProducts = data.allStrapiHomePage.edges[0].node.product
  let seoTemp = data.allStrapiHomePage.edges[0].node.Seo
  let navTemp = data.allStrapiHomePage.edges[0].node
  let companyPages =
    data.allStrapiHomePage.edges[0].node.Footer.footer_company_pages
  let helpPages =
    data.allStrapiHomePage.edges[0].node.Footer.footer_company_pages
  let footerText = data.allStrapiHomePage.edges[0].node.Footer.FoooterText
  return (
    <Layout>
      <SEO
        title="Home"
        title={seoTemp.SiteTitle}
        description={seoTemp.Description}
        metakeys={seoTemp.Keywords}
        canonical={seoTemp.Canonical}
      />
      <Header
        categories={navTemp.NavigationMenu.categories}
        otherPages={navTemp.NavigationMenu.menu_other_pages}
        className={headerStyle.navigation}
        siteTitle={navTemp.HomePageTitle}
      />
      <MainpageIntro
        womenImage={womenImage}
        womenImageTitle={womenCaption}
        menImage={menImage}
        menImageTitle={menCaption}
      />
      <FeaturedProduct featuredProducts={featuredProducts} />
      <BelowSection
        firstImage={firstImage}
        secondImage={secondImage}
        firstImageTitle={firstImageTitle}
        secondImageTitle={secondImageTitle}
      />

      <MailSignup description={description} />

      <Footer
        footerText={footerText}
        helpPages={helpPages}
        companyPages={companyPages}
      />
    </Layout>
  )
}

export default IndexPage
