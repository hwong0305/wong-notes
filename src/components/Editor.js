import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import '../styles/Editor.css'

const SERVER_URL = process.env.REACT_APP_SERVER_URL || ''

const Editor = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [mark, setMark] = useState('')
  const [nameToggle, setToggle] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`${SERVER_URL}/api/notes/${id}`)
      .then(data => {
        if (!data.ok) {
          throw new Error('Fetching note was not successful')
        }
        return data.json()
      })
      .then(data => {
        setName(data.name)
        setNameInput(data.name)
        setMark(data.body)
      })
      .catch(err => {
        console.log(err)
        alert('Error loading page')
      })
  }, [id])

  const handleChangeName = () => {
    // If change is successful then initiate click
    fetch(`${SERVER_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput,
        body: mark
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Problem renaming note')
        }
        return response.json()
      })
      .then(() => {
        setName(nameInput)
        setToggle(!nameToggle)
      })
      .catch(err => {
        alert('Error changing name')
      })
  }

  const handleSubmit = () => {
    fetch(`${SERVER_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
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
        history.push(`/notes/${id}`)
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
            <div className="col-6">
              {!nameToggle && (
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    setToggle(!nameToggle)
                  }}
                >
                  <span className="h1 text-info">{name}</span>
                </button>
              )}
              {!!nameToggle && (
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={nameInput}
                    onChange={e => {
                      setNameInput(e.target.value)
                    }}
                  />
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => {
                      setToggle(!nameToggle)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleChangeName}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="commit message"
        />
        <button className="btn btn-outline-primary" onClick={handleSubmit}>
          Submit
        </button>
        <Link to={`/notes/${id}`} className="btn btn-outline-danger">
          Cancel
        </Link>
      </div>
      <div className="row">
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
