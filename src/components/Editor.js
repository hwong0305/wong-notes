import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../styles/Editor.css";

const Editor = () => {
  const [mark, setMark] = useState("");
  const { id } = useParams();
  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-12">
          <button
            className="btn"
            type="button"
            data-toggle="modal"
            data-target="#fileNameModal"
          >
            <span className="text-info h1" id="file">
              {id}
            </span>
          </button>
          <div
            className="modal fade"
            id="fileNameModal"
            tabIndex="-1"
            aria-labelledby="fileNameModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="fileNameModalLabel">
                    Rename Note
                  </h5>
                </div>
                <div className="modal-body">
                  <div>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      New File Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fileeditor"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    id="closeModal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-dismiss="modal"
                    id="saveModal"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="commit message"
        />
        <button className="btn btn-outline-primary" id="action">
          Submit
        </button>
        <a href="#" className="btn btn-outline-danger" id="cancel">
          Cancel
        </a>
      </div>
      <div className="row">
        <div className="col-12">
          <SimpleMDE
            onChange={(value) => {
              setMark(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
