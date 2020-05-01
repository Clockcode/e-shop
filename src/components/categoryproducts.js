import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import gql from "graphql-tag"

import Pagination from "./Pagination"
import catProductsStyle from "./styles/categoryproducts.module.scss"

import {
  changePage,
  sortCategorieProducts,
  filterByPriceAdd,
  filterByPrice,
  filterByPriceRemove,
} from "../state/actions/categoryActions"
import { client } from "../../wrap-with-provider"

const SORT_FILTER_QUERY = gql`
  query sortFilterProducts(
    $catSlugG: String
    $valueG: [SortOrderEnum]
    $greaterThan: Float
    $lessThan: Float
    $sortType: [ContentfulProductFieldsEnum]
    $fit: ContentfulFiltersFilterInput
  ) {
    allContentfulProduct(
      filter: {
        price: { gt: $greaterThan, lte: $lessThan }
        categories: { elemMatch: { slug: { eq: $catSlugG } } }
        filters: $fit
      }
      sort: { fields: $sortType, order: $valueG }
    ) {
      nodes {
        id
        price
        slug
        discountedPrice
        image {
          fluid {
            src
          }
          title
        }
        productName {
          productName
        }
      }
    }
  }
`
const PRODUCT_QUERY = gql`
  query sortProducts($catSlugG: String, $fit: ContentfulFiltersFilterInput) {
    allContentfulProduct(
      filter: {
        categories: { elemMatch: { slug: { eq: $catSlugG } } }
        filters: $fit
      }
    ) {
      nodes {
        id
        price
        slug
        discountedPrice
        image {
          fluid {
            src
          }
          title
        }
        productName {
          productName
        }
      }
    }
  }
`

