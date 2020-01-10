import React, { Component } from "react";
import ReactDOM from "react-dom";
import Gen from "./gen";
class Side extends Component {
  constructor() {
    super();

    this.state = {
      data: "DBPEDIA"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      data: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    ReactDOM.render(
      <Gen
        classname={this.props.classname}
        sname={this.props.sname}
        data={this.state.data}
      />,
      document.getElementById("gen")
    );
  }

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
            </div>
            <button type="submit" class="btn btn-primary">
              Generate
            </button>
            <button type="submit" class="btn btn-primary">
              Download
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Side;
