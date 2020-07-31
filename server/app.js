import express from 'express'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const app = express()
app.use(express.static('build'))

app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params
  fs.readFile(path.join(__dirname, 'notes', id), (err, data) => {
    if (err) {
      return res.status(500).send('The file does not exist')
    }
    res.json(JSON.parse(data))
  })
})

app.post('/api/notes', (req, res) => {
  const { name, body } = req.body
  const id = uuidv4()
  fs.writeFile(
    path.join(__dirname, 'notes', id),
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
    path.join(__dirname, 'notes', id),
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
