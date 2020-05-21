/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class Nav extends Component {
  state = {
    giturl: "https://github.com/akshay05091992/Entity-Description-Generation-UI"
  };
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="https://github.com/akshay05091992/Entity-Description-Generation-UI" target="_blank" rel="noopener noreferrer"><i style={{ fontSize: "24px", color: "blue" }}>Entity-Description-Generation</i></a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="#"><i
              style={{ fontSize: "24px", color: "blue", marginBottom: "9px", marginLeft: "-25px" }}
              className="fa fa-info-circle float-left"
            ></i></a></li>
              <li><a href="https://github.com/aakash2000/LD2NL_EXTENSION" target="_blank" rel="noopener noreferrer"><i
                style={{ fontSize: "25px", color: "black", marginBottom: "11px", marginLeft: "-25px"  }}
                className="fab fa-github float-right"
              ></i></a></li>
            </ul>
             </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Nav;
