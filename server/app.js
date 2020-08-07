import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import morgan from 'morgan'
import simpleGit from 'simple-git'
import util from 'util'
import { v4 as uuidv4 } from 'uuid'

//  Promisify link
const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)
const unlink = util.promisify(fs.unlink)
const writeFile = util.promisify(fs.writeFile)

// Environment Port
const SERVER_PORT = process.env.SERVER_PORT || 5501

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan('dev'))

app.get('/api/notes', async (_req, res) => {
  try {
    const data = await readdir(path.join(__dirname, '..', 'notes'))
    const response = []
    for (let note of data) {
      if (note === '.keep') continue
      const buff = await readFile(path.join(__dirname, '..', 'notes', note))
      const file = JSON.parse(buff.toString('utf8'))
      response.push(file)
    }
    const jData = await Promise.all(response)
    res.json(jData)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error reading files')
  }
})

app.get('/api/notes/:id', async (req, res) => {
  const { id } = req.params
  try {
    const buff = await readFile(path.join(__dirname, '..', 'notes', `${id}.md`))
    const data = JSON.parse(buff.toString('utf8'))
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send('The file does not exist')
  }
})

app.post('/api/notes', async (req, res) => {
  const { name, body } = req.body
  const id = uuidv4()
  const git = simpleGit()
  try {
    await writeFile(
      path.join(__dirname, '..', 'notes', `${id}.md`),
      JSON.stringify({ id, name, body })
    )
    await git.add(`./notes/${id}.md`)
    await git.commit('initial commit')
    res.status(201).send({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: 'Error writing to the file' })
  }
})

app.put('/api/notes/:id', async (req, res) => {
  const { name, body, commit } = req.body
  const { id } = req.params
  const git = simpleGit()
  try {
    await writeFile(
      path.join(__dirname, '..', 'notes', `${id}.md`),
      JSON.stringify({ id, name, body })
    )
    await git.add(`./notes/${id}.md`)
    await git.commit(commit || 'unknown edit')
    res.send({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: 'Error writing to file'
    })
  }
})

app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params
  try {
    await unlink(path.join(__dirname, '..', 'notes', `${id}.md`)).then(() => {
      res.send({
        success: true
      })
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: 'Error deleting file'
    })
  }
})

app.get('/api/notes/:id/logs', async (req, res) => {
  const { id } = req.params
  const git = simpleGit()
  try {
    const logs = await git.log({ file: `./notes/${id}.md` })
    res.json(logs)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: 'Error finding logs'
    })
  }
})

app.get('/api/notes/:id/logs/:commit', async (req, res) => {
  const { id, commit } = req.params
  const git = simpleGit()
  try {
    await git.checkout(commit) // Revert files to commit
    const buff = await readFile(path.join(__dirname, '..', 'notes', `${id}.md`))
    const data = JSON.parse(buff.toString('utf8'))
    await git.checkout('master') // Revert to master
    res.json(data)
  } catch (err) {
    console.log(err)
    res.status(500).send({
      error: 'Error finding commit'
    })
  }
})

app.listen(SERVER_PORT, () => {
  console.log(`now listening on port ${SERVER_PORT}`)
})
