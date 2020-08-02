import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import '../styles/Editor.css'

const Editor = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [mark, setMark] = useState('')
  const { id } = useParams()

  useEffect(() => {
    fetch(`https://hellosrv.devwong.com/api/notes/${id}`)
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

  const handleClose = e => {
    e.target.dataset.dismiss = null // Start with null

    setNameInput(name)
    e.target.dataset.dismiss = 'modal'
    e.target.click()
  }

  const handleChangeName = e => {
    e.target.dataset.dismiss = null // Start with null

    // If change is succesful then intiiate click
    fetch(`https://hellosrv.devwong.com/api/notes/${id}`, {
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
        e.target.dataset.dismiss = 'modal'
        e.target.click()
      })
      .catch(err => {
        alert('Error changing name')
      })
  }

  const handleSubmit = () => {
    console.log(mark)
    fetch(`https://hellosrv.devwong.com/api/notes${id}`, {
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
          <button
            className="btn"
            type="button"
            data-toggle="modal"
            data-target="#fileNameModal"
          >
            <span className="text-info h1" id="file">
              {name}
            </span>
          </button>
          <div
            className="modal fade"
            id="fileNameModal"
            tabIndex="-1"
            aria-labelledby="fileNameModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="fileNameModalLabel">
                    Rename Note
                  </h5>
                </div>
                <div className="modal-body">
                  <div>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      New File Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fileeditor"
                      value={nameInput}
                      onChange={e => {
                        setNameInput(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleChangeName}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="commit message"
          value={nameInput}
          onChange={e => {
            setNameInput(e.target.value)
          }}
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
            value={mark}
            onChange={value => {
              setMark(value)
            }}
            options={{
              status: false,
              spellChecker: false
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Editor
