import React from "react";
import "../styles/Editor.css";

const Editor = () => (
  <div class="container">
    <div class="row mb-2">
      <div class="col-12">
        <button
          class="btn"
          type="button"
          data-toggle="modal"
          data-target="#fileNameModal"
        >
          <span class="text-info h1" id="file"></span>
        </button>
        <div
          class="modal fade"
          id="fileNameModal"
          tabindex="-1"
          aria-labelledby="fileNameModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="fileNameModalLabel">
                  Rename Note
                </h5>
              </div>
              <div class="modal-body">
                <div>
                  <label for="exampleFormControlInput1" class="form-label">
                    New File Name
                  </label>
                  <input type="text" class="form-control" id="fileeditor" />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  id="closeModal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
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
    <div class="input-group mb-4">
      <input type="text" class="form-control" placeholder="commit message" />
      <button class="btn btn-outline-primary" id="action">
        Submit
      </button>
      <a href="#" class="btn btn-outline-danger" id="cancel">
        Cancel
      </a>
    </div>
    <div class="row">
      <div class="col-12">
        <textarea
          id="mkdown"
          class="markdown-area"
          placeholder="Start typing markdown here"
        ></textarea>
      </div>
    </div>
  </div>
);

export default Editor;
