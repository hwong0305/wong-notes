import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Editor from './components/Editor'
import Note from './components/Note'
import Viewer from './components/Viewer'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Viewer />
        </Route>
        <Route path="/notes/:id">
          <Note />
        </Route>
        <Route path="/notes/:id/edit">
          <Editor />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
