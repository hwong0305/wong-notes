import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import '../styles/Editor.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''

const Editor = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [mark, setMark] = useState('')

  const handleSubmit = () => {
    fetch(`${SERVER_URL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name ?? 'null',
        body: mark
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error submitting change')
        }
        return response.json()
      })
      .then(() => {
        history.push(`/`)
      })
      .catch(err => {
        alert('Error submitting change')
      })
  }

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-12">
          <div className="row mt-3">
            <div className="col-12">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value)
                  }}
                />
                <Link to="/" className="btn btn-outline-danger">
                  Cancel
                </Link>
                <button
                  className="btn btn-outline-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <SimpleMDE
            onChange={newVal => {
              setMark(newVal)
            }}
            options={{
              status: false,
              spellChecker: false
            }}
            value={mark}
          />
        </div>
      </div>
    </div>
  )
}

export default Editor
