import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Link } from "react-router-dom";

let sectionCheckBox = [];
let mathsCheckBox = [];
let englishCheckBox = [];
let computerCheckBox = [];

class Show extends Component {
  state = {
    sectionData: ["A", "B", "C", "D"],
    marksData: ["Poor", "Average", "Good", "Excellent"]
  };

  // WARNING! To be deprecated in React v17. Use componentDidMount instead.
  async componentWillMount() {
    let { section, maths, english, computer, sort, page } = queryString.parse(
      this.props.location.search
    );
    let params = "";
    page = page ? page : 1;
    params = this.addToParams(params, "section", section);
    params = this.addToParams(params, "maths", maths);
    params = this.addToParams(params, "english", english);
    params = this.addToParams(params, "computer", computer);
    params = this.addToParams(params, "sort", sort);
    params = this.addToParams(params, "page", page);
    let apiEndPoint = "http://localhost:2410/allStudent";
    if (params) apiEndPoint += params;
    let { data: allStudent } = await axios.get(apiEndPoint);
    this.setState({ allStudent: allStudent });
  }

  async componentDidUpdate(prevProps, prevState) {
    let currProps = this.props;
    let { section, maths, english, computer, sort, page } = queryString.parse(
      this.props.location.search
    );
    let params = "";
    page = page ? page : 1;
    params = this.addToParams(params, "section", section);
    params = this.addToParams(params, "maths", maths);
    params = this.addToParams(params, "english", english);
    params = this.addToParams(params, "computer", computer);
    params = this.addToParams(params, "sort", sort);
    params = this.addToParams(params, "page", page);
    let apiEndPoint = "http://localhost:2410/allStudent";
    if (params) apiEndPoint += params;
    if (currProps !== prevProps) {
      let { data: allStudent } = await axios.get(apiEndPoint);
      this.setState({ allStudent: allStudent });
    }
  }

  handleSort = val => {
    let { page, section, maths, english, computer, sort } = queryString.parse(
      this.props.location.search
    );
    sort = val;
    page = 1;
    this.callUrl("", section, maths, english, computer, sort, page);
  };

  handleDelete = async name => {
    let apiEndPoint = "http://localhost:2410/student/" + name;
    const { data: delData } = await axios.delete(apiEndPoint);
    alert(delData.status);
    window.location = "/allStudent";
  };

  makeCbStructure(Data, sel) {
    let temp = Data.map(n1 => ({
      name: n1,
      isSelected: false
    }));
    let cbData = sel.split(",");
    for (let i = 0; i < cbData.length; i++) {
      let obj = temp.find(n1 => n1.name === cbData[i]);
      if (obj) obj.isSelected = true;
    }
    return temp;
  }

  handleChange = e => {
    let { page, section, maths, english, computer, sort } = queryString.parse(
      this.props.location.search
    );
    const { currentTarget: input } = e;
    if (input.type === "checkbox") {
      if (input.id === "section") {
        let cb = sectionCheckBox.find(n1 => n1.name === input.name);
        if (cb) cb.isSelected = input.checked;
        let filteredSection = sectionCheckBox.filter(n1 => n1.isSelected);
        let arraySection = filteredSection.map(n1 => n1.name);
        let selSection = arraySection.join(",");
        section = selSection;
      }
      if (input.id === "maths") {
        let cb = mathsCheckBox.find(n1 => n1.name === input.name);
        if (cb) cb.isSelected = input.checked;
        let filteredMaths = mathsCheckBox.filter(n1 => n1.isSelected);
        let arrayMaths = filteredMaths.map(n1 => n1.name);
        let selMaths = arrayMaths.join(",");
        maths = selMaths;
      }
      if (input.id === "english") {
        let cb = englishCheckBox.find(n1 => n1.name === input.name);
        if (cb) cb.isSelected = input.checked;
        let filteredEnglish = englishCheckBox.filter(n1 => n1.isSelected);
        let arrayEnglish = filteredEnglish.map(n1 => n1.name);
        let selEnglish = arrayEnglish.join(",");
        english = selEnglish;
      }
      if (input.id === "computer") {
        let cb = computerCheckBox.find(n1 => n1.name === input.name);
        if (cb) cb.isSelected = input.checked;
        let filteredcomputer = computerCheckBox.filter(n1 => n1.isSelected);
        let arraycomputer = filteredcomputer.map(n1 => n1.name);
        let selcomputer = arraycomputer.join(",");
        computer = selcomputer;
      }
    }
    page = 1;
    this.callUrl("", section, maths, english, computer, sort, page);
  };

  addToParams(params, newParamName, newParamValue) {
    if (newParamValue) {
      params = params ? params + "&" : params + "?";
      params = params + newParamName + "=" + newParamValue;
    }
    return params;
  }
  callUrl = (params, section, maths, english, computer, sort, page) => {
    let path = "/allStudent";
    params = this.addToParams(params, "section", section);
    params = this.addToParams(params, "maths", maths);
    params = this.addToParams(params, "english", english);
    params = this.addToParams(params, "computer", computer);
    params = this.addToParams(params, "sort", sort);
    params = this.addToParams(params, "page", page);
    console.log("params", params);
    this.props.history.push({ pathname: path, search: params });
  };

