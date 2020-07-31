import React from 'react'

const Note = () => {
  // Placeholder
  return (
    <div className="container">
      <section className="my-3">
        <a href="#" className="btn btn-link">
          Back
        </a>
        <a href="#" className="btn btn-primary">
          Edit
        </a>
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
