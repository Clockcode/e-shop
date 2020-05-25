import {
  CHECKED_PRICE_FILTERS,
  UNCHECKED_PRICE_FILTERS,
  LAST_REMOVED_PRICE_FILTER,
  CHECKED_FIT_FILTERS,
  UNCHECKED_FIT_FILTERS,
  CHECKED_STYLE_FILTERS,
  UNCHECKED_STYLE_FILTERS,
  CHECKED_SEASON_FILTERS,
  UNCHECKED_SEASON_FILTERS,
} from "../type.js"

const initialState = {
  checkedPriceFilters: [],
  checkedFitFilters: [],
  checkedStyledFilters: [],
  checkedSeasonFilters: [],
  minPriceInterval: 50,
  lastRemovedPriceFilter: 0,
}

const filterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHECKED_PRICE_FILTERS:
      return {
        ...state,
        checkedPriceFilters: state.checkedPriceFilters.some(
          item => item === parseInt(payload)
        )
          ? state.checkedPriceFilters.filter(
              (item, index) => item !== parseInt(payload)
            )
          : [...state.checkedPriceFilters, parseInt(payload)],
      }
    case UNCHECKED_PRICE_FILTERS:
      return {
        ...state,
        checkedPriceFilters: [],
      }
    case LAST_REMOVED_PRICE_FILTER:
      return {
        ...state,
        lastRemovedPriceFilter: payload,
      }
    case CHECKED_FIT_FILTERS:
      return {
        ...state,
        checkedFitFilters: state.checkedFitFilters.some(
          item => item === payload
        )
          ? state.checkedFitFilters.filter((item, index) => item !== payload)
          : [...state.checkedFitFilters, payload],
      }
    case UNCHECKED_FIT_FILTERS:
      return {
        ...state,
        checkedFitFilters: [],
      }
    case CHECKED_STYLE_FILTERS:
      return {
        ...state,
        checkedStyledFilters: state.checkedStyledFilters.some(
          item => item === payload
        )
          ? state.checkedStyledFilters.filter((item, index) => item !== payload)
          : [...state.checkedStyledFilters, payload],
      }
    case UNCHECKED_STYLE_FILTERS:
      return {
        ...state,
        checkedStyledFilters: [],
      }

    case CHECKED_SEASON_FILTERS:
      return {
        ...state,
        checkedSeasonFilters: state.checkedSeasonFilters.some(
          item => item === payload
        )
          ? state.checkedSeasonFilters.filter((item, index) => item !== payload)
          : [...state.checkedSeasonFilters, payload],
      }
    case UNCHECKED_SEASON_FILTERS:
      return {
        ...state,
        checkedSeasonFilters: [],
      }
    default:
      return state
  }
}

export default filterReducer
