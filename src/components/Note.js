import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import showdown from 'showdown'
import '../styles/Note.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''

const converter = new showdown.Converter()

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
            commits.map(el => (
              <li className="dropdown-item" key={el.hash}>
                {el.message}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Note
