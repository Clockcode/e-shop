import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyle from "./styles/header.module.scss"
import Dashboard from "./dashboard"
import bag from "../images/bag.svg"
import search from "../images/search.svg"
import user from "../images/user.svg"
import Navigation from "../components/navigation"
import { useSelector, shallowEqual } from "react-redux"
const Header = ({ siteTitle, categories, otherPages }) => {
  const isMobileState = useSelector(
    state => state.menuReducer.isMobile,
    shallowEqual
  )

  const animateHeader = () => {
    let siteTitle = document.querySelector("#sitetitle")

    if (
      document.body.scrollTop > 50 ||
      (document.documentElement.scrollTop > 50 && siteTitle)
    ) {
      siteTitle.style.fontSize = "20px"
      siteTitle.style.lineHeight = "20px"
      siteTitle.style.fontWeight = "300"
      // console.info("asaagida")
    } else {
      if (siteTitle) {
        siteTitle.style.fontSize = "30px"
        siteTitle.style.lineHeight = "30px"
        // console.info("yukarda")
      }
    }
  }
  if (typeof window !== `undefined`) {
    window.onscroll = () => {
      animateHeader()
    }
  }
  return (
    <header>
      <Navigation categories={categories} otherPages={otherPages} />
      <span className={headerStyle.siteTitle}>
        <h1>
          <Link
            to="/"
            style={{
              color: `black`,
              textDecoration: `none`,
              letterSpacing: "5.5px",
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </span>
      {isMobileState ? (
        <React.Fragment>
          <div className={headerStyle.mobileWrapper}>
            <a>
              <img src={user}></img>
            </a>
            <a>
              <img src={search}></img>
            </a>
            <a>
              <img src={bag}></img>
            </a>
          </div>
        </React.Fragment>
      ) : (
        <Dashboard />
      )}
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
