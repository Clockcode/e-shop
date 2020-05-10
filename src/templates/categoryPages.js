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
    strapiCategory(slug: { eq: $slug }) {
      Title
      Description
      slug
      products {
        id
        ProductName
        Description
        slug
        Price
        DiscountedPrice
        Variations {
          SKU
          Size
          Color
          Quantity
          ProductImages {
            caption
            url
          }
        }
        ProductFilterSettings {
          Fit
          Gender
          SeasonType
          Style
        }
      }
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
          PageContent
          slug
        }
      }
    }
  }
`

const CategoryPages = data => {
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
    let navCategory = data.data.strapiCategory.Title
    let categoryProds = data.data.strapiCategory.products
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
        data.data.contentfulCategory.categoryDescription.childMarkdownRemark
          .html,
    }
  }
  const isMobile = window.innerWidth <= 510
  console.info("cagdas", data)

  let navTemp = data.data.strapiHomePage.NavigationMenu

  return (
    <Layout>
      <Header
        categories={navTemp.categories}
        otherPages={navTemp.menu_other_pages}
        className={headerStyle.navigation}
        siteTitle={data.data.strapiCategory.Title}
      />
      <CatBreadCrumb
        title={data.data.strapiCategory.Title}
        slug={data.data.strapiCategory.slug}
      />
      <h1 className="categoryPageTitle">{data.data.strapiCategory.Title}</h1>
      {/* <p dangerouslySetInnerHTML={createMarkup()} /> */}
      {isMobile ? (
        <div style={{ display: "flex" }}>
          <MobileFilter catSlug={data.data.strapiCategory.slug} />
          <MobileSort catSlug={data.data.strapiCategory.slug} />
        </div>
      ) : (
        <div style={{ float: "left", display: "inline-block", width: "18vw" }}>
          <MobileFilter catSlug={data.data.strapiCategory.slug} />
          <MobileSort catSlug={data.data.strapiCategory.slug} />
        </div>
      )}

      <CategoryProducts catSlug={data.data.strapiCategory.slug} />
    </Layout>
  )
}

export default CategoryPages
