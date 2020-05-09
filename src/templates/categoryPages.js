import React, { useEffect } from "react"
import { Link, graphql } from "gatsby"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import CatBreadCrumb from "../components/catbreadcrumbs"
import MobileFilter from "../components/mobilefilter"
import CategoryProducts from "../components/categoryproducts"

import Layout from "../components/layout"
import MobileSort from "../components/mobilesort"

import Header from "../components/header"
import headerStyle from "../components/styles/header.module.scss"
import { fetchCategories } from "../state/actions/categoryActions"

export const query = graphql`
  query($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title {
        title
      }
      categoryDescription {
        childMarkdownRemark {
          html
        }
      }
      headerImage {
        fluid {
          src
        }
      }
      icon {
        fluid {
          src
        }
      }
      slug
      product {
        id
        color
        price
        size
        quantity
        sku
        slug
        productName {
          productName
        }
        image {
          fluid {
            src
          }
        }
        filters {
          fit
          gender
          seasonType
          style
        }
      }
    }
    allContentfulNavMenu {
      edges {
        node {
          categories {
            ... on ContentfulCategory {
              title {
                title
              }
              slug
              icon {
                fluid {
                  src
                }
              }
              categoryDescription {
                categoryDescription
              }
            }
          }
          otherPages {
            title
            slug
          }
        }
      }
    }
  }
`

const CategoryPages = props => {
  const checkedPriceFilters = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )
  const checkedFitFiltersState = useSelector(
    state => state.filterReducer.checkedFitFilters,
    shallowEqual
  )
  const checkedStyledFiltersState = useSelector(
    state => state.filterReducer.checkedStyledFilters,
    shallowEqual
  )
  const checkedSeasonFiltersState = useSelector(
    state => state.filterReducer.checkedSeasonFilters,
    shallowEqual
  )

  const dispatch = useDispatch()
  const fetchCategoriesLocal = () => {
    let navCategory = props.data.contentfulCategory.title.title
    let categoryProds = props.data.contentfulCategory.product
    let loading = false
    let currentPage = 1

    dispatch(
      fetchCategories({
        navCategory,
        loading,
        currentPage,
        categoryProds,
      })
    )
  }

  useEffect(() => {
    if (
      checkedPriceFilters.length === 0 &&
      checkedFitFiltersState.length === 0 &&
      checkedStyledFiltersState.length === 0 &&
      checkedSeasonFiltersState.length === 0
    ) {
      fetchCategoriesLocal()
    }
  }, [
    checkedPriceFilters,
    checkedFitFiltersState,
    checkedStyledFiltersState,
    checkedSeasonFiltersState,
  ])

  const createMarkup = () => {
    return {
      __html:
        props.data.contentfulCategory.categoryDescription.childMarkdownRemark
          .html,
    }
  }
  const isMobile = window.innerWidth <= 510;
  return (
    <Layout>
      <Header
        categories={props.data.allContentfulNavMenu.edges[0].node.categories}
        otherPages={props.data.allContentfulNavMenu.edges[0].node.otherPages}
        className={headerStyle.navigation}
        siteTitle={"DERRY"}
      />
      <CatBreadCrumb
        title={props.data.contentfulCategory.title.title}
        slug={props.data.contentfulCategory.slug}
      />
      <h1 className="categoryPageTitle">
        {props.data.contentfulCategory.title.title}
      </h1>
      {/* <p dangerouslySetInnerHTML={createMarkup()} /> */}
      {
        isMobile ?
          <div style={{ display: "flex" }}>
            <MobileFilter catSlug={props.data.contentfulCategory.slug} />
            <MobileSort catSlug={props.data.contentfulCategory.slug} />
          </div>
          : <div style={{ float: "left", display: "inline-block", width: "18vw" }}>
            <MobileFilter catSlug={props.data.contentfulCategory.slug} />
            <MobileSort catSlug={props.data.contentfulCategory.slug} />
          </div>
      }

      <CategoryProducts catSlug={props.data.contentfulCategory.slug} />
    </Layout>
  )
}

export default CategoryPages
