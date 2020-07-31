import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Note = () => {
  const { id } = useParams()
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
          <h1 className="text-info">Title</h1>
        </header>
        <section>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
            rem, in unde quas nobis magni necessitatibus corrupti fugit commodi
            amet consectetur beatae modi aliquid placeat repudiandae excepturi
            error, officia reprehenderit.
          </p>
        </section>
      </article>
    </div>
  )
}

export default Note
