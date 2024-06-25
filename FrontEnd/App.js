import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
// import TaskDetail from './components/TaskDetail/TaskDetail';
import './App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://127.0.0.1:8000/api/tasks/')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const addTask = (task) => {
    axios.post('http://127.0.0.1:8000/api/tasks/', task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const updateTask = (updatedTask) => {
    axios.put(`http://127.0.0.1:8000/api/tasks/${updatedTask.id}/`, updatedTask)
      .then(response => setTasks(tasks.map(task => (task.id === updatedTask.id ? response.data : task))))
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <Router>
      <div className="App">
      <div className='container'>
        <Routes>
          <Route path="/" element={<TaskList tasks={tasks} onDelete={deleteTask} onEdit={updateTask} />} />
          {/* <Route path="/task/:id" element={<TaskDetail tasks={tasks} onDelete={deleteTask} />} /> */}
          <Route path="/new" element={<TaskForm onSave={addTask} />} />
          <Route path="/edit/:id" element={<TaskForm tasks={tasks} onSave={updateTask} />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
