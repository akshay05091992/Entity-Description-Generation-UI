import React from "react";
import ReactDOM from "react-dom";
import Gen from "./gen";
import Axios from "axios";
import { Dropdown, DropdownItem } from "reactstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sname: null,
      name: "",
      autocompleteResults: [],
      show: false,
      date: "",
      data: "DBPEDIA",
      dbpedia: true,
      wikidata: false,
      messagenew: null,
      messageold: null,
      messagewiki: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDbpedia = this.handleDbpedia.bind(this);
    this.handleWikidata = this.handleWikidata.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }
  handleChange2 = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  componentDidMount() {
    document.getElementById("download").addEventListener(
      "click",
      function (event) {
        const element = document.createElement("a");
        const file = new Blob([document.getElementById("output1").innerHTML], {
          type: "text/plain",
        });
        element.href = URL.createObjectURL(file);
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var date1 =
          date + "-" + month + "-" + year + " " + hours + "_" + min + "_" + sec;
        element.download =
          document.getElementById("searchInput").value +
          " " +
          "DBpedia" +
          " " +
          date1 +
          ".txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeAttribute(element);
      },
      false
    );

    document.getElementById("generate").addEventListener(
      "click",
      // function toTitleCase(str) {
      //   return str.replace(/\w\S*/g, function (txt) {
      //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      //   });
      // },
      function (event) {
        if (document.getElementById("output1") == null) {
          event.preventDefault();
          var dborwiki = "";
          if(document.getElementById("dbpedia").checked && document.getElementById("wikidata").checked){
            dborwiki = "both";
          }else if(document.getElementById("dbpedia").checked){
            dborwiki = "dbpedia";
          }else if(document.getElementById("wikidata").checked){
            dborwiki = "wikidata"
          }else{
            alert("Select wikidata or dbpedia");
            return ;
          }
          let userInput1 = document
          .getElementById("searchInput")
          .value.toLowerCase()
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ")
          .replace(/ /g, "_");

          document.getElementById("searchInput").disabled = true;
          document.getElementById("generate").className =
          "glyphicon glyphicon-repeat";
          console.log(document.getElementById("dbpedia").checked);
          ReactDOM.render(
            <Gen userInput={userInput1} value={dborwiki}/>,
            document.getElementById("gen")
          );
          document.getElementById("download").disabled = false;
          //document.getElementById("searchInput").style = "display:none";
          document.getElementById("formLabel").style = "display:none";
          document.getElementById("formLabelDb").style = "display:none";
          document.getElementById("dbpedia").style = "display:none";
          document.getElementById("wikidata").style = "display:none";
        } else {
          window.location.reload();
        }
      },
      false
    );
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value,
    });
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

    Axios({
      method: "get",
      url:
        "http://lookup.dbpedia.org/api/search.asmx/KeywordSearch?&QueryString=" +
        //"http://cors-anywhere.herokuapp.com/akswnc7.informatik.uni-leipzig.de/lookup/api/search?query=" +
        event.target.value +
        "&maxHits=5",
      //   "&maxResults=5&format=json",
      responseType: "json",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      console.log(response.data);
      this.setState({
        autocompleteResults: [],
      });
      // console.log(response.log);

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
  handleChange2(event) {
    this.setState({
      data: event.target.value,
    });
  }
  handleDbpedia(event){
    console.log(this)
    console.log(event)
    if(this.state.dbpedia){
        this.setState({
          dbpedia : false
         });
    }else {
        this.setState({
          dbpedia : true
         });
    }
  }

  handleWikidata(event){
    if(this.state.wikidata){
        this.setState({
          wikidata : false
         });
    }else {
        this.setState({
          wikidata : true
         });
    }
  }

  render() {
    return (
      <React.Fragment>
        <form id="inputform" onSubmit={this.handleSubmit}>
          <input
            type="text"
            class="form-control"
            placeholder="Type your search here"
            id="searchInput"
            name="userInput"
            onChange={this.handleChange}
            value={this.state.userInput}
          />

          <input
            class="form-check-input"
            type="checkbox"
            id="dbpedia"
            onChange = {this.handleDbpedia}
            value="DBPEDIA"
            checked={this.state.dbpedia}
          />
          <label class="form-check-label" id="formLabelDb">
            DBPEDIA
          </label>
          <input
              type="checkbox"
              id="wikidata"
              onChange = {this.handleWikidata}
              value="WIKIDATA"
              class="form-check-input"
              checked={this.state.wikidata}
           />
          <label class="form-check-label" id="formLabel">
            WIKIDATA
          </label>
          <span class="glyphicon glyphicon-search" id="generate"></span>

          <svg
            id="download"
            class="bi bi-download"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                fill-rule="evenodd"
                d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z"
                clip-rule="evenodd"
              />
            </g>
          </svg>

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
