import React from "react"
import PropTypes from "prop-types"
import "../styles/index.scss"
import layoutStyle from "./styles/layout.module.scss"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className={layoutStyle.container}>
        <div className={layoutStyle.content}>
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
