import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import showdown from 'showdown'
import hljs from 'highlight.js'
import '../styles/Note.css'
import relativeTime from 'dayjs/plugin/relativeTime'

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
          match = match.replace(/(&lt;)/, '<')
          match = match.replace(/(&gt;)/, '>')
          left = left.slice(0, 18) + 'hljs ' + left.slice(18)
          if (lang && hljs.getLanguage(lang)) {
            return (
              left +
              hljs.highlight(match, {
                language: lang
              }).value +
              right
            )
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
dayjs.extend(relativeTime)

const Note = () => {
  const history = useHistory()
  const { id } = useParams()
  const [name, setName] = useState('')
  const [mark, setMark] = useState('')
  const [commits, setCommits] = useState(null)

  useEffect(() => {
    fetch(`${SERVER_URL}/api/notes/${id}/logs`)
      .then(r => r.json())
      .then(body => {
        setName(body.data.name)
        setMark(converter.makeHtml(body.data.body))
        setCommits(body.logs.all)
      })
  }, [id])

  const handleDelete = () => {
    fetch(`${SERVER_URL}/api/notes/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failure')
        }
        return response.json()
      })
      .then(() => {
        history.push('/')
      })
  }

  const handleHistory = commit => {
    fetch(`${SERVER_URL}/api/notes/${id}/logs/${commit}`)
      .then(r => r.json())
      .then(body => {
        setName(body.name)
        setMark(converter.makeHtml(body.body))
      })
  }

  return (
    <div className="container">
      <section className="my-3">
        <Link to="/" className="btn btn-link">
          Back
        </Link>
        <Link to={`/notes/${id}/edit`} className="btn btn-primary">
          Edit
        </Link>
        <button
          type="button"
          className="btn btn-danger ml-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </section>
      <article>
        <header>
          <h1 className="text-info">{name}</h1>
          <hr />
        </header>
        <section dangerouslySetInnerHTML={{ __html: mark }} />
      </article>
      <div className="btn-group dropup d-none d-sm-block" id="drop">
        <button
          type="button"
          className="btn btn-outline-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Logs
        </button>
        <ul className="dropdown-menu">
          {commits &&
            commits.map(el => {
              const com = el.hash.slice(0, 8)
              const ago = dayjs(el.date).fromNow()
              return (
                <li key={el.hash} className="border-bottom">
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      handleHistory(el.hash)
                    }}
                  >
                    <div className="flex-column align-items-start">
                      <div classname="d-flex w-100 justify-content-between">
                        <h5 className="mb-1 h4">{com}</h5>
                        <small>{ago}</small>
                      </div>
                      <p className="mb-1">{el.message}</p>
                      <small>{el.body || ''}</small>
                    </div>
                  </button>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default Note
