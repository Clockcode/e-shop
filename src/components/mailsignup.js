import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const MailSignup = ({ description }) => {
  return (
    <section className={mainpageStyle.mainsignin}>
      <h3 className={mainpageStyle.maindesc}>Be in the know first</h3>
      <h4>Receive our editor’s style notes! Be the first to hear about sales, special offers ad exclusive news.</h4>
      <div className={mainpageStyle.mainForm}>
        <input
          placeholder="Type your email for sign up."
          type="text"
          name="name"
        />
        <div className={mainpageStyle.options}>
          <h4 className={mainpageStyle.option}>Men</h4>
          <h4 className={mainpageStyle.option}>Women</h4>
        </div>
      </div>
    </section>
  )
}

export default MailSignup
