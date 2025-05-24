// File: App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';




const API_URL = 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [message, setMessage] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get(`${API_URL}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
    await axios.post(`${API_URL}/todos`, { task });
    setTask('');
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todos/${id}`);
    fetchTodos();
  };

  const summarizeTodos = async () => {
    try {
      const res = await axios.post(`${API_URL}/summarize`);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Failed to send summary to Slack.');
    }
  };
  const [editingId, setEditingId] = useState(null);
const [editTask, setEditTask] = useState('');


const updateTodo = async (id) => {
  const API_URL = 'http://localhost:5000';

  await axios.put(`${API_URL}/todos/${id}`, { task: editTask });


  setEditingId(null);
  setEditTask('');
  fetchTodos();
};


  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo Summary Assistant</h1>

      <div className="flex gap-2 mb-4">
        <TextField
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter new todo"
          className="border px-2 py-1 flex-1"
        />
        <Button variant="contained" onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded" sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: '#333' } }}>Add</Button>
      </div>

      <ul className="mb-4">
        {todos.map((todo) => (
  <li key={todo.id} className="flex justify-between items-center border-b py-1">
    {editingId === todo.id ? (
      <input
        value={editTask}
        onChange={(e) => setEditTask(e.target.value)}
        className="border px-2 py-1 flex-1"
      />
    ) : (
      <span>{todo.task}</span>
    )}
    <div className="flex gap-2 ml-2">
      {editingId === todo.id ? (
        <>
          <Button variant="contained" color="success"
            onClick={() => updateTodo(todo.id)}
            className="text-green-600"
          >
            Save
          </Button>
          <Button variant="outlined" color="error"
            onClick={() => {
              setEditingId(null);
              setEditTask('');
            }}
            className="text-gray-600"
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingId(todo.id);
              setEditTask(todo.task);
            }}
            className="text-blue-600"
          >
            <IconButton aria-label="edit" >
  <EditIcon  />
</IconButton>

          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500"
          >
            
          <IconButton aria-label="delete" size="large">
  <DeleteIcon />
</IconButton>
     
       
          </button>
        </>
      )}
    </div>
  </li>
))}

      </ul>

      <Button variant="contained" color="success" onClick={summarizeTodos} className="bg-green-600 text-white px-4 py-2 rounded">
        Summarize & Send to Slack
      </Button>

      {message && <p className="mt-4 text-center font-semibold ">{message}</p>}
    </div>
  );
}

export default App;
