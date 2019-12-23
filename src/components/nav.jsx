import React, { Component } from "react";

class Nav extends Component {
  state = {
    giturl: "https://github.com/akshay05091992/Entity-Description-Generation-UI"
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <i
              style={{ fontSize: "48px", color: "blue" }}
              className="fa fa-info-circle float-left"
            ></i>
          </div>
          <div className="col text-center">
            <h1>Welcome !</h1>
          </div>
          <div className="col">
            <a
              href={this.state.giturl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <i
                style={{ fontSize: "48px", color: "black" }}
                className="fab fa-github float-right"
              ></i>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Nav;
