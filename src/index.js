import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Nav from "./components/nav";
import Search from "./components/search";
import Download from "./components/download";

ReactDOM.render(<Nav />, document.getElementById("nav"));

ReactDOM.render(<Search />, document.getElementById("search"));
ReactDOM.render(<Download />, document.getElementById("download"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
