import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import { v4 as uuidv4 } from 'uuid'

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan('combined'))

app.get('/api/notes', (_req, res) => {
  fs.readdir(path.join(__dirname, '..', 'notes'), (err, data) => {
    if (err) {
      return res.status(500).send('Error reading files')
    }
    res.json(data)
  })
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  fs.readFile(path.join(__dirname, '..', 'notes', id), (err, data) => {
    if (err) {
      return res.status(500).send('The file does not exist')
    }
    // When reading from file, the data needs to be parsed first
    res.json(JSON.parse(data))
  })
})

app.post('/api/notes', (req, res) => {
  const { name, body } = req.body
  const id = uuidv4()
  fs.writeFile(
    path.join(__dirname, '..', 'notes', id),
    JSON.stringify({
      id,
      name,
      body
    }),
    err => {
      if (err) {
        return res.status(500).send({
          error: 'Error writing to the file'
        })
      }
      res.status(201).send({
        success: true
      })
    }
  )
})

app.put('/api/notes/:id', (req, res) => {
  const { name, body } = req.body
  const { id } = req.params

  fs.writeFile(
    path.join(__dirname, '..', 'notes', id),
    JSON.stringify(
      {
        id,
        name,
        body
      },
      err => {
        if (err) {
          return res.status(500).send({
            error: 'Error writing to file'
          })
        }

        res.status(201).send({
          success: 'true'
        })
      }
    )
  )
})

app.listen(5501, () => {
  console.log('now listening on port 5051')
})
