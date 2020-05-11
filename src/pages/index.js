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
          BelowImages {
            formats {
              large {
                childImageSharp {
                  fluid {
                    src
                  }
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
              ProductImages {
                formats {
                  medium {
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
  }
`

const IndexPage = ({ data }) => {
  // let imageUrl = `https:${data.allContentfulMainPage.nodes[0].mainImage.fluid.src}`
  console.info("ozan", data)

  let womenImage = `${data.allStrapiHomePage.edges[0].node.Banner[0].Picture.childImageSharp.fluid.src}`

  let menImage = `${data.allStrapiHomePage.edges[0].node.Banner[1].Picture.childImageSharp.fluid.src}`
  // let bannerImage = `${data.allStrapiHomePage.edges[0].node.firstRow[2].fluid.src}`

  let firstImage = `${data.allStrapiHomePage.edges[0].node.BelowImages[0].formats.large.childImageSharp.fluid.src}`
  let secondImage = `${data.allStrapiHomePage.edges[0].node.BelowImages[1].formats.large.childImageSharp.fluid.src}`
  let description = data.allStrapiHomePage.edges[0].node.Description

  // let longDescription =
  //   data.allContentfulMainPage.nodes[0].longDescription.longDescription

  let featuredProducts = data.allStrapiHomePage.edges[0].node.product
  let seoTemp = data.allStrapiHomePage.edges[0].node.Seo
  let navTemp = data.allStrapiHomePage.edges[0].node
  let companyPages =
    data.allStrapiHomePage.edges[0].node.Footer.footer_company_pages
  let helpPages =
    data.allStrapiHomePage.edges[0].node.Footer.footer_company_pages
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
        womenImageTitle={data.allStrapiHomePage.edges[0].node.Banner.Caption}
        menImage={menImage}
        menImageTitle={data.allStrapiHomePage.edges[0].node.Banner.Caption}
      />
      <FeaturedProduct featuredProducts={featuredProducts} />
      <BelowSection
        firstImage={firstImage}
        secondImage={secondImage}
        // firstImageTitle={data.allContentfulMainPage.nodes[0].secondRow[0].title}
        // secondImageTitle={
        //   data.allContentfulMainPage.nodes[0].secondRow[1].title
        // }
        // longDescription={longDescription}
      />

      <MailSignup description={description} />
      {/* <h1>{data.allContentfulMainPage.nodes[0].mainTitle}</h1> */}
      {/* <img src={imageUrl} alt="Girl in a Leather Jacket" /> */}

      <Footer helpPages={helpPages} companyPages={companyPages} />
    </Layout>
  )
}

export default IndexPage
