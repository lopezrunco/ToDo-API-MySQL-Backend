// Carga todas las variables de entorno usando la biblioteca dotenv
require('dotenv').config()

// Creacion de app express ---------------------------------------------------------------------------- //

const express = require('express')
const app = express()
const port = 3000

// Middlewares ---------------------------------------------------------------------------------------- //

const checkIfTheUserHasCredentials = require('./middlewares/check-if-the-user-has-credentials')

// Esta linea es para entender el JSON que se le envia a la API
app.use(express.json());

// Carga de controladores ----------------------------------------------------------------------------- //

// Users
const login = require('./controllers/user/login')
const register = require('./controllers/user/register')

// Todos
const getAllTodos = require('./controllers/todos/get-all')
const getTodoById = require('./controllers/todos/get-by-id')
const createTodo = require('./controllers/todos/create')
const deleteTodo = require('./controllers/todos/delete')

// Definicion de rutas -------------------------------------------------------------------------------- //

// Users (Loguear y registrar usuarios en el sistema)
app.post('/login', login)

app.post('/registro', register)

// Todos
// Cuando se invoca la ruta /todos con el metodo GET, ejecuta el middleware 
// y despues el controlador de la funcion (checkIfTheUserHasCredentials),
// entonces la peticion solo ejecutara si la misma incluye las credenciales del usuario (dicese del token)
app.get('/todos', checkIfTheUserHasCredentials, getAllTodos)
app.get('/todos/:id', checkIfTheUserHasCredentials, getTodoById)
app.post('/todos', checkIfTheUserHasCredentials, createTodo )
app.delete('/todos/:id', checkIfTheUserHasCredentials, deleteTodo )

app.listen(port)