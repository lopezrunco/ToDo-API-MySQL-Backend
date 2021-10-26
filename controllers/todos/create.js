const todoModel = require('../../models/todo')

module.exports = (sequelize) => {
    return (request, response) => {

        const todo = request.body

        todoModel(sequelize).create({
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
            completed: todo.completed

        }).then(todo => {
            response.status(200).json({
                todo

            })
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error al crear la tarea'
            })
        })
    }
}
