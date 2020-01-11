import React, { Component } from "react";
import ReactDOM from "react-dom";
import Side from "./side";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // classname: null,
      sname: null
    };
  }
  myChangeHandler = event => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

 
  render() {
    ReactDOM.render(
      // classname={this.state.classname}
      <Side sname={this.state.sname} />,
      document.getElementById("side")
    );
    return (
      <React.Fragment>
        <form id="inputform">
          {/* <input
            type="text"
            placeholder="Class"
            id="classInput"
            name="classname"
            onChange={this.myChangeHandler}
          />{" "}
          &nbsp; */}
          <input
            type="text"
            class="form-control"
            placeholder="Type your search here"
            id="searchInput"
            name="sname"
            onChange={this.myChangeHandler}
          />
         
        </form>
      </React.Fragment>
    );
  }
}
export default Search;
