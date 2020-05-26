import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import {
  checkedFitFilters,
  styledFitFilters,
  seasonTypeFilters,
} from "../state/actions/filterActions"
import filterStyle from "./styles/filter.module.scss"

import Checkbox from "@material-ui/core/Checkbox"

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
    dispatch(checkedFitFilters(tempValue))
  }

  const handleStyleFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(styledFitFilters(tempValue))
  }
  const handleSeasonFilterClicked = e => {
    let tempValue = e.target.value
    dispatch(seasonTypeFilters(tempValue))
  }

  const dispatch = useDispatch()

  const renderFitFilters = () => {
    let checkVarFunction = element => element === "Slim"
    return (
      <div>
        <h2>Fit</h2>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="fit"
            value="Slim"
            checked={checkedFitFiltersState.some(item => item === "Slim")}
            onChange={e => {
              handleFitFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="fit">
            Slim
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="fit"
            value="Oversized"
            checked={checkedFitFiltersState.some(item => item === "Oversized")}
            onChange={e => {
              handleFitFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="fit">
            Oversized
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="fit"
            value="Cropped"
            checked={checkedFitFiltersState.some(item => item === "Cropped")}
            onChange={e => {
              handleFitFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="fit">
            Cropped
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="fit"
            value="Regular"
            checked={checkedFitFiltersState.some(item => item === "Regular")}
            onChange={e => {
              handleFitFilterClicked(e)
            }}
          />
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
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="style"
            value="Jacket"
            checked={checkedStyledFiltersState.some(item => item === "Jacket")}
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="style">
            Jacket
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="style"
            value="Biker"
            checked={checkedStyledFiltersState.some(item => item === "Biker")}
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="style">
            Biker
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="style"
            value="Blazer"
            checked={checkedStyledFiltersState.some(item => item === "Blazer")}
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="style">
            Blazer
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="style"
            value="Coat"
            checked={checkedStyledFiltersState.some(item => item === "Coat")}
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="style">
            Coat
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="style"
            value="Mac"
            checked={checkedStyledFiltersState.some(item => item === "Mac")}
            onChange={e => {
              handleStyleFilterClicked(e)
            }}
          />
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
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="season"
            value="New"
            checked={checkedSeasonFiltersState.some(item => item === "New")}
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="season">
            New Season
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="season"
            value="Regular"
            checked={checkedSeasonFiltersState.some(item => item === "Regular")}
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="season">
            Regular
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="season"
            value="BestSeller"
            checked={checkedSeasonFiltersState.some(
              item => item === "BestSeller"
            )}
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
          />
          <label className={filterStyle.labelself} for="season">
            Best Seller
          </label>
        </div>
        <div style={{ display: "flex" }}>
          <Checkbox
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            name="season"
            value="Discounted"
            checked={checkedSeasonFiltersState.some(
              item => item === "Discounted"
            )}
            onChange={e => {
              handleSeasonFilterClicked(e)
            }}
          />
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
