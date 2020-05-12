import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import mainpageStyle from "./styles/mainpage.module.scss"

const MailSignup = ({ description }) => {
  return (
    <section className={mainpageStyle.mainsignin}>
      <h3 className={mainpageStyle.maindesc}>Be in the know first</h3>
      <h4>{description}</h4>
      <form className={mainpageStyle.mainForm}>
        <span className={mainpageStyle.option}>
          <input type="checkbox" id="male" name="gender" value="male" />
          <label for="male">Male</label>
        </span>
        <span className={mainpageStyle.option}>
          <input type="checkbox" id="female" name="gender" value="female" />
          <label for="female">Female</label>
        </span>
        <span className={mainpageStyle.email}>
          <input
            placeholder="Type your email for sign up."
            type="text"
            name="name"
          />
          <span className={mainpageStyle.subscribe}>Subscribe</span>
        </span>
      </form>
    </section>
  )
}

export default MailSignup
