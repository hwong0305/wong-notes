import React from "react";
import "../styles/Viewer.css";

const Viewer = () => {
  return (
    <div className="container vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="d-none d-sm-block col-4 border-left p-0">
          <div className="row list-header-height">
            <div className="col-12">
              <div className="input-group px-3">
                <input
                  id="search"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
          <div
            className="list-group list-group-flush list-height"
            id="fileList"
          >
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Cras justo odio
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Dapibus ac facilisis in
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Morbi leo risus
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
            >
              Porta ac consectetur ac
            </button>
            <button
              type="button"
              className="list-group-item list-group-item-action"
              disabled
            >
              Vestibulum at eros
            </button>
          </div>
        </div>
        <div className="col-12 col-sm-8 border mh-100">
          <div className="row header-height">
            <div className="col-12">
              <button
                type="button"
                className="btn btn-primary float-right mx-3"
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-primary float-right"
              >
                New
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12 content-height">
              <h1>HTML Ipsum Presents</h1>

              <p>
                <strong>Pellentesque habitant morbi tristique</strong> senectus
                et netus et malesuada fames ac turpis egestas. Vestibulum tortor
                quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
                Donec eu libero sit amet quam egestas semper.
                <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend
                leo. Quisque sit amet est et sapien ullamcorper pharetra.
                Vestibulum erat wisi, condimentum sed,
                <code>commodo vitae</code>, ornare sit amet, wisi. Aenean
                fermentum, elit eget tincidunt condimentum, eros ipsum rutrum
                orci, sagittis tempus lacus enim ac dui.
                <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut
                felis.
              </p>

              <h2>Header Level 2</h2>

              <ol>
                <li>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
              </ol>

              <blockquote>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vivamus magna. Cras in mi at felis aliquet congue. Ut a est
                  eget ligula molestie gravida. Curabitur massa. Donec eleifend,
                  libero at sagittis mollis, tellus est malesuada tellus, at
                  luctus turpis elit sit amet quam. Vivamus pretium ornare est.
                </p>
              </blockquote>

              <h3>Header Level 3</h3>

              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                </li>
                <li>Aliquam tincidunt mauris eu risus.</li>
              </ul>

              <pre>
                <code>
                  #header h1 a {"{"}
                  display: block; width: 300px; height: 80px;
                  {"}"}
                </code>
              </pre>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Vestibulum tortor quam,
                feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
                libero sit amet quam egestas semper. Aenean ultricies mi vitae
                est. Mauris placerat eleifend leo. Quisque sit amet est et
                sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum
                sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum,
                elit eget tincidunt condimentum, eros ipsum rutrum orci,
                sagittis tempus lacus enim ac dui. Donec non enim in turpis
                pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus
                faucibus, tortor neque egestas augue, eu vulputate magna eros eu
                erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis,
                accumsan porttitor, facilisis luctus, metus
              </p>
            </div>
          </div>
        </div>
      </div>
      <button
        id="mobileMenu"
        className="d-block d-sm-none btn btn-outline-info"
        data-toggle="modal"
        data-target="#menuModal"
      >
        <i className="material-icons">menu</i>
      </button>
      <div
        className="modal fade"
        id="menuModal"
        tabindex="-1"
        aria-labelledby="menuModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="menuModal">
                Your Notes
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
