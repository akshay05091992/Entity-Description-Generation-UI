import React, { Component } from "react";
import ReactDOM from "react-dom";
import Gen from "./gen";
class Side extends Component {
  constructor() {
    super();
      this.state = {
      data: "DBPEDIA",
      messagenew: null,
      messageold: null,
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.getElementById("download").disabled = true;
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + "-" + month + "-" + year + " " + hours + "_" + min + "_" + sec
    });
  }

  handleChange(event) {
    this.setState({
      data: event.target.value
    });
  }

  handleSubmit(event) {
    if (document.getElementById("output1") == null) {
      event.preventDefault();
      ReactDOM.render(
        <Gen
          //classname={this.props.classname}
          sname={this.props.sname}
          data={this.state.data}
          download={this.download}
        />,
        document.getElementById("gen")
      );
      document.getElementById("download").disabled = false;
      document.getElementById("generate").innerHTML = "Again ?";
    } else {
      this.forceUpdate();
    }
  }

  //for downloading the text file
  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("output1").innerHTML], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download =
      this.props.sname + " " + this.state.data + " " + this.state.date + ".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeAttribute(element);
  };

  render() {
    return (
      <React.Fragment>
        <div class="container">
          <form onSubmit={this.handleSubmit}>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  value="DBPEDIA"
                  class="form-check-input"
                  checked={this.state.data === "DBPEDIA"}
                  onChange={this.handleChange}
                />
                DBPEDIA
              </label>
            </div>
            {/* Code for 2nd Phase
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  value="WIKIDATA"
                  class="form-check-input"
                  checked={this.state.data === "WIKIDATA"}
                  onChange={this.handleChange}
                  disabled
                />
                WIKIDATA
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  value="BOTH"
                  class="form-check-input"
                  checked={this.state.data === "BOTH"}
                  onChange={this.handleChange}
                 disabled
                />
                BOTH
              </label>
            </div> */}
            <button type="submit" id="generate" class="btn btn-primary">
              Generate
            </button>
            <button
              id="download"
              class="btn btn-primary"
              onClick={this.downloadTxtFile}
            >
              Download
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Side;
