import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const productPages = ({ data }) => {
  return (
    <React.Fragment>
      <Layout>
        <h1>No No Store</h1>
      </Layout>
    </React.Fragment>
  )
}

export default productPages