  gotoPage = x => {
    let { section, maths, english, computer, sort, page } = queryString.parse(
      this.props.location.search
    );
    let currentPage = page ? +page : 1;
    currentPage = currentPage + x;
    let params = "";
    this.callUrl(params, section, maths, english, computer, sort, currentPage);
  };

  render() {
    const { sectionData, marksData, brandData, osData, priceData } = this.state;
    let { section, maths, english, computer, sort, page } = queryString.parse(
      this.props.location.search
    );

    section = section ? section : "";
    maths = maths ? maths : "";
    english = english ? english : "";
    computer = computer ? computer : "";
    sort = sort ? sort : "";
    page = page ? page : 1;
    sectionCheckBox = this.makeCbStructure(sectionData, section);
    mathsCheckBox = this.makeCbStructure(marksData, maths);
    englishCheckBox = this.makeCbStructure(marksData, english);
    computerCheckBox = this.makeCbStructure(marksData, computer);
    console.log("Ss", this.state.allStudent);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 ">
            <br />
            <form>
              <ul className="list-group">
                <li className="list-group-item text-left bg-dark text-white">
                  Section
                </li>
                {sectionCheckBox.map((item, index) => (
                  <li className="list-group-item text-left" key={index}>
                    <div className="form-check">
                      <input
                        value={item.isSelected}
                        onChange={this.handleChange}
                        id="section"
                        type="checkbox"
                        name={item.name}
                        checked={item.isSelected}
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={item.name}>
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="my-hr4" />
              <ul className="list-group">
                <li className="list-group-item text-left bg-dark text-white">
                  Maths
                </li>
                {mathsCheckBox.map((item, index) => (
                  <li className="list-group-item text-left" key={index}>
                    <div className="form-check">
                      <input
                        value={item.isSelected}
                        onChange={this.handleChange}
                        id="maths"
                        type="checkbox"
                        name={item.name}
                        checked={item.isSelected}
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={item.name}>
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="my-hr4" />
              <ul className="list-group">
                <li className="list-group-item text-left bg-dark text-white">
                  English
                </li>
                {englishCheckBox.map((item, index) => (
                  <li className="list-group-item text-left" key={index}>
                    <div className="form-check">
                      <input
                        value={item.isSelected}
                        onChange={this.handleChange}
                        id="english"
                        type="checkbox"
                        name={item.name}
                        checked={item.isSelected}
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={item.name}>
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <hr className="my-hr4" />
              <ul className="list-group">
                <li className="list-group-item text-left bg-dark text-white">
                  Computer
                </li>
                {computerCheckBox.map((item, index) => (
                  <li className="list-group-item text-left" key={index}>
                    <div className="form-check">
                      <input
                        value={item.isSelected}
                        onChange={this.handleChange}
                        id="computer"
                        type="checkbox"
                        name={item.name}
                        checked={item.isSelected}
                        className="form-check-input"
                      />
                      <label className="form-check-label" htmlFor={item.name}>
                        {item.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </form>
          </div>
          <div className="col ">
            <div className="">
              <br />
              {this.state.allStudent && (
                <div>
                  <div>
                    {this.state.allStudent.pageInfo.startIndex + 1} -{" "}
                    {this.state.allStudent.student.length === 5 ? (
                      <span>
                        {this.state.allStudent.pageInfo.pageNumber * 5}
                      </span>
                    ) : (
                      <span>{this.state.allStudent.pageInfo.totalItem}</span>
                    )}
                    {"   "}
                    of {this.state.allStudent.pageInfo.totalItem}
                  </div>
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th
                          scope="col"
                          onClick={() => this.handleSort("id")}
                          style={{ cursor: "pointer" }}
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.handleSort("name")}
                          style={{ cursor: "pointer" }}
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.handleSort("sec")}
                          style={{ cursor: "pointer" }}
                        >
                          Section
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.handleSort("maths")}
                          style={{ cursor: "pointer" }}
                        >
                          Maths
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.handleSort("eng")}
                          style={{ cursor: "pointer" }}
                        >
                          English
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.handleSort("comp")}
                          style={{ cursor: "pointer" }}
                        >
                          Computer
                        </th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.allStudent.student.map((c, i) => (
                        <tr key={i}>
                          <th scope="row">{c.id}</th>
                          <td>{c.name}</td>
                          <td>{c.section}</td>
                          <td>{c.maths}</td>
                          <td>{c.eng}</td>
                          <td>{c.comp}</td>
                          <td>
                            <Link to={`/student/${c.name}`}>
                              <i
                                className="fa fa-pencil-square-o fa-lg text-dark"
                                aria-hidden="true"
                                style={{ cursor: "pointer" }}
                              />
                            </Link>
                          </td>
                          <td>
                            <i
                              className="fa fa-trash-o fa-lg"
                              aria-hidden="true"
                              style={{ cursor: "pointer" }}
                              onClick={() => this.handleDelete(c.name)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="row">
                    <div className="col-6 text-left">
                      {+page > 1 ? (
                        <button
                          className="btn btn-secondary"
                          onClick={() => this.gotoPage(-1)}
                        >
                          Previous
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-6">
                      {+page < this.state.allStudent.pageInfo.totalPages ? (
                        <div className="text-right">
                          <button
                            className="btn btn-secondary"
                            onClick={() => this.gotoPage(1)}
                          >
                            Next
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
