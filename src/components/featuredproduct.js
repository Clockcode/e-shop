import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const FeaturedProduct = ({ featuredProducts }) => {
  return (
    <React.Fragment>
      <section className={mainpageStyle.products}>
        <div className={mainpageStyle.productsWrapper}>
          {featuredProducts && featuredProducts.length > 0
            ? featuredProducts.map(item => {
                {
                  /* let imageUrl = `https:${item.image[0].fluid.src}` */
                }
                return (
                  <a className={mainpageStyle.productWrapper}>
                    {/* <img src={imageUrl} alt="product image" /> */}
                    <h3 className={mainpageStyle.productName}>
                      {item.productName.productName}
                    </h3>
                    <p>CA$ 134.99</p>
                  </a>
                )
              })
            : null}
        </div>
      </section>
    </React.Fragment>
  )
}

export default FeaturedProduct
