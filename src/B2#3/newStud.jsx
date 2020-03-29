import React, { Component } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

class NewStudent extends Component {
  state = {
    studentData: {
      id: "",
      name: "",
      section: "",
      maths: "",
      eng: "",
      comp: ""
    },
    errors: {},
    sectionData: ["A", "B", "C", "D"]
  };
  handleSubmit = async fields => {
    console.log("submitted : ", fields);
    let apiEndPoint = "http://localhost:2410/newStudent";
    const { data: response } = await axios.post(apiEndPoint, fields);
    alert("Status!! :-)\n\n" + JSON.stringify(response, null, 4));
    window.location = "/allStudent";
  };
  render() {
    const { studentData, sectionData } = this.state;
    console.log("Ss", this.state.errors);
    return (
      <div className="container">
        <Formik
          initialValues={{
            id: "",
            name: "",
            section: "",
            maths: "",
            eng: "",
            comp: ""
          }}
          validationSchema={Yup.object().shape({
            id: Yup.string()
              .length(4, "Id must have 4 character")
              .matches(
                /^[A-Z][A-Z][0-9][0-9]$/,
                "first two must be capital alphabet and next two schould be numerical"
              )
              .required("ID is required"),
            name: Yup.string()
              .min(6, "Name must be 6 character")
              .required("Name is Required"),
            section: Yup.string().required("Section is required"),
            maths: Yup.number()
              .moreThan(0, "Marks must be Greater than 0")
              .integer("Marks must be integer")
              .required("Maths Marks is Required"),
            eng: Yup.number()
              .moreThan(0, "Marks must be Greater than 0")
              .integer("Marks must be integer")
              .required("English Marks is Required"),
            comp: Yup.number()
              .moreThan(0, "Marks must be Greater than 0")
              .integer("Marks must be integer")
              .required("Maths Marks is Required")
          })}
          onSubmit={fields => {
            this.handleSubmit(fields);
          }}
          render={({ errors, status, touched, values }) => {
            //console.log("zx", errors, status, touched, values);
            return (
              <Form>
                <br />
                <div className="form-group">
                  <label htmlFor="id">Student Id</label>
                  <Field
                    type="text"
                    name="id"
                    className={
                      "form-control" +
                      (errors.id && touched.id ? " is-invalid" : "")
                    }
                  />
                  <ErrorMessage
                    name="id"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="name">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className={
                        "form-control" +
                        (errors.name && touched.name ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="section">Section</label>
                    <Field
                      type="text"
                      as="select"
                      name="section"
                      className={
                        "form-control" +
                        (errors.section && touched.section ? " is-invalid" : "")
                      }
                    >
                      <option value="">Select Section</option>
                      {sectionData.map(b => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="section"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <hr className="myhr4" />
                <div className="row">
                  <div className=" col-4 form-group">
                    <label htmlFor="maths">Maths</label>
                    <Field
                      type="number"
                      name="maths"
                      className={
                        "form-control" +
                        (errors.maths && touched.maths ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="maths"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className=" col-4 form-group">
                    <label htmlFor="eng">English</label>
                    <Field
                      type="number"
                      name="eng"
                      className={
                        "form-control" +
                        (errors.eng && touched.eng ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="eng"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className=" col-4 form-group">
                    <label htmlFor="comp">Computer</label>
                    <Field
                      type="number"
                      name="comp"
                      className={
                        "form-control" +
                        (errors.comp && touched.comp ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="comp"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
                <hr className="myhr4" />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  <button type="reset" className="btn btn-secondary">
                    Reset
                  </button>
                </div>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}

export default NewStudent;
