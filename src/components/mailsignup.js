import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const MailSignup = ({ description }) => {
  return (
    <section className={mainpageStyle.mainsignin}>
      <h3 className={mainpageStyle.maindesc}>Be in the know first</h3>
      <h4>{description}</h4>
      <div className={mainpageStyle.mainForm}>
        <div className={mainpageStyle.formWrapper}>

          <input
            placeholder="Type your email for sign up."
            type="text"
            name="name"
          /> <span className={mainpageStyle.subscribe}>Subscribe</span>
        </div>
        <div className={mainpageStyle.options}>
          <h4 className={mainpageStyle.option}>Men</h4>
          <h4 className={mainpageStyle.option}>Women</h4>
        </div>
      </div>
    </section>
  )
}

export default MailSignup
