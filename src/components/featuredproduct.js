import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const FeaturedProduct = ({ featuredProducts }) => {
  return (
    <React.Fragment>
      <section className={mainpageStyle.products}>
        <div className={mainpageStyle.productsWrapper}>
          {featuredProducts && featuredProducts.length > 0
            ? featuredProducts.map(item => {
              let imageUrl = `${item.Variations[0].ProductImages[0].formats.medium.url}`
              return (
                <a className={mainpageStyle.productWrapper}>
                  <img src={imageUrl} alt="product image" />
                  <h3 className={mainpageStyle.productName}>
                    {item.ProductName}
                  </h3>
                  <p>CA$ {item.Variations[0].Price}</p>
                  {item.Variations[0].DiscountedPrice && <p className={mainpageStyle.discounted}>CA$ {item.Variations[0].DiscountedPrice}</p>}
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
