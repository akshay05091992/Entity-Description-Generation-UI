import React, { Component } from "react";

class Nav extends Component {
  state = {
    giturl: "https://github.com/akshay05091992/Entity-Description-Generation-UI"
  };
  render() {
    return (
      <React.Fragment>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">LD2NL</a>
            </div>
            <ul class="nav navbar-nav">
              <li><a href="#"><i
              style={{ fontSize: "24px", color: "blue" }}
              className="fa fa-info-circle float-left"
            ></i></a></li>
              <li><a href="#"><i
                style={{ fontSize: "25px", color: "black" }}
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
