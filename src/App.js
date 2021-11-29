import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router';
import Home from './routes/Home';
import AddForm from './routes/AddForm';
import List from './routes/List';
import EditList from './routes/EditList';
import DeleteList from './routes/DeleteList';
import EditForm from './routes/EditForm';


class App extends Component {

  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddForm />} />
        <Route path="/list" element={<List />} />
        <Route path="/editList" element={<EditList />} />
        <Route path="/editForm/:id" element={<EditForm />} />
        <Route path="/deleteList" element={<DeleteList />} />
      </Routes>
    );
  }
}

export default App;