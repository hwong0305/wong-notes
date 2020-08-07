import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import showdown from 'showdown'
import '../styles/Note.css'
import relativeTime from 'dayjs/plugin/relativeTime'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''
const converter = new showdown.Converter()
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
        console.log(body.logs)
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
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Dropup
        </button>
        <ul class="dropdown-menu">
          {commits &&
            commits.map(el => {
              const com = el.hash.slice(0, 8)
              const ago = dayjs(el.date).fromNow()
              return (
                <li className="dropdown-item" key={el.hash}>
                  <div className="flex-column align-items-start">
                    <div classname="d-flex w-100 justify-content-between">
                      <h5 className="mb-1 h4">{com}</h5>
                      <small>{ago}</small>
                    </div>
                    <p className="mb-1">{el.message}</p>
                    <small>{el.body || ''}</small>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default Note
