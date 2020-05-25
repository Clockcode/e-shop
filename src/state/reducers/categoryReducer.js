import {
  CATEGORY_FETCHING,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  FIRST_PAGE,
  LAST_PAGE,
  SET_SORT_STATE,
  SORT_PRODUCTS,
  FILTER_PRODUCTS_BYPRICE,
  PRICE_FILTER_ADD_PRODUCT,
  PRICE_FILTER_REMOVE_PRODUCT,
  SORT_PRODUCTS_BY_PRICE,
} from "../type.js"

const initialState = {
  navCategory: "",
  categoryProducts: [],
  numberOfItems: 0,
  loading: true,
  currentPage: 1,
  productPerPage: 6,
  sortProductState: "null",
}

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_FETCHING:
      return {
        ...state,
        navCategory: payload.navCategory,
        loading: payload.loading,
        currentPage: payload.currentPage,
        categoryProducts: payload.categoryProds,
      }
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: payload,
      }
    case NEXT_PAGE:
      return {
        ...state,
        currentPage:
          state.currentPage > state.numberOfItems / state.productPerPage
            ? 1
            : state.currentPage + 1,
      }
    case PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      }
    case FIRST_PAGE:
      return {
        ...state,
        currentPage: 1,
      }
    case LAST_PAGE:
      return {
        ...state,
        currentPage: Math.ceil(
          state.categoryProducts.length / state.productPerPage
        ),
      }
    case SET_SORT_STATE:
      return {
        ...state,
        sortProductState: payload,
      }
    case SORT_PRODUCTS:
      return {
        ...state,
        categoryProducts: payload,
      }
    case FILTER_PRODUCTS_BYPRICE:
      return {
        ...state,
        categoryProducts: [...state.categoryProducts, ...payload],
      }
    case PRICE_FILTER_ADD_PRODUCT:
      let tempArr = []
      let tempCats = state.categoryProducts
      tempCats.map(item => {
        tempArr.push(item.Price)
      })

      let maxValue = Math.max(...tempArr)

      let checkAgainTemp = parseFloat(maxValue) > parseFloat(payload.tempValue)

      if (state.sortProductState === "Price:asc") {
        return {
          ...state,
          categoryProducts: checkAgainTemp
            ? [...payload.categoryProducts, ...state.categoryProducts]
            : [...state.categoryProducts, ...payload.categoryProducts],
        }
      } else if (state.sortProductState === "Price:desc") {
        return {
          ...state,
          categoryProducts: checkAgainTemp
            ? [...state.categoryProducts, ...payload.categoryProducts]
            : [...payload.categoryProducts, ...state.categoryProducts],
        }
      }
    case PRICE_FILTER_REMOVE_PRODUCT:
      let tempArray = state.categoryProducts.filter(
        item => !payload.categoryProducts.includes(item)
      )
      return {
        ...state,
        categoryProducts: tempArray,
      }
    case SORT_PRODUCTS_BY_PRICE:
      let checkFirst = state.categoryProducts.some(
        item => item.node.price > payload.tempValue1
      )
      if (state.sortProductState === "Price:asc") {
        return {
          ...state,
          categoryProducts: checkFirst
            ? [...payload.categoryProducts, ...state.categoryProducts]
            : [...state.categoryProducts, ...payload.categoryProducts],
        }
      } else if (state.sortProductState === "Price:desc") {
        return {
          ...state,
          categoryProducts: checkFirst
            ? [...state.categoryProducts, ...payload.categoryProducts]
            : [...payload.categoryProducts, ...state.categoryProducts],
        }
      }

    default:
      return state
  }
}

export default categoryReducer
