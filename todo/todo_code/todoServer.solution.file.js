const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Helper functions
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  arr.splice(index, 1);  // Directly remove item from the array
}

app.get('/todos', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));  // Return the list of todos
  });
});

app.get('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("Todo not found");
    } else {
      res.json(todos[todoIndex]);
    }
  });
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);  // Return the newly created todo
    });
  });
});

app.put('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("Todo not found");
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description
      };
      todos[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);  // Return the updated todo
      });
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);  // Change `const` to `let` because we modify it
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send("Todo not found");
    } else {
      removeAtIndex(todos, todoIndex);  // Remove todo at the found index
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send("Todo deleted");  // Confirm deletion
      });
    }
  });
});

// For all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
