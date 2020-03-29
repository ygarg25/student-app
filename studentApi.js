var express = require("express");
var app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

const port = 2410;
app.listen(port, () => console.log("listening on port ", port));

let student = require("./studentData.js").student;
console.log(student);
app.get("/allStudent", function(req, res) {
  let section = req.query.section;
  let maths = req.query.maths;
  let english = req.query.english;
  let computer = req.query.computer;
  let sort = req.query.sort;
  let page = req.query.page;
  let outarr = student;
  console.log(
    "in get request for all mobile ",
    section,
    maths,
    english,
    computer,
    sort,
    page
  );
  if (section) {
    let sectionArray = section.split(",");
    outarr = outarr.filter(d => sectionArray.find(c => c === d.section));
  }
  if (maths) {
    let mathsArray = maths.split(",");
    let outarrfinal = [];
    for (let i = 0; i < mathsArray.length; i++) {
      if (mathsArray[i] === "Poor") {
        outarrfinal = outarrfinal.concat(outarr.filter(m => m.maths < 40));
      }

      if (mathsArray[i] === "Average") {
        outarrfinal = outarrfinal.concat(
          outarr.filter(m => m.maths >= 40 && m.maths < 60)
        );
      }

      if (mathsArray[i] === "Good") {
        outarrfinal = outarrfinal.concat(
          outarr.filter(m => m.maths >= 60 && m.maths < 80)
        );
      }

      if (mathsArray[i] === "Excellent") {
        outarrfinal = outarrfinal.concat(outarr.filter(m => m.maths >= 80));
      }
    }

    outarr = outarrfinal;
  }

  if (english) {
    let englishArray = english.split(",");
    let outarrfinal = [];
    for (let i = 0; i < englishArray.length; i++) {
      if (englishArray[i] === "Poor") {
        outarrfinal = outarrfinal.concat(outarr.filter(m => m.eng < 40));
      }

      if (englishArray[i] === "Average") {
        outarrfinal = outarrfinal.concat(
          outarr.filter(m => m.eng >= 40 && m.eng < 60)
        );
      }

      if (englishArray[i] === "Good") {
        outarrfinal = outarrfinal.concat(
          outarr.filter(m => m.eng >= 60 && m.eng < 80)
        );
      }

      if (englishArray[i] === "Excellent") {
        outarrfinal = outarrfinal.concat(outarr.filter(m => m.eng >= 80));
      }
    }

    outarr = outarrfinal;
  }

  if (computer) {
    let computerArray = computer.split(",");
    let outarrfinal = [];
    for (let i = 0; i < computerArray.length; i++) {
      if (computerArray[i] === "Poor") {
        outarrfinal = outarrfinal.concat(outarr.filter(m => m.comp < 40));
      }

      if (computerArray[i] === "Average") {
        outarrfinal = outarrfinal.concat(
          outarr.filter(m => m.comp >= 40 && m.comp < 60)
        );
      }

      if (computerArray[i] === "Good") {
        outarrfinal = outarrfinal.concat(
          outarr.filter(m => m.comp >= 60 && m.comp < 80)
        );
      }

      if (computerArray[i] === "Excellent") {
        outarrfinal = outarrfinal.concat(outarr.filter(m => m.comp >= 80));
      }
    }

    outarr = outarrfinal;
  }

  if (sort === "id") outarr = outarr.sort((a, b) => a.id.localeCompare(b.id));
  if (sort === "name")
    outarr = outarr.sort((a, b) => a.name.localeCompare(b.name));

  if (sort === "sec")
    outarr = outarr.sort((a, b) => a.section.localeCompare(b.section));
  if (sort === "maths") outarr = outarr.sort((a, b) => a.maths - b.maths);
  if (sort === "eng") outarr = outarr.sort((a, b) => a.eng - b.eng);
  if (sort === "comp") outarr = outarr.sort((a, b) => a.comp - b.comp);
  let pageNumber = +page;
  let pageSize = 5;
  let startIndex = (pageNumber - 1) * pageSize;

  let TempArr = [...outarr];
  let studentPage = TempArr.splice(startIndex, pageSize);

  let pageInfo = {
    pageNumber: pageNumber,
    pageSize: pageSize,
    startIndex: startIndex,
    totalIteminPage: studentPage.length,
    totalItem: outarr.length,
    totalPages: Math.ceil(outarr.length / pageSize)
  };
  let obj = {};
  obj.student = studentPage;
  obj.pageInfo = pageInfo;
  console.log("obj", obj);
  res.send(obj);
});

app.delete("/student/:name", function(req, res) {
  let name = req.params.name;
  let ind = student.findIndex(d => d.name === name);
  console.log("delete student", name);
  student.splice(ind, 1);
  let delStatusSuccess = { status: "Deletion Successfull" };
  let delStatusFail = { status: "Deletion Unsuccssfull" };
  if (ind > -1) res.send(delStatusSuccess);
  else res.send(delStatusFail);
});

app.post("/newStudent", function(req, res) {
  let body = req.body;
  console.log("Post Data", body);
  let ind = student.findIndex(d => d.name === body.name);
  let postStatusFail = { status: "Name Already Exist" };
  if (ind === -1) {
    tudent.push(body);
    res.send(body);
  } else {
    res.send(postStatusFail.status);
  }
});

app.get("/student/:name", function(req, res) {
  let name = req.params.name;
  let ind = student.findIndex(d => d.name === name);
  console.log("in get request for specific student", name);
  let obj = student[ind];
  res.send(obj);
});

app.put("/student/:name", function(req, res) {
  let name = req.params.name;
  let ind = student.findIndex(d => d.name === name);
  console.log("Edit name", name);
  student[ind] = req.body;
  let editStatusFail = { status: "Edit detail Unsuccssfull" };
  if (ind > -1) res.send(req.body);
  else res.send(editStatusFail);
});
