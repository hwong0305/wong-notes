import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import showdown from 'showdown'
import hljs from 'highlight.js'
import Fuse from 'fuse.js'
import _ from 'lodash'
import '../styles/Viewer.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''

showdown.extension('highlight', function () {
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
        let left = '<pre><code\\b[^>]*>'
        let right = '</code></pre>'
        let flags = 'g'
        const replacement = function (wholeMatch, match, left, right) {
          const lang = (left.match(/className="([^ "]+)/) || [])[1]
          match = match.replace(/(&lt;)/g, '<')
          match = match.replace(/(&gt;)/g, '>')
          left = left.slice(0, 18) + 'hljs ' + left.slice(18)
          if (lang && hljs.getLanguage(lang)) {
            return left + hljs.highlight(match, { languag: lang }).value + right
          } else {
            return left + hljs.highlightAuto(match).value + right
          }
        }
        return showdown.helper.replaceRecursiveRegExp(
          text,
          replacement,
          left,
          right,
          flags
        )
      }
    }
  ]
})
showdown.setFlavor('github')
const converter = new showdown.Converter({ extensions: ['highlight'] })

const options = {
  includeScore: true,
  keys: ['name', 'id', 'body']
}

// Needs to be outside otherwise debounce wouldn't work due to react rerendering
const searchFunc = (query, list, setFunc) => {
  const fuse = new Fuse(list, options)
  const results = fuse.search(query)
  setFunc(results.map(e => e.item))
}

const debouncedSearch = _.debounce(searchFunc, 400)

const Viewer = () => {
  const openBtnRef = useRef('open')
  const closeBtnRef = useRef()
  const [note, setNote] = useState('')
  const [noteList, setNoteList] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetch(`${SERVER_URL}/api/notes`)
      .then(r => r.json())
      .then(body => {
        setNoteList(body)
        setFiltered(body)
        if ((isMobile || window.innerWidth < 576) && noteList.length) {
          openBtnRef.current.click()
        }
      })
  }, [noteList.length])

  const handleSwitchNote = noteItem => {
    fetch(`${SERVER_URL}/api/notes/${noteItem}`)
      .then(r => r.json())
      .then(body => {
        body.body = converter.makeHtml(body.body)
        setNote(body)
        if (isMobile || window.innerWidth < 576) {
          closeBtnRef.current.click()
        }
      })
  }

  const handleSearch = e => {
    setSearch(e.target.value)
    if (e.target.value) {
      debouncedSearch(search, noteList, setFiltered)
    } else {
      setFiltered(noteList)
    }
  }

  return (
    <div className="container vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="d-none d-sm-block col-4 border-left p-0">
          <div className="row list-header-height">
            <div className="col-12">
              <div className="input-group px-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="list-group list-group-flush list-height">
            {filtered.map(noteItem => (
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
              <Link
                className={` btn btn-primary float-right mx-3 ${
                  !note && 'disabled'
                }`}
                to={`/notes/${note.id}`}
              >
                Open
              </Link>
              <Link
                to="/notes/new"
                className="btn btn-outline-primary float-right"
              >
                New
              </Link>
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
        ref={openBtnRef}
      >
        <i className="material-icons">menu</i>
      </button>
      <div
        className="modal fade"
        id="menuModal"
        tabIndex="-1"
        aria-labelledby="menuModalLabel"
        aria-hidden="true"
        ref={closeBtnRef}
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
            <div className="modal-body">
              <div className="list-group list-group-flush list-height">
                {filtered.map(noteItem => (
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Viewer
