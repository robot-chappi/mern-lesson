import React, {useContext} from 'react'
import { NavLink, Link, Navigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import { AUTH, CREATEPAGE, LINKS, DETAILPAGE } from "../utils/consts"

export const Navbar = () => {
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    Navigate(CREATEPAGE)
  }

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Сокращение ссылок</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to={CREATEPAGE}>Создать</NavLink></li>
          <li><NavLink to={LINKS}>Ссылки</NavLink></li>
          <li><Link to="/" onClick={logoutHandler}>Выйти</Link></li>
        </ul>
      </div>
    </nav>
  )
}