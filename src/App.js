import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Editor from './components/Editor'
import Note from './components/Note'
import Viewer from './components/Viewer'
import NewEditor from './components/NewEditor'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Viewer />
        </Route>
        <Route exact path="/notes/new">
          <NewEditor />
        </Route>
        <Route exact path="/notes/:id">
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
