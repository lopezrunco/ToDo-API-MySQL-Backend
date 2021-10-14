// Carga todas las variables de entorno usando la biblioteca dotenv
require('dotenv').config()

const { Sequelize } = require('sequelize')
const express = require('express')

// Conexion a base de datos ---------------------------------------------------------------------------- //

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

// Carga de modelos  ----------------------------------------------------------------------------------- //

// Se pasa sequelize como parametro para la definicion del modelo
const userModel = require('./models/user')(sequelize)

// Creacion de app express ---------------------------------------------------------------------------- //

const app = express()

// Middlewares ---------------------------------------------------------------------------------------- //

const checkIfTheUserHasCredentials = require('./middlewares/check-if-the-user-has-credentials')

// Esta linea es para entender el JSON que se le envia a la API
app.use(express.json())

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
app.post('/login', login(sequelize))
app.post('/registro', register(sequelize))

// Todos
// Cuando se invoca la ruta /todos con el metodo GET, ejecuta el middleware 
// y despues el controlador de la funcion (checkIfTheUserHasCredentials),
// entonces la peticion solo ejecutara si la misma incluye las credenciales del usuario (dicese del token)
app.get('/todos', checkIfTheUserHasCredentials, getAllTodos)
app.get('/todos/:id', checkIfTheUserHasCredentials, getTodoById)
app.post('/todos', checkIfTheUserHasCredentials, createTodo)
app.delete('/todos/:id', checkIfTheUserHasCredentials, deleteTodo)

// Funcion asincrona, primero se autentica y solo despues corre el codigo. Si no se autentica, arroja error.
sequelize
  .authenticate()
  .then(() => {
    // Sincroniza los modelos con la base de datos (Crea las tablas si no existen)
    sequelize
      .sync({ alter: true })
      .then(() => {
        // Comenzar a escuchar por conexiones
        app.listen(process.env.API_PORT)
      })
  })
  .catch(error => {
    console.error('No fue posible conectarse a la base de datos', error)
  })