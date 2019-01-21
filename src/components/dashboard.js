import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../../styles.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden">
        <div className="sm:flex sm:items-center px-6 py-4">
          <img className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4" alt=""/>
        </div>
      </div>
    )
  }
}
