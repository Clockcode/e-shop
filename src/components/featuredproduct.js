import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const FeaturedProduct = ({ featuredProducts }) => {
  return (
    <React.Fragment>
      <section className={mainpageStyle.products}>
        <div className={mainpageStyle.productsWrapper}>
          {featuredProducts && featuredProducts.length > 0
            ? featuredProducts.map(item => {
                return (
                  <a className={mainpageStyle.productWrapper}>
                    <img
                      src={item.image.childImageSharp.fluid.src}
                      alt="product image"
                    />
                    <h3 className={mainpageStyle.productName}>
                      {item.ProductName}
                    </h3>
                    <p>CA$ {item.Price}</p>
                    {item.DiscountedPrice && (
                      <p className={mainpageStyle.discounted}>
                        CA$ {item.DiscountedPrice}
                      </p>
                    )}
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
