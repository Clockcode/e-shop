import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import gql from "graphql-tag"
import { client } from "../../wrap-with-provider"
import footerStyle from "./styles/footer.module.scss"
import facebook from "../images/facebook.svg"
import twitter from "../images/twitter.svg"
import linkedin from "../images/linkedin.svg"
import instagram from "../images/instagram.svg"
const FOOTER_QUERY = gql`
  {
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
  }
`

const Footer = () => {
  const [helpTitles, setHelpTitles] = useState([{ title: "", slug: "" }])
  const [companyTitles, setCompanyTitles] = useState([{ title: "", slug: "" }])

  const fillFooter = () => {
    client
      .query({
        query: FOOTER_QUERY,
      })
      .then(res => {
        let helpPages = res.data.allContentfulHelpPage.nodes
        let companyPages = res.data.allContentfulCompanyPage.nodes

        let tempArray = []
        let tempArray2 = []

        helpPages.map(item => {
          tempArray.push({
            title: item.title,
            slug: item.slug,
          })
        })
        companyPages.map(item => {
          tempArray2.push({
            title: item.title,
            slug: item.slug,
          })
        })
        setHelpTitles([...tempArray])
        setCompanyTitles([...tempArray2])
      })
  }

  useEffect(() => {
    fillFooter()
  }, [])

  return (
    <footer>
      <div className={footerStyle.footItems}>
        <div className={footerStyle.footItem}>
          <h3>Company</h3>
          {companyTitles && companyTitles.length > 0
            ? companyTitles.map(item => {
              return (
                <h4>
                  <Link to={item.slug}>{item.title}</Link>
                </h4>
              )
            })
            : null}
        </div>
        <div className={(footerStyle.middleDiv, footerStyle.footItem)}>
          <h3 className={footerStyle.classy}>
            Be part of our Thoughtful Fashion
          </h3>
          <div className={footerStyle.socialLinks}>
            <a>
              <img src={facebook}></img>
            </a>
            <a>
              <img src={instagram}></img>
            </a>
            <a>
              <img src={linkedin}></img>
            </a>
            <a>
              <img src={twitter}></img>
            </a>
          </div>
          <h5>@DERRY</h5>
        </div>
        <div className={footerStyle.footItem}>
          <h3>Help</h3>
          {/* {helpTitles && helpTitles.length > 0
            ? helpTitles.map(item => {
                return (
                  <h4>
                    <Link to={item.slug}>{item.title}</Link>
                  </h4>
                )
              })
            : null} */}
        </div>
      </div>
      <div className={footerStyle.footerBottom}></div>
    </footer>
  )
}

export default Footer
