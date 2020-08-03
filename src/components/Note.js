import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import showdown from 'showdown'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''

const converter = new showdown.Converter()

const Note = () => {
  const { id } = useParams()
  const [name, setName] = useState(null)
  const [mark, setMark] = useState(null)

  useEffect(() => {
    fetch(`${SERVER_URL}/api/notes/${id}`)
      .then(r => r.json())
      .then(body => {
        setName(body.name)
        setMark(converter.makeHtml(body.body))
      })
  }, [id])

  return (
    <div className="container">
      <section className="my-3">
        <Link to="/" className="btn btn-link">
          Back
        </Link>
        <Link to={`/notes/${id}/edit`} className="btn btn-primary">
          Edit
        </Link>
      </section>
      <article>
        <header>
          <h1 className="text-info">{name}</h1>
        </header>
        <section dangerouslySetInnerHTML={{ __html: mark }} />
      </article>
    </div>
  )
}

export default Note
