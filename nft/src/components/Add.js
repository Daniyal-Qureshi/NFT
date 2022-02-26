import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
function Add(props) {
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      worth: "",
    },
    onSubmit: async (values) => {
      const data = new FormData();
      data.append("image", file);
      var response = await fetch("http://localhost:5000/add", {
        method: "POST",
        body: data,
      });
      const name = await response.json();
      props.submit({...values,file:name});


    },
  });

  return (
    <div>
      <section>
        <div className="container">
          <div className="row d-flex mb-5 contact-info">
            <div className="col-md-8 block-9 mb-md-5">
              <form
                className="bg-light p-5 contact-form"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    value={formik.values.worth}
                    onChange={formik.handleChange}
                    name="worth"
                    className="form-control"
                    placeholder="worth"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="description"
                    id=""
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    cols="30"
                    rows="7"
                    className="form-control"
                    placeholder="Description"
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    name="file"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                    }}
                    type="file"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="Send Message"
                    className="btn btn-primary py-3 px-5"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Add;
