import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

import Modal from "react-modal"

import navigationStyle from "./styles/navigation.module.scss"
import filterStyle from "./styles/filter.module.scss"
import signinStyle from "./styles/signin.module.scss"

import user from "../images/user.svg"

const customStyles = {
  content: {
    // top: "10vh",
    // margin: "0 auto",
    position: "absolute",
    margin: "0",
    height: "100vh", // <-- This sets the height
    overlfow: "scroll", // <-- This tells the modal to scrol
    padding: "1.6rem",
    // margin: ".5rem 0",
    width: "100vw",
    // height: "100vh",
    // maxHeight: "calc(100vh - 210px)",
    maxHeight: "100vh",
    overflowY: "auto",
    /* top: 10vh, */
    // margin: 0 auto,
    left: "0",
    /* right: 50%, */
    // bottom: 40px,
    // border: 1px solid rgb(204, 204, 204),
    // background: rgb(255, 255, 255),
    // overflow: auto,
    // border-radius: 4px,
    // outline: none,
    // padding: 1.6rem,
    // /* margin: 0px,
  },
}

const Signin = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const isMobileState = useSelector(
    state => state.menuReducer.isMobile,
    shallowEqual
  )

  const openModal = () => {
    setIsOpen(true)
  }
  const toggleModal = () => {
    modalIsOpen ? setIsOpen(false) : setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <span onClick={toggleModal} className={navigationStyle.navItem}>
        {isMobileState ? null : (
          <a className={navigationStyle.right}>Sign in</a>
        )}
        <img src={user}></img>
      </span>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Signin Modal"
        closeTimeoutMS={200}
        // shouldCloseOnOverlayClick={true}
      >
        <div
          onClick={() => {
            closeModal()
          }}
          className={filterStyle.closeIcon}
        >
          &times;
        </div>
        <form
          className={signinStyle.formself}
          method="POST"
          data-netlify="true"
          action="./"
        >
          <label>
            Email
            <input type="email" name="email" id="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" id="password" />
          </label>
          <button type="submit">Login</button>
        </form>
        <br />
        <h2>Not Member yet?</h2>
        <p>Register now.</p>
        <form
          className={signinStyle.formself}
          method="POST"
          data-netlify="true"
          action="./"
        >
          <label>
            Email
            <input type="email" name="email" id="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" id="password" />
          </label>
          <label>
            Confirm Password
            <input type="password" name="password" id="password" />
          </label>
          <button type="submit">Login</button>
        </form>
      </Modal>
    </div>
  )
}

export default Signin
