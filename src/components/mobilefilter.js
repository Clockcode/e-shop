import React, { useState, useEffect } from "react"

import Modal from "react-modal"
import gql from "graphql-tag"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import {
  handlePriceFilter,
  checkedPriceFilters,
  uncheckedPriceFilters,
  setLastRemovedFilter,
  uncheckedFitFilters,
  uncheckedStyledFilters,
  uncheckedseasonTypeFilters,
} from "../state/actions/filterActions"

import OtherFilters from "./otherfilters"

import filterStyle from "./styles/filter.module.scss"

const customStyles = {
  content: {
    // top: "10vh",
    // margin: "0 auto",
    position: "absolute",
    margin: "0",
    height: "500px", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
    padding: "1.6rem",
    // margin: ".5rem 0",
    width: "25rem",
    // height: "100vh",
    // maxHeight: "calc(100vh - 210px)",
    maxHeight: "85vh",
    overflowY: "auto",
    /* top: 10vh, */
    // margin: 0 auto,
    left: "0",
    /* right: 50%, */
    // bottom: 40px,
    // border: 1px solid rgb(204, 204, 204),
    // background: rgb(255, 255, 255),
    // overflow: auto,
    // border-radius: 4px,
    // outline: none,
    // padding: 1.6rem,
    // /* margin: 0px,
  },
}

const FILTER_BY_PRICE = gql`
  query filterProductsByPrice(
    $catSlugG: String
    $valueG: [SortOrderEnum]
    $greaterThan: Float
    $lessThan: Float
  ) {
    allContentfulProduct(
      filter: {
        price: { gt: $greaterThan, lte: $lessThan }
        categories: { elemMatch: { slug: { eq: $catSlugG } } }
      }
      sort: { fields: price, order: $valueG }
    ) {
      edges {
        node {
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
          quantity
          sku
        }
      }
      totalCount
    }
  }
`

const MobileFilter = ({ catSlug, products }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const dispatch = useDispatch()

  const checkedPriceFiltersState = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )

  const minPriceInterval = useSelector(
    state => state.filterReducer.minPriceInterval,
    shallowEqual
  )

  const sortProductState = useSelector(
    state => state.categoryReducer.sortProductState,
    shallowEqual
  )
  const navCategoryState = useSelector(
    state => state.categoryReducer.navCategory,
    shallowEqual
  )
  const openModal = () => {
    setIsOpen(true)
  }
  const toggleModal = () => {
    modalIsOpen ? setIsOpen(false) : setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const handlePriceFilterClicked = e => {
    filterProductsPrice(e)
  }

  const filterProductsPrice = e => {
    let chekboxValue = e.target.value
    let tempArray = checkedPriceFiltersState
    let remove = false
    if (tempArray.length > 0) {
      remove = tempArray.some(item => item.value === chekboxValue)
    }
    if (remove) {
      dispatch(setLastRemovedFilter(chekboxValue))
    }

    dispatch(checkedPriceFilters({ value: chekboxValue }))
  }

  const renderDynamicPriceFilter = (interval, rowNumber) => {
    return (
      <div>
        <h2>Price</h2>
        {Array(5)
          .fill(0, 0, 5)
          .map((item, index) => {
            if (index !== 4) {
              return (
                <div style={{ display: "flex" }}>
                  <span
                    id={index}
                    className={
                      checkedPriceFiltersState.some(
                        item => parseInt(item.value) === (index + 1) * interval
                      )
                        ? "active"
                        : "not-active"
                    }
                  ></span>
                  <input
                    onChange={e => {
                      handlePriceFilterClicked(e)
                    }}
                    index={index}
                    className={filterStyle.inputself}
                    type="checkbox"
                    name="Price Filter"
                    value={(index + 1) * interval}
                  />
                  <label className={filterStyle.labelself} for="Price Filter">
                    {index * interval}$ - ${(index + 1) * interval}
                  </label>
                </div>
              )
            } else if (index === 4) {
              return (
                <div style={{ display: "flex" }}>
                  <span
                    id={index}
                    className={
                      checkedPriceFiltersState.some(
                        item => parseInt(item.value) === (index + 1) * interval
                      )
                        ? "active"
                        : "not-active"
                    }
                  ></span>
                  <input
                    onChange={e => {
                      handlePriceFilterClicked(e)
                    }}
                    className={filterStyle.inputself}
                    type="checkbox"
                    name="Price Filter"
                    value={(index + 1) * interval}
                  />
                  <label className={filterStyle.labelself} for="Price Filter">
                    {index * interval}$ - Above
                  </label>
                </div>
              )
            }
          })}
      </div>
    )
  }

  // Creatinf Filters Dynamically
  const renderFilters = () => {}

  useEffect(() => {
    dispatch(uncheckedPriceFilters())
    dispatch(uncheckedFitFilters())
    dispatch(uncheckedStyledFilters())
    dispatch(uncheckedseasonTypeFilters())
  }, [navCategoryState, sortProductState])

  return (
    <React.Fragment>
      <div onClick={toggleModal} className={filterStyle.filterWrap}>
        FILTER
      </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Filter Modal"
        closeTimeoutMS={200}
        // shouldCloseOnOverlayClick={true}
      >
        <div
          onClick={() => {
            closeModal()
          }}
          className={filterStyle.closeIcon}
        >
          &times;
        </div>
        {modalIsOpen ? renderDynamicPriceFilter(minPriceInterval) : null}
        <OtherFilters />
      </Modal>
    </React.Fragment>
  )
}

export default MobileFilter
