import React, { useState, useEffect } from 'react'
import showdown from 'showdown'
import '../styles/Viewer.css'

const converter = new showdown.Converter({
  strikethrough: true,
  tables: true
})

const Viewer = () => {
  const [note, setNote] = useState('')
  const [noteList, setNoteList] = useState([])

  useEffect(() => {
    fetch('https://hellosrv.devwong.com/api/notes')
      .then(r => r.json())
      .then(body => {
        setNoteList(body)
      })
  }, [])

  const handleSwitchNote = noteItem => {
    fetch(`https://hellosrv.devwong.com/api/notes/${noteItem}`)
      .then(r => r.json())
      .then(body => {
        body.body = converter.makeHtml(body.body)
        setNote(body)
      })
  }

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
          <div className="list-group list-group-flush list-height">
            {noteList.map(noteItem => (
              <button
                type="button"
                className={`list-group-item list-group-item-action ${
                  noteItem.id === note.id ? 'active' : ''
                }`}
                onClick={() => {
                  handleSwitchNote(noteItem.id)
                }}
                key={noteItem.id}
              >
                {noteItem.name}
              </button>
            ))}
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
            {/* showdownjs should be sanitizing html */}
            <div
              className="col-12 content-height"
              dangerouslySetInnerHTML={{ __html: note.body }}
            />
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
        tabIndex="-1"
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
  )
}

export default Viewer
