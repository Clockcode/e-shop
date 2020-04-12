import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

import { IS_MOBILE_CHECK, FETCHING_MENU_SUCCESS } from "../state/type"

import { useSelector, shallowEqual, useDispatch } from "react-redux"

import gql from "graphql-tag"
import { client } from "../context/ApolloClient"
import MobileNavigation from "./mobilenavigation"
import navigationStyle from "./styles/navigation.module.scss"
const TEST_QUERY = gql`
  {
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
                  tracedSVG
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

const Navigation = props => {
  const [currentScreenWidth, setCurrentScreenWidth] = React.useState(
    window.innerWidth
  )
  const dispatch = useDispatch()

  const navCategories = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  )
  const isMobileState = useSelector(
    state => state.menuReducer.isMobile,
    shallowEqual
  )
  // const [menuTitles, setMenuTitles] = useState([{ title: "", slug: "" }])

  const handleMobileOrDesktop = payload => ({
    type: IS_MOBILE_CHECK,
    payload: payload,
  })

  const fillAllMenuTitles = payload => ({
    type: FETCHING_MENU_SUCCESS,
    payload: payload,
  })

  let tempArray = []
  const fillMenu = () => {
    client
      .query({
        query: TEST_QUERY,
      })
      .then(res => {
        let categories = res.data.allContentfulNavMenu.edges[0].node.categories
        let otherPages = res.data.allContentfulNavMenu.edges[0].node.otherPages

        categories.map(item => {
          tempArray.push({
            title: item.title.title,
            slug: item.slug,
          })
        })
        otherPages.map(item => {
          tempArray.push({
            title: item.title,
            slug: item.slug,
          })
        })
        dispatch(fillAllMenuTitles([...tempArray]))
      })
  }

  useEffect(() => {
    fillMenu()
  }, [])

  let isMobile
  const mobileSize = 768

  useEffect(() => {
    if (currentScreenWidth > mobileSize) {
      isMobile = false
    } else {
      isMobile = true
    }
    dispatch(handleMobileOrDesktop({ isMobile, currentScreenWidth }))
  }, [currentScreenWidth])

  return (
    <nav id={navigationStyle.navitself} role="navigation">
      {!isMobileState ? (
        <div className={navigationStyle.innerNav}>
          <span className={navigationStyle.navItem}>
            <Link to="/">Home</Link>
          </span>
          {navCategories && navCategories.length > 0 ? (
            <React.Fragment>
              {navCategories.map(item => {
                return (
                  <span className={navigationStyle.navItem}>
                    <Link to={`/${item.slug}`}>{item.title}</Link>
                  </span>
                )
              })}
            </React.Fragment>
          ) : null}
        </div>
      ) : (
        <MobileNavigation />
      )}
    </nav>
  )
}

export default Navigation
