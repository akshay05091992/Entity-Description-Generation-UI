import React, { Component } from "react";
class Side extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="container">
          <form action="/action_page.php">
            <div class="form-check">
              <label class="form-check-label" for="radio1">
                <input
                  type="radio"
                  class="form-check-input"
                  id="radio1"
                  name="optradio"
                  value="option1"
                  checked
                />
                WIKIDATA
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label" for="radio2">
                <input
                  type="radio"
                  class="form-check-input"
                  id="radio2"
                  name="optradio"
                  value="option2"
                />
                DBPEDIA
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input type="radio" class="form-check-input" disabled />
                BOTH
              </label>
            </div>
            <button type="submit" class="btn btn-primary">
              Generate
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Side;
