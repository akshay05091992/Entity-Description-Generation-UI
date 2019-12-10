import React, { Component } from "react";
class Search extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <p>
          <i>
            {" "}
            <input type="text" className="input" placeholder="Class" />
          </i>
          <i>
            <input type="text" className="input" placeholder="Search..." />{" "}
          </i>
        </p>
      </React.Fragment>
    );
  }
}

export default Search;
