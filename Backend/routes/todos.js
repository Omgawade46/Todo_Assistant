const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();


let todos = [];

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: 'Task content is required' });
  const newTodo = { id: uuidv4(), task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos[index].task = task;
  res.status(200).json(todos[index]);
});

module.exports = router;
module.exports.todos = todos;
