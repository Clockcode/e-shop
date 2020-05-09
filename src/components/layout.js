import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import "../styles/index.scss"
import layoutStyle from "./styles/layout.module.scss"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className={layoutStyle.container}>
        <div className={layoutStyle.content}>
          {/* <Header  /> */}
          <main>{children}</main>
        </div>
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