const CategoryProducts = ({ catSlug }) => {
  const dispatch = useDispatch()

  const categoryProductsState = useSelector(
    state => state.categoryReducer.categoryProducts,
    shallowEqual
  )
  const currentPageState = useSelector(
    state => state.categoryReducer.currentPage,
    shallowEqual
  )
  const productPerPageState = useSelector(
    state => state.categoryReducer.productPerPage,
    shallowEqual
  )
  const sortProductState = useSelector(
    state => state.categoryReducer.sortProductState,
    shallowEqual
  )

  const checkedPriceFilters = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )
  const minPriceInterval = useSelector(
    state => state.filterReducer.minPriceInterval,
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

  // Get current posts
  const indexOfLastPost = currentPageState * productPerPageState
  const indexOfFirstPost = indexOfLastPost - productPerPageState

  // const currentPosts = categoryProductsState.slice(
  //   indexOfFirstPost,
  //   indexOfLastPost
  // )

  const lastRemovedPriceFilter = useSelector(
    state => state.filterReducer.lastRemovedPriceFilter,
    shallowEqual
  )

  // Change page
  const paginate = pageNumber => dispatch(changePage(pageNumber))

  const fetchFilterSortCategorieProducts = () => {
    let tempArray = checkedPriceFilters
    let letfitArray = checkedFitFiltersState.map(item => item.value)
    let styledArray = checkedStyledFiltersState.map(item => item.value)
    let seasonArray = checkedSeasonFiltersState.map(item => item.value)
    // let letfitArray = ["Slim", "Oversized"]
    let fullFiltersBoolean =
      checkedFitFiltersState.length > 0 ||
      checkedStyledFiltersState.length > 0 ||
      checkedSeasonFiltersState.length > 0

    const fullFitFilters = {
      fit: { in: ["Slim", "Oversized", "Cropped", "Regular"] },
      style: { in: ["Jacket", "Biker", "Blazer", "Coat", "Mac"] },
      seasonType: {
        in: ["New Season", "Regular", "Best Seller", "Discounted"],
      },
    }
    let tempString = {}
    let temp1 = {}
    let temp2 = {}
    let temp3 = {}

    if (letfitArray.length > 0) {
      temp1 = { fit: { in: letfitArray } }
    }
    if (styledArray.length > 0) {
      temp2 = { style: { in: styledArray } }
    }
    if (seasonArray.length > 0) {
      temp3 = { seasonType: { in: seasonArray } }
    }

    if (
      letfitArray.length > 0 &&
      styledArray.length > 0 &&
      seasonArray.length === 0
    ) {
      tempString = { ...temp1, ...temp2 }
    } else if (
      seasonArray.length > 0 &&
      styledArray.length > 0 &&
      letfitArray.length === 0
    ) {
      tempString = { ...temp3, ...temp2 }
    } else if (
      seasonArray.length > 0 &&
      letfitArray.length > 0 &&
      styledArray.length === 0
    ) {
      tempString = { ...temp3, ...temp1 }
    } else if (
      seasonArray.length > 0 &&
      letfitArray.length > 0 &&
      styledArray.length > 0
    ) {
      tempString = { ...temp3, ...temp1, ...temp2 }
    } else if (
      letfitArray.length > 0 &&
      styledArray.length === 0 &&
      seasonArray.length === 0
    ) {
      tempString = temp1
    } else if (
      letfitArray.length === 0 &&
      styledArray.length > 0 &&
      seasonArray.length === 0
    ) {
      tempString = temp2
    } else if (
      letfitArray.length === 0 &&
      styledArray.length === 0 &&
      seasonArray.length > 0
    ) {
      tempString = temp3
    }
    if (tempArray.length > 0) {
      tempArray.map((item, index) => {
        if (index === 0) {
          if (item.value / minPriceInterval != 5) {
            client
              .query({
                query: SORT_FILTER_QUERY,
                variables: {
                  catSlugG: catSlug,
                  valueG:
                    sortProductState === "ASC" || sortProductState === "DESC"
                      ? sortProductState
                      : "ASC",
                  greaterThan:
                    item.value / minPriceInterval === 1
                      ? parseFloat(0)
                      : parseFloat(item.value / minPriceInterval - 1) *
                        minPriceInterval,
                  lessThan: parseFloat(item.value),
                  sortType: "price",
                  fit: fullFiltersBoolean ? tempString : fullFitFilters,
                },
              })
              .then(res => {
                let categoryProducts = res.data.allContentfulProduct.nodes
                dispatch(sortCategorieProducts(categoryProducts))
                console.info("catpros", CategoryProducts)
              })
          } else {
            client
              .query({
                query: SORT_FILTER_QUERY,
                variables: {
                  catSlugG: catSlug,
                  valueG: "ASC",
                  greaterThan: parseFloat(item.value - minPriceInterval),
                  lessThan: parseFloat(10000000000),
                  sortType: "price",
                  fit: fullFiltersBoolean ? tempString : fullFitFilters,
                },
              })
              .then(res => {
                let categoryProducts = res.data.allContentfulProduct.nodes
                dispatch(sortCategorieProducts(categoryProducts))
              })
          }
        } else if (index > 0) {
          if (sortProductState === "ASC" || sortProductState === "DESC") {
            let tempValue = item.value
            if (item.value / minPriceInterval != 5) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: sortProductState,
                    greaterThan:
                      item.value / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(
                            (item.value / minPriceInterval - 1) *
                              minPriceInterval
                          ),
                    lessThan: parseFloat(item.value),
                    sortType: "price",
                    fit: fullFiltersBoolean ? tempString : fullFitFilters,
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.nodes
                  dispatch(filterByPriceAdd({ categoryProducts, tempValue }))
                })
            } else {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: sortProductState,
                    greaterThan: parseFloat(item.value - minPriceInterval),
                    lessThan: parseFloat(10000000000),
                    sortType: "price",
                    fit: fullFiltersBoolean ? tempString : fullFitFilters,
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.nodes
                  dispatch(filterByPriceAdd({ categoryProducts, tempValue }))
                })
            }
          } else if (sortProductState === "r") {
            if (item.value / minPriceInterval != 5) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan:
                      item.value / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(
                            (item.value / minPriceInterval - 1) *
                              minPriceInterval
                          ),
                    lessThan: parseFloat(item.value),
                    sortType: "price",
                    fit: fullFiltersBoolean ? tempString : fullFitFilters,
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.nodes
                  dispatch(filterByPrice(categoryProducts))
                })
            } else {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan: parseFloat(item.value - minPriceInterval),
                    lessThan: parseFloat(10000000000),
                    sortType: "price",
                    fit: fullFiltersBoolean ? tempString : fullFitFilters,
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.nodes
                  dispatch(filterByPrice(categoryProducts))
                })
            }
          } else if (sortProductState === "highest-discount") {
            if (item.value / minPriceInterval != 5) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan:
                      item.value / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(
                            (item.value / minPriceInterval - 1) *
                              minPriceInterval
                          ),
                    lessThan: parseFloat(item.value),
                    sortType: "price",
                    fit: fullFiltersBoolean ? tempString : fullFitFilters,
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.nodes
                  dispatch(filterByPrice(categoryProducts))
                })
            } else {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    catSlugG: catSlug,
                    valueG: "ASC",
                    greaterThan: parseFloat(item.value - minPriceInterval),
                    lessThan: parseFloat(10000000000),
                    sortType: "price",
                    fit: fullFiltersBoolean ? tempString : fullFitFilters,
                  },
                })
                .then(res => {
                  const categoryProducts = res.data.allContentfulProduct.nodes
                  dispatch(filterByPrice(categoryProducts))
                })
            }
          }
        }
      })
    } else if (fullFiltersBoolean && tempArray.length === 0) {
      if (sortProductState === "ASC" || sortProductState === "DESC") {
        client
          .query({
            query: SORT_FILTER_QUERY,
            variables: {
              catSlugG: catSlug,
              valueG: sortProductState,
              greaterThan: parseFloat(0),
              lessThan: parseFloat(10000000),
              sortType: "price",
              fit: fullFiltersBoolean ? tempString : fullFitFilters,
            },
          })
          .then(res => {
            const categoryProducts = res.data.allContentfulProduct.nodes
            dispatch(sortCategorieProducts(categoryProducts))
          })
      } else if (sortProductState === "r") {
        client
          .query({
            query: PRODUCT_QUERY,
            variables: {
              catSlugG: catSlug,
              fit: fullFiltersBoolean ? tempString : fullFitFilters,
            },
          })
          .then(res => {
            const categoryProducts = res.data.allContentfulProduct.nodes
            dispatch(sortCategorieProducts(categoryProducts))
          })
      } else if (sortProductState === "highest-discount") {
        client
          .query({
            query: SORT_FILTER_QUERY,
            variables: {
              catSlugG: catSlug,
              valueG: "ASC",
              greaterThan: parseFloat(0),
              lessThan: parseFloat(10000000),
              sortType: "discountedPrice",
              fit: fullFiltersBoolean ? tempString : fullFitFilters,
            },
          })
          .then(res => {
            const categoryProducts = res.data.allContentfulProduct.nodes
            dispatch(sortCategorieProducts(categoryProducts))
          })
      }
    }
  }

  useEffect(() => {
    fetchFilterSortCategorieProducts()
  }, [
    checkedPriceFilters,
    sortProductState,
    checkedFitFiltersState,
    checkedStyledFiltersState,
    checkedSeasonFiltersState,
  ])

  return (
    <React.Fragment>
      <section className={catProductsStyle.catWraper}>
        {categoryProductsState && categoryProductsState.length > 0 ? (
          categoryProductsState.map(item => {
            return (
              <article>
                <Link to={`${catSlug}/${item.slug}`}>
                  <span id={catProductsStyle.best}>BEST</span>
                  <span id={catProductsStyle.sale}>SALE</span>
                  <img
                    src={item.image[0].fluid.src}
                    alt={item.productName.productName}
                  />
                  <h4>{item.productName.productName}</h4>
                </Link>
                <aside>
                  <span>CA${item.price.toFixed(2)}</span>
                  {/* <span>CA${item.discountedPrice}</span> */}
                </aside>
              </article>
            )
          })
        ) : (
          <h1>Unfortunetely, there is no products in this category.</h1>
        )}
      </section>
      {categoryProductsState && categoryProductsState.length > 0 ? (
        <Pagination
          productPerPage={productPerPageState}
          totalProducts={categoryProductsState.length}
          paginate={paginate}
          currentPage={currentPageState}
        />
      ) : null}
    </React.Fragment>
  )
}

export default CategoryProducts
