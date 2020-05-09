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

// export const query = graphql`
//   query($slug: String!) {
//     contentfulCategory(slug: { eq: $slug }) {
//       title {
//         title
//       }
//       categoryDescription {
//         childMarkdownRemark {
//           html
//         }
//       }
//       headerImage {
//         fluid {
//           src
//         }
//       }
//       icon {
//         fluid {
//           src
//         }
//       }
//       slug
//       product {
//         id
//         color
//         price
//         size
//         quantity
//         sku
//         slug
//         productName {
//           productName
//         }
//         image {
//           fluid {
//             src
//           }
//         }
//         filters {
//           fit
//           gender
//           seasonType
//           style
//         }
//       }
//     }
//     allContentfulNavMenu {
//       edges {
//         node {
//           categories {
//             ... on ContentfulCategory {
//               title {
//                 title
//               }
//               slug
//               icon {
//                 fluid {
//                   src
//                 }
//               }
//               categoryDescription {
//                 categoryDescription
//               }
//             }
//           }
//           otherPages {
//             title
//             slug
//           }
//         }
//       }
//     }
//   }
// `
export const pageQuery = graphql`
  query ProductsQuery {
  allStrapiProduct {
    totalCount
    edges {
      node {
        ProductName
        slug
        Variations {
          Color
          DiscountedPrice
          Price
          Quantity
          Size
        }
        Brand {
          BrandName
        }
      }
    }
  }
  allStrapiHomePage {
    edges {
      node {
        NavigationMenu {
          menu_other_pages {
            Title
            PageTitle
            slug
          }
          categories {
            Title
            slug
          }
        }
      }
    }
  }
}`
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
    let navCategory = data.data.contentfulCategory.title.title
    let categoryProds = data.data.allStrapiHomePage.edges[0].node.product
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
  const isMobile = window.innerWidth <= 510;
  console.info("cagdas", data)

  let navTemp = data.data.allStrapiHomePage.edges[0].node
  let products = data.data.allStrapiProducts.edges

  return (
    <Layout>
      <Header
        categories={navTemp.NavigationMenu.categories}
        otherPages={navTemp.NavigationMenu.menu_other_pages}
        className={headerStyle.navigation}
        siteTitle={navTemp.HomePageTitle}
      />
      <CatBreadCrumb
        title={data.data.contentfulCategory.title.title}
        slug={data.data.contentfulCategory.slug}
      />
      <h1 className="categoryPageTitle">
        {data.data.contentfulCategory.title.title}
      </h1>
      {/* <p dangerouslySetInnerHTML={createMarkup()} /> */}
      {
        isMobile ?
          <div style={{ display: "flex" }}>
            <MobileFilter catSlug={data.data.contentfulCategory.slug} />
            <MobileSort catSlug={data.data.contentfulCategory.slug} />
          </div>
          : <div style={{ float: "left", display: "inline-block", width: "18vw" }}>
            <MobileFilter catSlug={data.data.contentfulCategory.slug} />
            <MobileSort catSlug={data.data.contentfulCategory.slug} />
          </div>
      }

      <CategoryProducts catSlug={data.data.contentfulCategory.slug} />
    </Layout>
  )
}

export default CategoryPages
