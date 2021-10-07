// Importacion de las bibliotecas bcrypt y json web token
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Emulacion base de datos
const usuarios = [{
    id: 1,
    email: 'pedro@gmail.com',
    password: '$2b$04$An9rWZI0drmzn9CD9lnZ/.DrxmbNaAkyEBQNqqcPNm.YmFWAhupzW'
}, {
    id: 2,
    email: 'sofia@gmail.com',
    password: '$2b$04$WDnA77qNw4JQ9xC2g0aMUOKKuy3eIO625ZBXkmh7DsIl51/RHjdim'
}]

module.exports = (request, response) => {
    const email = request.body.email
    const password = request.body.password

    // TODO: verificar si la combinacion de email + password existe en la BD
    // Ejemplo en SQL: SELECT * FROM usuarios WHERE email=pedro@gmail.com AND password=secret

    // Se verifica si el email del usuario matchea con alguno de los de la base de datos 
    const usuarioEncontrado = usuarios.find(usuario =>
        usuario.email === email
    )

    // Si se encontro el usuario ejecuta el codigo, si no muestra mensaje de error
    if (usuarioEncontrado) {

        // Compara la password que viene en la consulta contra la password del usuario encontrado en la base de datos
        const passwordMatch = bcrypt.compareSync(password, usuarioEncontrado.password)

        // Si las passwords hacen match, ejecuta el codigo, caso contrario muestra mensaje de error
        if(passwordMatch) {

            // Crea el token con la informacion del usuario dentro
            // firmado con la clave indicada en el archivo .env y va a durar 1 hora
            const token = jwt.sign({
                id: usuarioEncontrado.id,
                email: usuarioEncontrado.email
            }, process.env.JWT_KEY, { expiresIn: '1h' })
    
            // Muestra el mensaje y asigna el token
            response.status(201).json({
                mensaje: `Login con exito para el usuario ${email}`,
                token: token
            })

        } else {
            response.status(401).end()
        }

    } else {
        response.status(403).json({
            mensaje: 'Credenciales incorrectas'
        })
    }
}