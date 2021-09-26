module.exports = (request, response) => {
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
}