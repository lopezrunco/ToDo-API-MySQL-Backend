const todoModel = require('../../models/todo')

module.exports = (sequelize) => {
    return (request, response) => {

        // Guarda el body en una variable
        const todo = request.body

        // Llama la funcion create del modelo pasandole los valores que vienen en la request
        todoModel(sequelize).create({
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            completed: todo.completed

        // Responde al front-end con la tarea creada
        }).then(todo => {
            response.json({
                todo
            })
        
        // Logueo de error y mensaje
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al crear la tarea'
            })
        })
    }
}