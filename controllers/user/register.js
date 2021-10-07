const bcrypt = require('bcrypt')
const Joi = require('joi')

module.exports = (request, response) => {

    // Crea el usuario con los datos que vienen en el body
    const user = request.body

    // Valida el usuario usando la biblioteca Joi
    // En la constante schema se define el modelo a validar
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .required(),
        password: Joi.string()
            .alphanum()
            .min(7)
            .max(50)
            .required(),
        email: Joi.string()
            .email()
            .required()
    })

    // Resultado de la validacion del esquema proporcionado
    const validationResult = schema.validate(user)

    // Si no hay error, se registra el usuario
    if (!validationResult.error) {

        // Usando la biblioteca bcrypt, toma la password del usuario y genera el hash 
        // Los parametros usados son: En primer lugar el string a hashear
        // y en segundo lugar las vueltas de "sal", o sea que tan seguro sera el hash
        user.password = bcrypt.hashSync(user.password, 2)

        // TODO: Guardar el usuario en la base de datos

        // Entregamos los datos de usuario y luego borramos la contrasena (reemplazada anteriormente por el hash)
        console.log(user)
        delete user.password

        // Se retorna el usuario
        response.status(201).json({
            user
        })

    } else {
        // Si hay error, se muestra mensaje con el error de validacion que arroja Joi
        response.status(400).json({
            message: validationResult.error
        })
    }

}