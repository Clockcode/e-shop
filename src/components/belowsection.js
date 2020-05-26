import { Link } from "gatsby"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const BelowSection = ({
  firstImage,
  firstImageTitle,
  secondImage,
  secondImageTitle,
}) => {
  return (
    <section className={mainpageStyle.belowsection}>
      <div className={mainpageStyle.belowimg}>
        <img src={firstImage} alt={firstImageTitle} />
        <a className={mainpageStyle.longDescription}>
          <h3 className={mainpageStyle.title}>Women's Clothing</h3>
          <p>
            Leather pieces, romantic blouses, and just-right jeans. Here’s what
            we’re loving right now.
          </p>
        </a>
      </div>
      <div className={mainpageStyle.belowimg}>
        <img src={secondImage} alt={secondImageTitle} />
        <a className={mainpageStyle.longDescription}>
          <h3 className={mainpageStyle.title}>Men's Clothing</h3>
          <p>
            Leather pieces, romantic blouses, and just-right jeans. Here’s what
            we’re loving right now.
          </p>
        </a>
      </div>
    </section>
  )
}

export default BelowSection
