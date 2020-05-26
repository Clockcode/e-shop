import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import footerStyle from "./styles/footer.module.scss"
import facebook from "../images/facebook.svg"
import twitter from "../images/twitter.svg"
import linkedin from "../images/linkedin.svg"
import instagram from "../images/instagram.svg"

const Footer = ({ companyPages, helpPages, footerText }) => {
  return (
    <footer>
      <div className={footerStyle.footItems}>
        <div className={footerStyle.footItem}>
          <h3>Company</h3>
          {companyPages &&
            companyPages.map(item => {
              return (
                <h4>
                  <Link to={item.slug}>{item.Title}</Link>
                </h4>
              )
            })}
        </div>
        <div className={(footerStyle.middleDiv, footerStyle.footItem)}>
          <h3 className={footerStyle.classy}>{footerText}</h3>
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
          {helpPages &&
            helpPages.map(item => {
              return (
                <h4>
                  <Link to={item.slug}>{item.Title}</Link>
                </h4>
              )
            })}
        </div>
      </div>
      <div className={footerStyle.footerBottom}></div>
    </footer>
  )
}

export default Footer
