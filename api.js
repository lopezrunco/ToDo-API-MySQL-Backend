// Carga todas las variables de entorno usando la biblioteca dotenv
require('dotenv').config()

// Emulacion de la base de datos
const usuarios = [{
    id: 1,
    email: 'pedro@gmail.com',
    password: 'secret'
}, {
    id: 2,
    email: 'sofia@gmail.com',
    password: 'super_secret'
}]

const todos = [{
    id: 1,
    titulo: 'Tarea 1',
}, {
    id: 2,
    titulo: 'Tarea 2'
}]

// ############################
// Creacion de app express
// ############################

const express = require('express')
const app = express()
const port = 3000

// ############################
// Middlewares
// ############################

const checkIfTheUserHasCredentials = require('./middlewares/checkIfTheUserHasCredentials')

// Esta linea es para entender el JSON que se le envia a la API
app.use(express.json());

// ############################
// Definicion de rutas
// ############################

// Se puede resumir como un evento http, en el cual
// cada vez que se invoca la API con la ruta /todos y el metodo POST
// se dispara una funcion a ejecutar
// app.get('/todos', (request, response) => {
//     response.status(200).json({
//         todos
//     })
// })

const login = require('./controllers/user/login')
const register = require('./controllers/user/register')

// Seguridad. Loguear usuario en el sistema
app.post('/login', login)

// Registrar nuevo usuario en el sistema
app.post('/registro', register)

// Todos
// Cuando se invoca la ruta /todos con el metodo GET, ejecuta el middleware 
// y despues el controlador de la funcion (checkIfTheUserHasCredentials),
// entonces la peticion de tareas solo se va a hacer si la peticion incluye las credenciales del usuario (dicese del token)
app.get('/todos', checkIfTheUserHasCredentials, (request, response) => {
    // Obtiene un filtro de paginas desde el request
    const page = request.query.page
    // Si viene definido un numero de items por pagina se lo asigna, si no, por defecto asigna 10
    const itemsPerPage = request.query.items || 10

    if (page) {
        // TODO: aplicar paginado
    }

    response.status(200).json({
        todos
    })
})

// Obtener un todo
app.get('/todos/:id', (request, response) => {
    // Obtener todo por ID
    const todo = todos.find(todo => todo.id === Number(request.params.id)) // Como el id viene en formato string, debemos pasarlo a numero con Number()
    // Equivalente en SQL:
    // SELECT * FROM todos WHERE id=2

    // Si encuentra la tarea, la muestra y si no, arroja un 404
    if (todo) {
        response.status(200).json({
            todo
        })
    } else {
        response.status(404).json({})
    }
})

app.post('/todos', (request, response) => {
    // TODO: Crear todo
})

app.delete('/todos/:id', (request, response) => {
    // TODO: Eliminar todo
})

app.listen(port)