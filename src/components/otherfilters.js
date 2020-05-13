import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import {
  checkedFitFilters,
  uncheckedFitFilters,
  styledFitFilters,
  seasonTypeFilters,
} from "../state/actions/filterActions"
import filterStyle from "./styles/filter.module.scss"

import Checkbox from "@material-ui/core/Checkbox"

function Checkboxes({ value, name }) {
  const [checked, setChecked] = React.useState(true)
  const dispatch = useDispatch()

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
  const checkedPriceFiltersState = useSelector(
    state => state.filterReducer.checkedPriceFilters,
    shallowEqual
  )
  const handleFitFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(checkedFitFilters({ value: tempValue }))
  }
  const handleStyleFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(styledFitFilters({ value: tempValue }))
  }
  const handleSeasonFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(seasonTypeFilters({ value: tempValue }))
  }

  return (
    <React.Fragment>
      {name === "fit" && (
        <Checkbox
          onChange={e => {
            handleFitFilterClicked(e)
          }}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={value}
        />
      )}
      {name === "season" && (
        <Checkbox
          onChange={e => {
            handleSeasonFilterClicked(e)
          }}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={value}
        />
      )}
      {name === "style" && (
        <Checkbox
          onChange={e => {
            handleStyleFilterClicked(e)
          }}
          color="primary"
          inputProps={{ "aria-label": "secondary checkbox" }}
          value={value}
        />
      )}
      {/* <Checkbox inputProps={{ "aria-label": "uncontrolled-checkbox" }} /> */}
      {/* <Checkbox disabled inputProps={{ "aria-label": "disabled checkbox" }} /> */}
      {/* <Checkbox
        defaultChecked
        color="default"
        inputProps={{ "aria-label": "checkbox with default color" }}
      /> */}
      {/* <Checkbox
        defaultChecked
        size="small"
        inputProps={{ "aria-label": "checkbox with small size" }}
      /> */}
    </React.Fragment>
  )
}

export const OtherFilters = () => {
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

  const handleFitFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(checkedFitFilters({ value: tempValue }))
  }

  const handleStyleFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(styledFitFilters({ value: tempValue }))
  }
  const handleSeasonFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(seasonTypeFilters({ value: tempValue }))
  }

  const dispatch = useDispatch()

  const renderFitFilters = () => {
    return (
      <div>
        <h2>Fit</h2>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Slim")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="fit" value="Slim" />
          <label className={filterStyle.labelself} for="fit">
            Slim
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Oversized")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="fit" value="Oversized" />
          <label className={filterStyle.labelself} for="fit">
            Oversized
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Cropped")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="fit" value="Cropped" />
          <label className={filterStyle.labelself} for="fit">
            Cropped
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedFitFiltersState.some(item => item.value === "Regular")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="fit" value="Regular" />
          <label className={filterStyle.labelself} for="fit">
            Regular
          </label>
        </div>
      </div>
    )
  }

  const renderStyleFilters = () => {
    return (
      <div>
        <h2>Style</h2>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Jacket")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="style" value="Jacket" />
          <label className={filterStyle.labelself} for="style">
            Jacket
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Biker")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="style" value="Biker" />
          <label className={filterStyle.labelself} for="style">
            Biker
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Blazer")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="style" value="Blazer" />
          <label className={filterStyle.labelself} for="style">
            Blazer
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Coat")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="style" value="Coat" />
          <label className={filterStyle.labelself} for="style">
            Coat
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedStyledFiltersState.some(item => item.value === "Mac")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="style" value="Mac" />
          <label className={filterStyle.labelself} for="style">
            Mac
          </label>
        </div>
      </div>
    )
  }

  const renderSeasonTypeFilters = () => {
    return (
      <div>
        <h2>Season</h2>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(
                item => item.value === "New Season"
              )
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="season" value="New Season" />
          <label className={filterStyle.labelself} for="season">
            New Season
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(item => item.value === "Regular")
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="season" value="Regular" />
          <label className={filterStyle.labelself} for="season">
            Regular
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(
                item => item.value === "Best Seller"
              )
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="season" value="Best Seller" />
          <label className={filterStyle.labelself} for="season">
            Best Seller
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <span
            className={
              checkedSeasonFiltersState.some(
                item => item.value === "Discounted"
              )
                ? "active"
                : "not-active"
            }
          ></span>
          <Checkboxes name="season" value="Discounted" />
          <label className={filterStyle.labelself} for="season">
            Discounted
          </label>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {renderFitFilters()}
      {renderStyleFilters()}
      {renderSeasonTypeFilters()}
    </div>
  )
}

export default OtherFilters
