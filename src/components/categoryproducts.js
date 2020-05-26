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
  sortCategorieProductsByFilter,
} from "../state/actions/categoryActions"
import { client } from "../../wrap-with-provider"

const SORT_FILTER_QUERY = gql`
  query sortFilterProducts($input: JSON, $sortType: String) {
    products(where: $input, sort: $sortType) {
      id
      ProductName
      Description
      slug
      Price
      DiscountedPrice
      Categories {
        Title
        slug
      }
      Variations {
        SKU
        Size
        Color
        Quantity
        ProductVariationsPics {
          PictureCaption
          ProductPicture {
            formats
          }
        }
      }
      Fit
      Gender
      SeasonType
      Style
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
    let fitArray = checkedFitFiltersState.map(item => item)
    let styledArray = checkedStyledFiltersState.map(item => item)
    let seasonArray = checkedSeasonFiltersState.map(item => item)

    let queryObj = {
      variables: {
        input: {
          Categories: { slug: `${catSlug}` },
          Fit_in: fitArray.length > 0 ? fitArray : undefined,
          Style_in: styledArray.length > 0 ? styledArray : undefined,
          SeasonType_in: seasonArray.length > 0 ? seasonArray : undefined,
        },
        sortType: sortProductState === "null" ? undefined : sortProductState,
      },
    }

    if (tempArray.length > 0) {
      tempArray.map((item, index) => {
        if (index === 0) {
          if (item / minPriceInterval != 5) {
            let greaterThan =
              item / minPriceInterval === 1
                ? parseFloat(0)
                : parseFloat(item / minPriceInterval - 1) * minPriceInterval
            let lessThan = parseFloat(item)

            console.info(greaterThan, "greater", lessThan)
            client
              .query({
                query: SORT_FILTER_QUERY,
                variables: {
                  input: {
                    Categories: { slug: `${catSlug}` },
                    Price_gt: `${
                      item / minPriceInterval === 1
                        ? parseFloat(0)
                        : parseFloat(item / minPriceInterval - 1) *
                          minPriceInterval
                    }`,
                    Price_lt: `${lessThan}`,
                    Fit_in: fitArray.length > 0 ? fitArray : undefined,
                    Style_in: styledArray.length > 0 ? styledArray : undefined,
                    SeasonType_in:
                      seasonArray.length > 0 ? seasonArray : undefined,
                  },
                  sortType:
                    sortProductState === "null" ? undefined : sortProductState,
                },
              })
              .then(res => {
                console.info("data ozan", res)

                let categoryProducts = res.data.products
                dispatch(sortCategorieProducts(categoryProducts))
              })
          } else {
            let greaterThan = parseFloat(item - minPriceInterval)
            client
              .query({
                query: SORT_FILTER_QUERY,
                variables: {
                  input: {
                    Categories: { slug: `${catSlug}` },
                    Price_gt: `${greaterThan}`,
                    Fit_in: fitArray.length > 0 ? fitArray : undefined,
                    Style_in: styledArray.length > 0 ? styledArray : undefined,
                    SeasonType_in:
                      seasonArray.length > 0 ? seasonArray : undefined,
                  },
                  sortType:
                    sortProductState === "null" ? undefined : sortProductState,
                },
              })
              .then(res => {
                console.info("data ozan", res)

                let categoryProducts = res.data.products
                dispatch(sortCategorieProducts(categoryProducts))
              })
          }
        } else if (index > 0) {
          if (sortProductState !== "null") {
            let tempValue = item
            let greaterThan =
              item / minPriceInterval === 1
                ? parseFloat(0)
                : parseFloat((item / minPriceInterval - 1) * minPriceInterval)
            if (item / minPriceInterval != 5) {
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    input: {
                      Categories: { slug: `${catSlug}` },
                      Price_gt: `${greaterThan}`,
                      Price_lte: `${tempValue}`,
                      Fit_in: fitArray.length > 0 ? fitArray : undefined,
                      Style_in:
                        styledArray.length > 0 ? styledArray : undefined,
                      SeasonType_in:
                        seasonArray.length > 0 ? seasonArray : undefined,
                    },
                    sortType:
                      sortProductState === "null"
                        ? undefined
                        : sortProductState,
                  },
                })
                .then(res => {
                  console.info("data ozan", res)
                  const categoryProducts = res.data.products
                  dispatch(filterByPriceAdd({ categoryProducts, tempValue }))
                })
            } else {
              let greaterThan = parseFloat(item - minPriceInterval)
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    variables: {
                      input: {
                        Categories: { slug: `${catSlug}` },
                        Price_gt: `${greaterThan}`,
                        Fit_in: fitArray.length > 0 ? fitArray : undefined,
                        Style_in:
                          styledArray.length > 0 ? styledArray : undefined,
                        SeasonType_in:
                          seasonArray.length > 0 ? seasonArray : undefined,
                      },
                      sortType:
                        sortProductState === "null"
                          ? undefined
                          : sortProductState,
                    },
                  },
                })
                .then(res => {
                  console.info("data ozan", res)
                  const categoryProducts = res.data.products
                  dispatch(filterByPriceAdd({ categoryProducts, tempValue }))
                })
            }
          } else if (sortProductState === "null") {
            if (item / minPriceInterval != 5) {
              let greaterThan =
                item / minPriceInterval === 1
                  ? parseFloat(0)
                  : parseFloat((item / minPriceInterval - 1) * minPriceInterval)
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    input: {
                      Categories: { slug: `${catSlug}` },
                      Price_gt: `${greaterThan}`,
                      Price_lte: `${item}`,
                      Fit_in: fitArray.length > 0 ? fitArray : undefined,
                      Style_in:
                        styledArray.length > 0 ? styledArray : undefined,
                      SeasonType_in:
                        seasonArray.length > 0 ? seasonArray : undefined,
                    },
                    sortType:
                      sortProductState === "null"
                        ? undefined
                        : sortProductState,
                  },
                })
                .then(res => {
                  console.info("data ozan", res)
                  const categoryProducts = res.data.products
                  dispatch(filterByPrice(categoryProducts))
                })
            } else {
              let greaterThan = parseFloat(item - minPriceInterval)
              client
                .query({
                  query: SORT_FILTER_QUERY,
                  variables: {
                    input: {
                      Categories: { slug: `${catSlug}` },
                      Price_gt: `${greaterThan}`,
                      Fit_in: fitArray.length > 0 ? fitArray : undefined,
                      Style_in:
                        styledArray.length > 0 ? styledArray : undefined,
                      SeasonType_in:
                        seasonArray.length > 0 ? seasonArray : undefined,
                    },
                    sortType:
                      sortProductState === "null"
                        ? undefined
                        : sortProductState,
                  },
                })
                .then(res => {
                  console.info("data ozan", res)
                  const categoryProducts = res.data.products
                  dispatch(filterByPrice(categoryProducts))
                })
            }
          }
        }
      })
    } else if (tempArray.length === 0) {
      client
        .query({
          query: SORT_FILTER_QUERY,
          variables: {
            input: {
              Categories: { slug: `${catSlug}` },
              Fit_in: fitArray.length > 0 ? fitArray : undefined,
              Style_in: styledArray.length > 0 ? styledArray : undefined,
              SeasonType_in: seasonArray.length > 0 ? seasonArray : undefined,
            },
            sortType:
              sortProductState === "null" ? undefined : sortProductState,
          },
        })

        .then(res => {
          console.info("data ozan", res)
          const categoryProducts = res.data.products

          dispatch(sortCategorieProducts(categoryProducts))
        })
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
    sortProductState,
  ])
  // function Greeting(props) {
  //   const isLoggedIn = props.isLoggedIn;
  //   if (isLoggedIn) {
  //     return <UserGreeting />;
  //   }
  //   return <GuestGreeting />;
  // }

  // ReactDOM.render(
  //   // Try changing to isLoggedIn={true}:
  //   <Greeting isLoggedIn={false} />,
  //   document.getElementById('root')
  // );
  return (
    <React.Fragment>
      <section className={catProductsStyle.catWraper}>
        {categoryProductsState && categoryProductsState.length > 0 ? (
          categoryProductsState.map(item => {
            return (
              <article>
                <Link to={`${item.slug}`}>
                  <span id={catProductsStyle.best}>BEST</span>
                  {item.Variations[0].ProductVariationsPics[0].ProductPicture
                    .childImageSharp != null ? (
                    <img
                      src={
                        item.Variations[0].ProductVariationsPics[0]
                          .ProductPicture.childImageSharp.fluid.src
                      }
                      alt={
                        item.Variations[0].ProductVariationsPics[0]
                          .ProductPicture.PictureCaption
                      }
                    />
                  ) : (
                    <img
                      src={
                        item.Variations[0].ProductVariationsPics[0]
                          .ProductPicture.formats.large.url
                      }
                      alt={
                        item.Variations[0].ProductVariationsPics[0]
                          .ProductPicture.PictureCaption
                      }
                    />
                  )}
                </Link>
                <div className={catProductsStyle.productInfo}>
                  <h4>{item.ProductName}</h4>
                  <p>CA${item.Price.toFixed(2)}</p>
                </div>
              </article>
            )
          })
        ) : (
          <h1>Unfortunetely, there is no products in this category.</h1>
        )}
      </section>
      {categoryProductsState.length > 6 && (
        <Pagination
          productPerPage={productPerPageState}
          totalProducts={categoryProductsState.length}
          paginate={paginate}
          currentPage={currentPageState}
        />
      )}
    </React.Fragment>
  )
}

export default CategoryProducts
