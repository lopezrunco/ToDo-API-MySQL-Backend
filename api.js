// Importamos la biblioteca express
const express = require('express')

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

const app = express()
const port = 3000

// ############################
// Middlewares
// ############################

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

// Seguridad
app.post('/login', (request, response) => {
    const email = request.body.email
    const password = request.body.password

    // TODO: verificar si la combinacion de email + password existe en la BD
    // Ejemplo en SQL: SELECT * FROM usuarios WHERE email=pedro@gmail.com AND password=secret

    // Se verifica si el email y la contrasena de usuario ingresadas matchean con la base de datos 
    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.email === email && usuario.password === password
    )

    // Si matchean los datos de ingreso se muestra mensaje y token, si no, se muestra emnsaje de error
    if (usuarioEncontrado) {
        response.status(201).json({
            mensaje: `Login con exito para el usuario ${email}`,
            token: 'sdf76sdjasdf3wrvlxft9ye4wrjqhabdfvkw4923445yujhgDFGDFgfd8df3f'
        })
    } else {
        response.status(403).json({
            mensaje: 'Credenciales incorrectas'
        })
    }
})

// Registrar nuevo usuario en el sistema
app.post('/registro', (request, response) => {
    // Obtencion de los datos del nuevo usuario
    const nuevoUsuario = {
        id: usuarios[usuarios.length -1].id + 1, // Obtiene el id del ultimo usuario del array y le agrega 1
        email: request.body.email,
        password: request.body.password
    }

    // Empujamos el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario)

    // Cuando se crea el nuevo usuario, mostramos los datos publicos creados
    response.status(201).json({
        usuario: {
            id: nuevoUsuario.id,
            email: nuevoUsuario.email
        }
    })
})

// Todos
app.get('/todos', (request, response) => {
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