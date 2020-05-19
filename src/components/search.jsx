import React from "react";
import ReactDOM from "react-dom";
import Side from "./side";
import Axios from "axios";
import { Dropdown, DropdownItem, Input } from "reactstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sname: null,
      name: "",
      autocompleteResults: [],
      show: false,
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {}

  handleChange = (event) => {
    let itemname = event.target.value;
    let nam = event.target.name;
    let val = itemname;
    this.setState({ name: nam });

    this.setState({ [nam]: val });

    if (event.target.value === "") {
      document.getElementById("generate").disabled = true;
    } else {
      document.getElementById("generate").disabled = false;
    }

    console.log(event.target.name);

    Axios({
      method: "get",
      url:
        "http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?&QueryString=" +
        event.target.value +
        "&MaxHits=5",
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      console.log(response.data);
      this.setState({
        autocompleteResults: [],
      });
      response.data.results.map((result, key) => {
        // allResults = allResults.push(result)
        this.setState({
          autocompleteResults: this.state.autocompleteResults.concat(result),
        });
      });
    });
  };

  toggleDropdown = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  selectedPrefix = (event) => {
    this.setState({
      autocompleteResults: [],
      userInput: event.target.value,
    });

    //do an axios call for the searched result
    Axios({});
  };

  render() {
    console.log("WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO" + this.state.sname);
    ReactDOM.render(
      // classname={this.state.classname}
      <Side sname={this.state.sname} userInput={this.state.userInput} />, //what to render
      document.getElementById("side") //where to render
    );
    return (
      <React.Fragment>
        <form id="inputform">
          <Input
            type="text"
            className="form-control"
            placeholder="Type your search here"
            id="searchInput"
            name="userInput"
            onChange={this.handleChange}
            value={this.state.userInput}
          />
          <Dropdown className="dropdown-content" toggle={this.toggleDropdown}>
            {this.state.autocompleteResults.map((suggestions, key) => (
              <DropdownItem
                className="dropdown-item"
                value={suggestions.label}
                onClick={this.selectedPrefix}
              >
                {suggestions.label}
              </DropdownItem>
            ))}
          </Dropdown>
        </form>
      </React.Fragment>
    );
  }
}
export default Search;
