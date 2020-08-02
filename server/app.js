import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import util from 'util'
import { v4 as uuidv4 } from 'uuid'

//  Promisify link
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const unlink = util.promisify(fs.unlink)
const writeFile = util.promisify(fs.writeFile)

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan('combined'))

app.get('/api/notes', (_req, res) => {
  readdir(path.join(__dirname, '..', 'notes'))
    .then(data => {
      const response = []
      for (let note of data) {
        response.push(
          readFile(path.join(__dirname, '..', 'notes', note)).then(file =>
            JSON.parse(file)
          )
        )
      }
      Promise.all(response).then(data => res.json(data))
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Error reading files')
    })
})

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  readFile(path.join(__dirname, '..', 'notes', id))
    .then(data => {
      res.json(JSON.parse(data))
    })
    .catch(err => {
      res.status(500).send('The file does not exist')
    })
})

app.post('/api/notes', (req, res) => {
  const { name, body } = req.body
  const id = uuidv4()
  writeFile(
    path.join(__dirname, '..', 'notes', id),
    JSON.stringify({ id, name, body })
  )
    .then(() => {
      res.status(201).send({ success: true })
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ error: 'Error writing to the file' })
    })
})

app.put('/api/notes/:id', (req, res) => {
  const { name, body } = req.body
  const { id } = req.params

  writeFile(
    path.join(__dirname, '..', 'notes', id),
    JSON.stringify({ id, name, body })
  )
    .then(() => {
      res.status(201).send({
        success: true
      })
    })
    .catch(() => {
      res.status(500).send({
        error: 'Error writing to file'
      })
    })
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params

  unlink(path.join(__dirname, '..', 'notes', id))
    .then(() => {
      res.send({
        success: true
      })
    })
    .catch(() => {
      res.status(500).send({
        error: 'Error deleting file'
      })
    })
})

app.listen(5500, () => {
  console.log('now listening on port 5500')
})
