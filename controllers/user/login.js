// Importa la biblioteca json web token
const jwt = require('jsonwebtoken')

const usuarios = [{
    id: 1,
    email: 'pedro@gmail.com',
    password: 'secret'
}, {
    id: 2,
    email: 'sofia@gmail.com',
    password: 'super_secret'
}]

module.exports = (request, response) => {
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

        // Cuando recibe credenciales de usuarios validas, crea el token con la informacion del usuario dentro
        // firmado con la clave indicada en el archivo .env y va a durar 1 hora
        const token = jwt.sign({
            id: usuarioEncontrado.id,
            role: usuarioEncontrado.email
        }, process.env.JWT_KEY, { expiresIn: '1h' })

        // Muestra el mensaje y asigna el token
        response.status(201).json({
            mensaje: `Login con exito para el usuario ${email}`,
            token: token
        })
    } else {
        response.status(403).json({
            mensaje: 'Credenciales incorrectas'
        })
    }
}