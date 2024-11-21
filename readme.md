# To-Do Application with Express.js

This is a simple To-Do list API built using Express.js. It allows you to create, read, update, and delete tasks. The tasks are stored in a todos.json file, making it an easy-to-implement file-based storage solution.

## Features

- GET /todos: Get all To-Dos
- GET /todos/:id: Get a single To-Do by ID
- POST /todos: Create a new To-Do
- PUT /todos/:id: Update an existing To-Do by ID
- DELETE /todos/:id: Delete a To-Do by ID

## Prerequisites

Before running this project, make sure you have the following installed:

1. [Node.js](https://nodejs.org/)
2. [npm (Node Package Manager)](https://www.npmjs.com/)
3. npm install cors

## Setup

1. Clone the repository to your local machine:
    bash
    git clone https://github.com/your-username/todo-app.git
    cd todo-app
    

2. Install the required dependencies:
    node
    npm install
   npm install cors
    

4. Create a todos.json file in the root directory. It should contain an empty array [] initially:
   it stores the data here in this file u can also add mondodb for database
    json
    []
    

## Running the Application

To run the app, open your terminal and run:
npm install 
npm install cors 
node "file_name"(it will get your server up and running)
