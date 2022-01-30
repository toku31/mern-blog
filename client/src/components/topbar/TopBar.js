import React, { useContext } from 'react'
import './topbar.css'
// import woman1 from '../../img/woman1.jpg'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

export default function TopBar() {
  const { user, dispatch } = useContext(Context)

  const PF = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
    window.location.replace("/login")
  }

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">HOME</Link>
            {/* <Link to="/" style={{textDecoration:"none", color:"inherit" }}>HOME</Link> */}
          </li>
          <li className="topListItem"><Link to="/about" className="link">ABOUT</Link></li>
          <li className="topListItem"><Link to="/contact" className="link">CONTACT</Link></li>
          <li className="topListItem"><Link to="/write" className="link">WRITE</Link></li>
          <li className="topListItem" onClick={handleLogout}>{ user && "LOGOUT" }</li>
        </ul>
      </div>

      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              className="topImage" src={PF+user.profilePic} alt=""
              // src={woman1}
              // src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem"><Link to="/login" className="link">LOGIN</Link></li>
            <li className="topListItem"><Link to="/register" className="link">REGISTER</Link></li>
          </ul>
        )
      }
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  )
}
